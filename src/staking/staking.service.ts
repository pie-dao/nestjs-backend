import { BadRequestException, Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';

@Injectable()
export class StakingService {
  private graphUrl = 'https://api.thegraph.com/subgraphs/name/chiptuttofuso/piedao-subgraph-mainnet';
  private snapshotUrl = 'https://hub.snapshot.org/graphql';
  private doughV2 = '0xad32a8e6220741182940c5abf610bde99e737b2d';
  private symbol = 'DOUGH';

  constructor(
    private httpService: HttpService
  ) { }

  generateParticipations(inactiveTime: number): Promise<any[]> {
    return new Promise(async (resolve, reject) => {
      if(!inactiveTime) {
        reject(new BadRequestException("Sorry, you must define a timestamp as inactiveTime value"));
      }

      try {
        let tokenHolders = await this.getAccounts();
        let votes = await this.getSnapshotVotes();

        votes.forEach(vote => {
          if ((vote.created * 1000) > inactiveTime) {
            let tokenHolder = tokenHolders.find(x => x.holder.id == vote.voter.toLowerCase());

            if(tokenHolder) {
              tokenHolder.participation = 1;
            }
          }
        });

        const participationElements = [];

        tokenHolders.forEach(tokenHolder => {
          participationElements.push({
            address: tokenHolder.holder.id,
            participation: tokenHolder.participation
          });
        });

        resolve(participationElements);
      } catch (error) {
        reject(error);
      }
    });
  }

  getAccounts(): Promise<any[]> {
    return new Promise(async (resolve, reject) => {
      try {
        let holders = [];
        let lastID = "";
        let holdersCounter = await this.getHoldersCounter(this.symbol);
        let blocks = 1000;

        // fetching all holders, repeating the call to the graph till needed...
        while (holdersCounter > 0) {
          let response = await this.httpService.post(
            this.graphUrl,
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
      } catch (error) {
        reject(error);
      }
    });
  }

  private getHoldersCounter(symbol: string): Promise<any> {
    return new Promise(async (resolve, reject) => {
      try {
        let response = await this.httpService.post(
          this.graphUrl,
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
      } catch (error) {
        reject(error);
      }
    });
  }

  private getSnapshotVotes(): Promise<any[]> {
    return new Promise(async (resolve, reject) => {
      try {
        let date = new Date();
        date.setMonth(date.getMonth() - 3);
        let validRange = Math.floor(Number(date) / 1000);

        let block = 1000;
        let skip = 0;
        let snapshotVotes = [];
        let votes = await this.fetchSnapshotVotes(validRange, block, skip);

        while(votes.length > 0) {
          snapshotVotes = snapshotVotes.concat(votes);
          skip += block;
          votes = await this.fetchSnapshotVotes(validRange, block, skip);
        }

        resolve(snapshotVotes);
      } catch (error) {
        reject(error);
      }
    });
  }

  private fetchSnapshotVotes(range, block, skip): Promise<any[]> {
    return new Promise(async (resolve, reject) => {
      try {        
        let response = await this.httpService.post(
          this.snapshotUrl,
          {
            query: `{
              votes (
                first: ${block},
                skip: ${skip},
                where: {
                  space: "piedao"
                  created_lt: ${range}
                }
              ) {
                id
                voter
                created
                proposal {
                  id
                }
                choice
                space {
                  id
                }
              }
            }`
          }
        ).toPromise();

        resolve(response.data.data.votes);
      } catch (error) {
        reject(error);
      }
    });
  }
}
