import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ethers } from 'ethers';
import * as ethDater from 'ethereum-block-by-date';
import { ParticipationDocument, ParticipationEntity } from './entities/participation.entity';
import { Cron } from '@nestjs/schedule';

@Injectable()
export class StakingService {
  // TODO: change this url into the subgraph mainnet one, once deployed...
  private graphUrl = 'https://api.thegraph.com/subgraphs/name/chiptuttofuso/piedaosubgraphdevelop';
  private snapshotUrl = 'https://hub.snapshot.org/graphql';

  constructor(
    private httpService: HttpService,
    @InjectModel(ParticipationEntity.name) private participationModel: Model<ParticipationDocument>,
  ) { }

  @Cron('10 * * * * *')
  // Use this every 10 seconds cron setup for testing purposes.
  // 10 * * * * *
  // USe this every hour cron setup for production releases.
  // 0 * * * *  
  generateEpoch(): Promise<any> {
    return new Promise(async(resolve, reject) => {
      try {
        const provider = new ethers.providers.JsonRpcProvider(process.env.INFURA_RPC);
        const ethDaterHelper = new ethDater(provider);
        let block = await ethDaterHelper.getDate(
          this.generateBackmonthTimestamp(3, true),
          true
        );

        console.log("generateEpoch", block);
        resolve(block);
      } catch(error) {
        reject(error);
      }
    });
  }

  // TODO: this one should be private, and integrated inside a new function
  // called getEpochs, so we can avoid generate wrong participations based on any timerange...
  getParticipations(kind?: string): Promise<any[]> {
    return new Promise(async(resolve, reject) => {
      try {
        // fetching all votes from snapshot, in the last month...
        let votes = await this.getSnapshotVotes(1);

        // retrieving the stakers from our subgraph...
        let stakers = await this.getStakers();
        
        // generating the participations...
        const participations = [];

        stakers.forEach(staker => {
          let stakerVotes = votes.filter(vote => vote.voter.toLowerCase() == staker.id);
          let participation = stakerVotes.length ? 1 : 0;

          switch(kind) {
            default:
            case 'simple':
              participations.push({
                address: staker.id,
                participation: participation
              });
              break;
            case 'complex':
              participations.push({
                address: staker.id,
                participation: participation,
                staker: staker,
                votes: stakerVotes
              });            
          }
        });
        
        resolve(participations);
      } catch(error) {
        reject(error);
      }
    });
  }

  getStakers(ids?: Array<string>): Promise<any[]> {
    return new Promise(async (resolve, reject) => {
      try {
        let lastID = "";
        let blocks = 1000;
        let stakers = [];

        let holders = await this.fetchStakers(blocks, lastID, ids);

        while(holders.length > 0) {
          stakers = stakers.concat(holders);
          holders = await this.fetchStakers(blocks, holders[holders.length - 1].id, ids);
        }

        resolve(stakers);
      } catch (error) {
        reject(error);
      }
    });
  }

  getLocks(lockedAt?: string, ids?: Array<string>): Promise<any[]> {
    return new Promise(async (resolve, reject) => {
      try {
        let lastID = "";
        let blocks = 1000;
        let locks = [];

        if(!lockedAt) {
          let date = new Date();
          lockedAt = Math.floor(Number(date) / 1000).toString();
        }

        let stakersLocks = await this.fetchLocks(blocks, lastID, lockedAt, ids);

        while(stakersLocks.length > 0) {
          locks = locks.concat(stakersLocks);
          stakersLocks = await this.fetchLocks(blocks, stakersLocks[stakersLocks.length - 1].id, lockedAt, ids);
        }

        resolve(locks);
      } catch (error) {
        reject(error);
      }
    });
  }

