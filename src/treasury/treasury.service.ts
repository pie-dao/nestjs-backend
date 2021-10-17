import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Cron } from '@nestjs/schedule';
import { Model } from 'mongoose';
import { HttpService } from '@nestjs/axios';
import {
  TreasuryDocument,
  TreasuryEntity,
  TreasuryValues,
} from './entities/treasury.entity';
import { firstValueFrom } from 'rxjs';
import { SupportedNetwork } from './types/treasury.types.Network';
import { Balances, Meta, MetaLabel } from './types/treasury.types.Balance';

const TREASURY_CRON_FREQUENCY = '0 0 * * *';
@Injectable()
export class TreasuryService {
  private readonly logger = new Logger(TreasuryService.name);
  private readonly zapperApiUrl = 'https://api.zapper.fi/v1';
  private readonly treasury = process.env.TREASURY_ADDRESS;
  private readonly zapperApiKey = process.env.ZAPPER_API_KEY;

  constructor(
    public httpService: HttpService,
    @InjectModel(TreasuryEntity.name)
    public treasuryModel: Model<TreasuryDocument>,
  ) {}

  public async getTreasury(days: number = 7): Promise<TreasuryEntity[]> {
    /**
     * Fetch treasury records for the last X days
     */
    const sinceDate = this.daysAgo(days);
    return this.treasuryModel.find({ createdAt: { $gte: sinceDate } });
  }

  public daysAgo(days: number): Date {
    /**
     * Helper method to return a Date object X days ago
     */
    const d = new Date();
    d.setDate(d.getDate() - days);
    return d;
  }

  @Cron(TREASURY_CRON_FREQUENCY)
  public async createTreasuryRecord(): Promise<void> {
    /**
     * Executes on an interval to call the Zapper API and log the results to MongoDB
     */
    this.logger.log(`Treasury service executed at ${TREASURY_CRON_FREQUENCY}`);
    try {
      await this.loadTreasury();
    } catch (err) {
      console.error(
        'There was an error fetching data from the Zapper API',
        err,
      );
    }
  }

  async loadTreasury() {
    /**
     * Fetches a list of networks then iterates over the protocols in each network
     * to load relevant data to the db
     */
    const networks = await this.getSupportedNetworks();
    networks.forEach((network) => this.getBalancesAndLoad(network));
  }

  async getSupportedNetworks(): Promise<SupportedNetwork[]> {
    /**
     * Returns the list of supported networks (Polygon, Ethereum, BSC etc.)
     * For the given Zapper account (in this case PieDAO)
     */
    const { zapperApiUrl, zapperApiKey, treasury } = this;
    const url = `${zapperApiUrl}/protocols/balances/supported?addresses%5B%5D=${treasury}&api_key=${zapperApiKey}`;
    return this.apiCall<SupportedNetwork[]>(url);
  }

  async getBalancesAndLoad(network: SupportedNetwork): Promise<void> {
    /**
     * Fetches a list of debts, assets and total USD values from the API, for a given
     * Network (Ethereum, Polygon etc). Then loads to MongoDB if there is useful data
     * In the record
     */
    const balances = await this.getBalances(network);
    balances.forEach((record) => {
      if (this.recordHasUsefulData(record)) this.loadDB(record);
    });
  }

  async loadDB(record: TreasuryEntity) {
    const model = new this.treasuryModel(record);
    await model.save();
  }

  async getBalances(
    supported: SupportedNetwork,
  ): Promise<TreasuryEntity[] | undefined> {
    /**
     * For a given network, iterates through all the protocols where PieDAO has positions,
     * and extract the USD value of Assets, Debt and Total
     * @returns an object containing all fields needed to load into the treasury collection
     */

    const { zapperApiUrl, zapperApiKey, treasury } = this;
    const { network } = supported;

    const records = supported.apps.map(
      async (protocol): Promise<TreasuryEntity> => {
        let url = '';
        url += `${zapperApiUrl}/protocols/${protocol.appId}/balances`;
        url += `?addresses%5B%5D=${treasury}&network=${network}&api_key=${zapperApiKey}`;

        const data = await this.apiCall<Balances>(url);
        const treasuryValues = this.extractTreasuryValues(data);

        if (treasuryValues) {
          return {
            network,
            protocol: protocol.appId,
            ...treasuryValues,
          };
        }
      },
    );
    return Promise.all(records);
  }

  extractTreasuryValues(balance: Balances): TreasuryValues | undefined {
    /**
     * Retrieves the USD values of 'Assets', 'Debt', and 'Total' from the summary Meta of each protocol
     *
     * Some protocols have empty meta arrays, so we filter those out.
     * @returns an object containing the USD values mapped to lower case keys, for loading to the DB
     */
    const { meta } = balance[this.treasury];
    if (meta && meta.length > 0) {
      const labels: MetaLabel[] = ['Assets', 'Debt', 'Total'];
      const treasuryArray = labels.map((label) =>
        this.extractValuesFromMeta(meta, label),
      );
      return Object.assign({}, ...treasuryArray);
    }
  }

  extractValuesFromMeta(
    meta: Meta[],
    label: MetaLabel,
  ): Record<string, number> {
    /**
     * Find a given label in the Meta array, then return the USD value
     * Lowercase is so we can load straight to the DB
     */
    const { value } = meta.find((m) => m.label === label);
    return { [label.toLowerCase()]: value };
  }

  recordHasUsefulData(record: TreasuryEntity | undefined): boolean {
    /**
     * API can return summaries where the assets and debt position is equal to zero,
     * or that there is no information provided in the Meta array.
     * We want to ignore such cases and only load if there is actual debt or asset balances
     */
    return record !== undefined && !(record.assets === 0 && record.debt === 0);
  }

  async apiCall<T>(url: string): Promise<T> {
    /**
     * Helper method to convert RxJS Obeservable to Promise
     * @returns data from an API GET request
     */
    const fetchSupported = this.httpService.get(url);
    const res = await firstValueFrom(fetchSupported);
    return res.data;
  }
}
