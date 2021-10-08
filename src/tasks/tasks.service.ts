import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ethers, BigNumber } from 'ethers';

@Injectable()
export class TasksService {
  // TODO: change this url into the subgraph mainnet one, once deployed...
  private graphUrl = process.env.GRAPH_URL;
  private GRAPH_MAX_PAGE_LENGTH = 1000;

  constructor(private httpService: HttpService) { }

  getKpiAirdrop(blockNumber: number): Promise<any> {    
    return new Promise(async(resolve, reject) => {
      try {
        let { counter } = await this.fetchStakersCounter(blockNumber);
        let veBalances : any[];
        
        if(counter <= this.GRAPH_MAX_PAGE_LENGTH) {
          veBalances = await this.fetchVeDoughBalances(counter, "", blockNumber);
        } else {
          let pagesNumber = Math.ceil( counter / this.GRAPH_MAX_PAGE_LENGTH);
          let accumulator = counter;

          veBalances = await this.fetchVeDoughBalances(this.GRAPH_MAX_PAGE_LENGTH, "", blockNumber);
          accumulator -= this.GRAPH_MAX_PAGE_LENGTH;
          
          for(let i = 0; i < pagesNumber; i++) {
            let tempBalances : any[];
            let lastID = veBalances[veBalances.length - 1].id
            
            if(accumulator > this.GRAPH_MAX_PAGE_LENGTH) {
              tempBalances = await this.fetchVeDoughBalances(this.GRAPH_MAX_PAGE_LENGTH, lastID, blockNumber);
              accumulator -= this.GRAPH_MAX_PAGE_LENGTH;
            } else { // this is last cycle
              tempBalances = await this.fetchVeDoughBalances(accumulator, lastID, blockNumber);
            }

            veBalances.concat(tempBalances);
          }
        }

        let response = this.getAirdropResponse(veBalances);

        resolve(response);
      } catch(error) {
        reject(error);
      }
    });
  }

  private fetchStakersCounter(blockNumber: number): Promise<any> {
    return new Promise(async(resolve, reject) => {
      try {
        let response = await this.httpService.post(
          this.graphUrl,
          {
            query: `{
              stakersTrackers(first: 1, block: { number: ${blockNumber} }) {
                counter
              }
            }`
          }
        ).toPromise();

        resolve(response.data.data.stakersTrackers[0]);
      } catch(error) {
        reject(error);
      }
    });
  }

  private fetchVeDoughBalances(first: number, lastID: string, blockNumber: number): Promise<any[]> {
    return new Promise(async(resolve, reject) => {
      try {
        let response = await this.httpService.post(
          this.graphUrl,
          {
            query: `{
              stakers(first: ${first}, block: { number: ${blockNumber} }, where: { id_gt: "${lastID}" }) {
                id
                accountVeTokenBalance
              }
            }`
          }
        ).toPromise()

        resolve(response.data.data.stakers);
      } catch(error) {
        reject(error);
      }
    });
  }

  private getAirdropResponse(veBalances : any[]): any {
    const AIRDROP_UNITS = ethers.utils.parseEther("10000000"); // 10 millions KPIs
    let totalVeDoughs = veBalances.reduce((sum, { accountVeTokenBalance }) => sum.add(BigNumber.from(accountVeTokenBalance)), BigNumber.from(0));
    let proRata = AIRDROP_UNITS.mul(BigNumber.from(1e15)).div(totalVeDoughs); // 24 decimals

    let airdropped = BigNumber.from(0);
    let airdropAmounts = {};
    veBalances.forEach(({id, accountVeTokenBalance}) : any => {
      let userBalance = BigNumber.from(accountVeTokenBalance);
      let proRataAmount = proRata.mul(userBalance).div(BigNumber.from(1e15));
      airdropped = airdropped.add(proRataAmount);
      airdropAmounts[id] = ethers.utils.formatEther(proRataAmount.toString());
    });

    let airdroppedString = ethers.utils.formatEther(airdropped.toString())

    return {amount: airdroppedString, airdropAmount: airdropAmounts};
  }
}
