import { Injectable } from '@nestjs/common';
import { PieDto } from './dto/pies.dto';
import { PieEntity } from './entities/pie.entity';

@Injectable()
export class PiesService {
  // TODO: this is a temp hardcoded array.
  // we shall fetch it from DB instead...
  private pies: PieEntity[] = [
    {name: 'BTC++', address: '0x0327112423f3a68efdf1fcf402f6c5cb9f7c33fd'}, 
    {name: 'DEFI+S', address: '0xad6a626ae2b43dcb1b39430ce496d2fa0365ba9c'},
    {name: 'DEFI++', address: '0x8d1ce361eb68e9e05573443c407d4a3bed23b033'},
    {name: 'BCP', address: '0xe4f726adc8e89c6a6017f01eada77865db22da14'}
  ];

  getPies(): Promise<PieEntity[]> {
    return new Promise((resolve, reject) => {
      resolve(this.pies);
    });
  }

  getPieByAddress(address: string): Promise<PieEntity> {
    return new Promise((resolve, reject) => {
      let pie = this.pies.find(pie => pie.address === address);

      if(pie) {
        resolve(pie);
      } else {
        reject("Sorry, can't find any Pie in our database which matches your query.");
      }
      
    });
  }

  getPieByName(name: string): Promise<PieEntity> {
    return new Promise((resolve, reject) => {
      let pie = this.pies.find(pie => pie.name === name);

      if(pie) {
        resolve(pie);
      } else {
        reject("Sorry, can't find any Pie in our database which matches your query.");
      }      
    });    
  }

  createPie(pie: PieDto): Promise<PieEntity> {
    return new Promise((resolve, reject) => {
      this.pies.push(pie);
      resolve(pie);
    });    
  }
}
