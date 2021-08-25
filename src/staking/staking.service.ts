import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';

@Injectable()
export class StakingService {
  private url = 'https://api.thegraph.com/subgraphs/name/chiptuttofuso/piedao-subgraph-mainnet';
  private doughV2 = '0xad32a8e6220741182940c5abf610bde99e737b2d';

  constructor(
    private httpService: HttpService
  ) {}  

  getAccounts(): Promise<[]> {
    return new Promise(async(resolve, reject) => {
      try {
        let response = await this.httpService.post(
          this.url,
          {
            query: `{
              positions(first: 1000, where: {token: "${this.doughV2}"}) {
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
  
        resolve(response.data);
        resolve([]);         
      } catch(error) {
        reject(error);
      }
    });
  }  
}
