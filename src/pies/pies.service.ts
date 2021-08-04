import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { PieDto } from './dto/pies.dto';
import { PieDocument, PieEntity } from './entities/pie.entity';

@Injectable()
export class PiesService {
  constructor(@InjectModel(PieEntity.name) private pieModel: Model<PieDocument>) {}

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
      let pies = await this.pieModel.find().exec();
      let pie = pies.find(pie => pie.address === address);

      if(pie) {
        resolve(pie);
      } else {
        reject("Sorry, can't find any Pie in our database which matches your query.");
      }
      
    });
  }

  getPieByName(name: string): Promise<PieEntity> {
    return new Promise(async(resolve, reject) => {
      let pies = await this.pieModel.find().exec();
      let pie = pies.find(pie => pie.name === name);

      if(pie) {
        resolve(pie);
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
