import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Cron } from '@nestjs/schedule';
import { Model } from 'mongoose';
import { PieDto } from './dto/pies.dto';
import { PieDocument, PieEntity } from './entities/pie.entity';
import { ethers } from 'ethers';
import * as pieGetterABI from './abis/pieGetterABI.json';

@Injectable()
export class PiesService {
  private readonly logger = new Logger(PiesService.name);

  constructor(@InjectModel(PieEntity.name) private pieModel: Model<PieDocument>) {}

  @Cron('* * * * *') // testing every minute
  //0 * * * * every hour
  async updateNAVs() {
    const provider = new ethers.providers.JsonRpcProvider(process.env.INFURA_RPC);
    const contract = new ethers.Contract(process.env.PIE_GETTER_CONTRACT, pieGetterABI, provider);

    let pies = await this.pieModel.find().exec();

    pies.forEach(async(pie) => {
      let result = await contract.callStatic.getAssetsAndAmounts(pie.address);
      this.logger.debug(pie.name, JSON.stringify(result));
    });
  }

  getPies(name, address): Promise<PieEntity[]> {
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
