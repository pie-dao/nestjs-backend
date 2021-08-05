import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Cron } from '@nestjs/schedule';
import { Model } from 'mongoose';
import { PieDto } from './dto/pies.dto';
import { PieDocument, PieEntity } from './entities/pie.entity';
import { ethers } from 'ethers';
import * as pieGetterABI from './abis/pieGetterABI.json';
import { PieHistoryDocument, PieHistoryEntity } from './entities/pie-history.entity';
import { BigNumber } from 'bignumber.js';

@Injectable()
export class PiesService {
  private pies = [
    {name: "BTC++", address: "0x0327112423f3a68efdf1fcf402f6c5cb9f7c33fd", history: []},
    {name: "DEFI+S", address: "0xad6a626ae2b43dcb1b39430ce496d2fa0365ba9c", history: []},
    {name: "DEFI++", address: "0x8d1ce361eb68e9e05573443c407d4a3bed23b033", history: []},
    {name: "BCP", address: "0xe4f726adc8e89c6a6017f01eada77865db22da14", history: []},
    {name: "YPIE", address: "0x17525E4f4Af59fbc29551bC4eCe6AB60Ed49CE31", history: []},
    {name: "PLAY", address: "0x33e18a092a93ff21ad04746c7da12e35d34dc7c4", history: []},
    {name: "DEFI+L", address: "0x78f225869c08d478c34e5f645d07a87d3fe8eb78", history: []},
    {name: "USD++", address: "0x9a48bd0ec040ea4f1d3147c025cd4076a2e71e3e", history: []},
  ];

  private readonly logger = new Logger(PiesService.name);

  constructor(
    @InjectModel(PieEntity.name) private pieModel: Model<PieDocument>,
    @InjectModel(PieHistoryEntity.name) private pieHistoryEntity: Model<PieHistoryDocument>
  ) {}

  @Cron('* * * * *')
  //0 * * * * every hour
  async updateNAVs() {
    const provider = new ethers.providers.JsonRpcProvider(process.env.INFURA_RPC);
    const contract = new ethers.Contract(process.env.PIE_GETTER_CONTRACT, pieGetterABI, provider);

    let pies = await this.getPies();

    pies.forEach(async(pie) => {
      const pieDB = new this.pieModel(pie);

      try {
        let result = await contract.callStatic.getAssetsAndAmounts(pieDB.address);
        let underlyingAssets = result[0];
        let underylingTOtals = result[1];

        const history = new this.pieHistoryEntity({timestamp: Date.now(), amount: 0, underlyingAssets: []});
        let amount = new BigNumber(0);

        underlyingAssets.forEach((underlyingAsset, index) => {
          history.underlyingAssets.push({address: underlyingAsset, amount: underylingTOtals[index].toString()});
          // this total NAV should be calculated using prices from coingecko...
          amount = amount.plus(new BigNumber(underylingTOtals[index].toString()));
        });

        history.amount = amount;
        let historyDB = await history.save();
        
        pieDB.history.push(historyDB);
        pieDB.save();

        this.logger.debug(pieDB);
      } catch(error) {
        this.logger.error(pieDB.name, error.message);
      }
    });
  }

  getPies(name?, address?): Promise<PieEntity[]> {
    return new Promise(async(resolve, reject) => {
      let pies = [];
      
      switch(true) {
        case name !== undefined:
          try {
            pies.push(await this.getPieByName(name));
          } catch(error) {
            reject(error);
          }
          break;
        case address !== undefined:
          try {
            pies.push(await this.getPieByAddress(address));
          } catch(error) {
            reject(error);
          }
          break; 
        default:
          pies = await this.pieModel.find().exec();
          
          // if db is empty, we'll initialize the Pies...
          if(pies.length === 0) {
            this.pies.forEach(async(pie) => {
              await this.createPie(pie);
            });
          }         
      }

      resolve(pies);
    });
  }

  getPieByAddress(address: string): Promise<PieEntity> {
    return new Promise(async(resolve, reject) => {
      let pies = await this.pieModel.find().where('address').equals(address).lean();

      if(pies[0]) {
        resolve(pies[0]);
      } else {
        reject("Sorry, can't find any Pie in our database which matches your query.");
      }
      
    });
  }

  getPieByName(name: string): Promise<PieEntity> {
    return new Promise(async(resolve, reject) => {
      let pies = await this.pieModel.find().where('name').equals(name).lean();

      if(pies[0]) {
        resolve(pies[0]);
      } else {
        reject("Sorry, can't find any Pie in our database which matches your query.");
      }      
    });    
  }

  createPie(pie: PieDto): Promise<PieEntity> {
    return new Promise((resolve, reject) => {
      try {
        const createdPie = new this.pieModel(pie);
        let pieDB = createdPie.save();
        resolve(pieDB);
      } catch(error) {
        reject(error);
      }
    });    
  }
}
