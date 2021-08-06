import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Cron } from '@nestjs/schedule';
import { Model } from 'mongoose';
import { PieDto } from './dto/pies.dto';
import { PieDocument, PieEntity } from './entities/pie.entity';
import { ethers } from 'ethers';
import * as pieGetterABI from './abis/pieGetterABI.json';
import * as erc20 from './abis/erc20.json';
import { PieHistoryDocument, PieHistoryEntity } from './entities/pie-history.entity';
import { BigNumber } from 'bignumber.js';
import { HttpService } from '@nestjs/axios';

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
    private httpService: HttpService,
    @InjectModel(PieEntity.name) private pieModel: Model<PieDocument>,
    @InjectModel(PieHistoryEntity.name) private pieHistoryModel: Model<PieHistoryDocument>
  ) {}

  @Cron('* * * * *')
  // Use this every 10 seconds cron setup for testing purposes.
  // 10 * * * * *
  // USe this every hour cron setup for production releases.
  // 0 * * * *
  async updateNAVs() {
    this.logger.debug("updateNAVs is running");

    // instance of the pie-getter contract...
    const provider = new ethers.providers.JsonRpcProvider(process.env.INFURA_RPC);
    const contract = new ethers.Contract(process.env.PIE_GETTER_CONTRACT, pieGetterABI, provider);

    // retrieving all pies from database...
    let pies = await this.getPies();

    // for each pie, we iterate to fetch the underlying assets...
    pies.forEach(async(pie) => {
      const pieDB = new this.pieModel(pies[1]);

      try {
        let result = await contract.callStatic.getAssetsAndAmounts(pieDB.address);
        let underlyingAssets = result[0];
        let underylingTotals = result[1];
        
        let url = `https://api.coingecko.com/api/v3/simple/token_price/ethereum?contract_addresses=${underlyingAssets.join(',')}&vs_currencies=usd`;
        
        // fetching the prices for each underlying contract...
        this.httpService.get(url).subscribe(async(response) => {
          let prices = response.data;

          // creating the pieHistory Enity...
          const history = new this.pieHistoryModel({timestamp: Date.now(), amount: 0, underlyingAssets: []});
          let amount = new BigNumber(0);
  
          // calculating the underlyingAssets, populating it into the pieHistory
          // and summing the total value of usd for each token price...
          for(let i = 0; i < underlyingAssets.length; i++) {
            // instance of the underlying contract...
            let underlyingContract = new ethers.Contract(underlyingAssets[i], erc20, provider);
            // fetching decimals and calculating precision for the underlyingAsset...
            let decimals = await underlyingContract.decimals();
            let precision = new BigNumber(10).pow(decimals);

            // calculating the value in usd for a given amount of underlyingAsset...
            let usd = new BigNumber(underylingTotals[i].toString()).times(prices[underlyingAssets[i].toLowerCase()].usd).div(precision);
            // refilling the underlyingAssets of the History Entity...
            history.underlyingAssets.push({address: underlyingAssets[i], amount: underylingTotals[i].toString(), usd: usd.toString()});  

            // updating the global amount of usd for the main pie of this history entity...
            amount = amount.plus(usd);
          };
  
          // finally updating the total amount in usd...
          history.amount = amount;
          // and saving the history entity...
          let historyDB = await history.save();
          
          // pushing the new history into the main Pie Entity...
          pieDB.history.push(historyDB);
          // and finally saving the Pie Entity as well...
          pieDB.save();
        });
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

  getPieHistory(name?, address?): Promise<PieHistoryEntity[]> {
    return new Promise(async(resolve, reject) => {
      let pie = null;
      
      switch(true) {
        case name !== undefined:
          try {
            pie = await this.getPieByName(name);
          } catch(error) {
            reject(error);
          }
          break;
        case address !== undefined:
          try {
            pie = await this.getPieByAddress(address);
          } catch(error) {
            reject(error);
          }
          break; 
        default:
          reject("either a Pie-Name or a Pie-Anddress must be provided")
      }

      resolve(await this.getPieHistoryDetails(pie));
    });
  }

  private getPieHistoryDetails(pie: PieEntity): Promise<PieHistoryEntity[]> {
    return new Promise(async(resolve, reject) => {
      try {
        let pieHistories = await this.pieHistoryModel.find({
          '_id': { $in: pie.history }
        }).lean();
  
        resolve(pieHistories);        
      } catch(error) {
        reject(error);
      }
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
