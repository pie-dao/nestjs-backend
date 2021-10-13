import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Cron } from '@nestjs/schedule';
import { Model } from 'mongoose';
import { HttpService } from '@nestjs/axios';
import { TreasuryDocument, TreasuryEntity } from './entities/treasury.entity';

@Injectable()
export class TreasuryService {

  private readonly logger = new Logger(TreasuryService.name);

  constructor(
    private httpService: HttpService,
    @InjectModel(TreasuryEntity.name) private treasuryModel: Model<TreasuryDocument>,
  ) {}

  // Use this every 5 minutes cron setup for testing purposes.
  // */5 * * * *
  // USe this every hour cron setup for production releases.
  // 0 * * * *
  @Cron('*/1 * * * *')
  async fetchTreasuryRecord(test?: boolean): Promise<void> {
    const rand = () => Math.floor(Math.random() * 10_000)
    const assets = rand();
    const debt = -rand();
    const total = assets + debt;
    const protocol = assets > debt ? 'Convex' : 'Aave-v2';
    const network = assets > debt ? 'Ethereum' : 'Polygon';
    const treasuryItem = new this.treasuryModel({
        assets,
        debt,
        total,
        protocol,
        network
    });
    this.logger.debug(`Treasury Service is running, creating item ${treasuryItem}`);
    await treasuryItem.save();
    const all = await this.treasuryModel.countDocuments();
    const latest = await this.treasuryModel.findOne().sort({ createdAt: -1 });
    const latestJSON = JSON.stringify(latest);
    console.debug(`Records: ${all}, latest: ${latestJSON}`);
  }
}