  private fetchLocks(blocks: number, lastID: string, lockedAt?: string, ids?: Array<string>): Promise<any[]> {
    return new Promise(async(resolve, reject) => {
      try {
        let query = null;
        
        if(ids) {
          query = `{
            locks(first: ${blocks}, where: {id_gt: "${lastID}", lockedAt_lt: ${lockedAt}, staker_in: [${ids}]}) {
              id
              lockDuration
              lockedAt
              amount
              lockId
              withdrawn
              staker {
                id
                totalStaked
                veTokenTotalSupply
                accountVeTokenBalance
                accountWithdrawableRewards
                accountWithdrawnRewards
                accountDepositTokenBalance
                accountDepositTokenAllowance
              }
            }
          }`;
        } else {
          query = `{
            locks(first: ${blocks}, where: {id_gt: "${lastID}", lockedAt_lt: ${lockedAt}}) {
              id
              lockDuration
              lockedAt
              amount
              lockId
              withdrawn
              staker {
                id
                totalStaked
                veTokenTotalSupply
                accountVeTokenBalance
                accountWithdrawableRewards
                accountWithdrawnRewards
                accountDepositTokenBalance
                accountDepositTokenAllowance
              }
            }
          }`;
        } 

        let response = await this.httpService.post(
          this.graphUrl,
          {
            query: query
          }
        ).toPromise();

        resolve(response.data.data.locks);
      } catch(error) {
        reject(error);
      }
    })
  }

  private fetchStakers(blocks: number, lastID: string, ids?: Array<string>): Promise<any[]> {
    return new Promise(async(resolve, reject) => {
      try {
        let query = null;

        if(ids) {
          query = `{
            stakers(first: ${blocks}, where: {id_gt: "${lastID}", id_in: [${ids}]}) {
              id
              totalStaked
              veTokenTotalSupply
              accountVeTokenBalance
              accountWithdrawableRewards
              accountWithdrawnRewards
              accountDepositTokenBalance
              accountDepositTokenAllowance
              accountLocks {
                id
                lockId
                lockDuration
                lockedAt
                amount
                withdrawn
                ejected
                boosted
              }
              accountRewards {
                id
                timestamp
                amount
                type
              }
            }
          }`
        } else {
          query = `{
            stakers(first: ${blocks}, where: {id_gt: "${lastID}"}) {
              id
              totalStaked
              veTokenTotalSupply
              accountVeTokenBalance
              accountWithdrawableRewards
              accountWithdrawnRewards
              accountDepositTokenBalance
              accountDepositTokenAllowance
              accountLocks {
                id
                lockId
                lockDuration
                lockedAt
                amount
                withdrawn
                ejected
                boosted
              }
              accountRewards {
                id
                timestamp
                amount
                type
              }
            }
          }`          
        }

        let response = await this.httpService.post(
          this.graphUrl,
          {
            query: query
          }
        ).toPromise();

        resolve(response.data.data.stakers);
      } catch(error) {
        reject(error);
      }
    })
  }

  private getSnapshotVotes(months: number): Promise<any[]> {
    return new Promise(async (resolve, reject) => {
      try {
        let validRange = this.generateBackmonthTimestamp(months, false);
        let blocks = 1000;
        let skip = 0;
        let snapshotVotes = [];

        let votes = await this.fetchSnapshotVotes(validRange, blocks, skip);

        while(votes.length > 0) {
          snapshotVotes = snapshotVotes.concat(votes);
          skip += blocks;
          votes = await this.fetchSnapshotVotes(validRange, blocks, skip);
        }

        resolve(snapshotVotes);
      } catch (error) {
        reject(error);
      }
    });
  }

  private fetchSnapshotVotes(range, blocks, skip): Promise<any[]> {
    return new Promise(async (resolve, reject) => {
      try {        
        let response = await this.httpService.post(
          this.snapshotUrl,
          {
            query: `{
              votes (
                first: ${blocks},
                skip: ${skip},
                where: {
                  space: "piedao"
                  created_gt: ${range}
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

  private generateBackmonthTimestamp(months: number, milliseconds: boolean): number {
    let date = new Date();
    date.setMonth(date.getMonth() - months);

    if(milliseconds) {
      return Number(date);
    } else {
      return Math.floor(Number(date) / 1000);
    }
  }

  private getOldestLock(locks: Array<any>): any {
    let oldestLock = this.generateBackmonthTimestamp(0, false);

    locks.forEach(lock => {
      if(lock.lockedAt < oldestLock) {
        oldestLock = lock;
      }
    });

    return oldestLock;
  }

  private getVotersFromShapshotVotes(votes: Array<any>): Array<string> {
    // creating an array of voters...
    let voters = Array.from(votes, vote => '"' + vote.voter.toLowerCase() + '"');
    // removing duplicates from the voters array...
    voters = voters.sort().filter(function(item, pos, ary) {
      return !pos || item != ary[pos - 1];
    });
    
    return voters;
  }
}
