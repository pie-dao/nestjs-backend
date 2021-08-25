import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';

@Injectable()
export class StakingService {
  private url = 'https://api.thegraph.com/subgraphs/name/chiptuttofuso/piedao-subgraph-mainnet';
  private doughV2 = '0xad32a8e6220741182940c5abf610bde99e737b2d';
  private symbol = 'DOUGH';

  constructor(
    private httpService: HttpService
  ) {}  

  getAccounts(): Promise<any[]> {
    return new Promise(async(resolve, reject) => {
      try {
        let holders = [];
        let lastID = "";
        let holdersCounter = await this.getHoldersCounter(this.symbol);
        let blocks = 1000;

        while(holdersCounter > 0) {
          let response = await this.httpService.post(
            this.url,
            {
              query: `{
                positions(first: ${blocks}, where: {token: "${this.doughV2}", id_gt: "${lastID}"}) {
                  id
                  balance
                  holder {
                    id
                  }
                  token {
                    id
                    name
                    symbol
                    decimals
                  }
                }
              }`
            }
          ).toPromise();

          holders = holders.concat(response.data.data.positions);
          holdersCounter -= blocks;
        }

        resolve(holders);        
      } catch(error) {
        reject(error);
      }
    });
  }

  private getHoldersCounter(symbol: string): Promise<any> {
    return new Promise(async(resolve, reject) => {
      try {
        let response = await this.httpService.post(
          this.url,
          {
            query: `{
              holdersCounters(where: {id: "${symbol}"}) {
                id
                count
              }
            }`
          }
        ).toPromise();
  
        resolve(response.data.data.holdersCounters[0].count);      
      } catch(error) {
        reject(error);
      }
    });
  }
}
