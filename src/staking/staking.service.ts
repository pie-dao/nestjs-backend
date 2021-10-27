import { Injectable, NotFoundException } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ethers } from 'ethers';
import * as ethDater from 'ethereum-block-by-date';
import { EpochDocument, EpochEntity } from './entities/epoch.entity';
import { MerkleTree } from '../helpers/merkleTree/merkle-tree';
import { Cron } from '@nestjs/schedule';
import { Staker, Lock } from './types/staking.types.Staker';
import { Vote } from './types/staking.types.Vote';
import { FreeRider } from './types/staking.types.FreeRider';
import { Participation } from './types/staking.types.Participation';

@Injectable()
export class StakingService {
  private snapshotSpaceID = process.env.SNAPSHOT_SPACE_ID;
  private graphUrl = process.env.GRAPH_URL;
  private snapshotUrl = 'https://hub.snapshot.org/graphql';
  private ethProvider = process.env.INFURA_RPC;

  constructor(
    private httpService: HttpService,
    @InjectModel(EpochEntity.name) private epochModel: Model<EpochDocument>,
  ) { }

  setEthProvider(provider: string): void {
    this.ethProvider = provider;
  }

  getEthProvider(): string {
    return this.ethProvider;
  }

  setSnapshotUrl(url: string): void {
    this.snapshotUrl = url;
  }

  getSnapshotUrl(): string {
    return this.snapshotUrl;
  }  

  // TODO: we shall add pagination here...
  getEpochs(startDate?: number): Promise<Array<EpochEntity>> {
    return new Promise(async(resolve, reject) => {
      try {
        let epochsDB = null;

        if(startDate) {
          epochsDB = await this.epochModel
          .find({ startDate: { $gte: startDate } })
          .lean();
        } else {
          epochsDB = await this.epochModel
          .find()
          .lean();
        }

        if(epochsDB.length) {
          resolve(epochsDB);
        } else {
          throw new NotFoundException('Sorry, no epochs has been founded on our database.');
        }
      } catch(error) {
        reject(error);
      }
    });
  }  

  getEpoch(id?: string): Promise<EpochEntity> {
    return new Promise(async(resolve, reject) => {
      try {
        let epochDB = null;
        
        if(id) {
          epochDB = await this.epochModel
          .findOne({_id: id})
          .lean();
        } else {
          epochDB = await this.epochModel
          .findOne()
          .sort({ _id: -1 })
          .lean();          
        }

        if(epochDB) {
          resolve(epochDB);
        } else {
          throw new NotFoundException("Sorry, can't find any epoch with this id.")
        }
      } catch(error) {
        reject(error);
      }
    });
  }

  getStakers(ids?: Array<string>, condition?: string): Promise<Staker[]> {
    return new Promise(async (resolve, reject) => {
      try {
        let lastID = "";
        let blocks = 1000;
        let stakers = [];

        let holders = await this.fetchStakers(blocks, lastID, ids, condition);

        while(holders.length > 0) {
          stakers = stakers.concat(holders);
          holders = await this.fetchStakers(blocks, holders[holders.length - 1].id, ids, condition);
        }

        resolve(stakers);
      } catch (error) {
        reject(error);
      }
    });
  }

  getLocks(lockedAt?: string, ids?: Array<string>): Promise<Lock[]> {
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

  getParticipations(votes?: Vote[]): Promise<Participation[]> {
    return new Promise(async(resolve, reject) => {
      try {
        if(votes && votes.length == 0) {
          throw new NotFoundException("sorry, votes can't be an empty array");
        }

        if(!votes) {
          // fetching all votes from snapshot in the last month...
          votes = await this.getSnapshotVotes(1);
        }

        // retrieving the stakers from our subgraph...
        let stakers = await this.getStakers();
        
        // generating the participations...
        const participations = [];

        stakers.forEach(staker => {
          let stakerVotes : Vote[] = votes.filter(vote => vote.voter.toLowerCase() == staker.id);
          let participation = stakerVotes.length ? 1 : 0;

          participations.push({
            address: staker.id,
            participation: participation,
            staker: staker,
            votes: stakerVotes
          });
        });
        
        resolve(participations);
      } catch(error) {
        reject(error);
      }
    });
  }  

  getMerkleTree(participations: Participation[]): Promise<Object> {
    return new Promise(async(resolve, reject) => {
      try {
        if(participations && participations.length > 0) {
          let merkleTreeObj = new MerkleTree();
          const merkleTree = merkleTreeObj.createParticipationTree(participations);
          resolve(merkleTree);
        } else {
          throw new NotFoundException('Sorry, you must pass a participations json as parameter, and it must be a valid array.');
        }
      } catch(error) {
        reject(error);
      }
    });
  }

  getFreeRiders(): Promise<FreeRider[]> {
    return new Promise(async(resolve, reject) => {
      try {
        // fetching all votes from snapshot in the last 3 months...
        let votes = await this.getSnapshotVotes(3);
        // getting all voters addresses from snapshot's votes...
        let voters = this.getVotersFromShapshotVotes(votes);

        // fetching all the stakers which have NOT voted in the last 3 months...
        let stakers = await this.getStakers(voters, 'id_not_in');

        // creating the freeRiders dataStruct...
        let votedTimeRange = this.generateBackmonthTimestamp(3, false);
        let freeRiders = [];

        stakers.forEach(staker => {
          let oldestLock = this.getOldestLock(staker.accountLocks);

          let isFreeRider = false;

          /* istanbul ignore next */
          if(oldestLock && oldestLock.lockedAt < votedTimeRange) {
            isFreeRider = true;
          }

          let freeRider = {
            id: staker.id,
            isFreeRider: isFreeRider,
            oldestLock: oldestLock,
            stakingData: staker
          } as FreeRider

          freeRiders.push(freeRider);
        });

        resolve(freeRiders);        
      } catch(error) {
        /* istanbul ignore next */
        reject(error);
      }
    });
  }

  @Cron('0 0 1 * *')
  // Use this every 10 seconds cron setup, for testing purposes.
  // 10 * * * * *
  // USe this every first day of the month, for production releases.
  // 0 0 1 * * 
  generateEpoch(): Promise<EpochEntity> {
    return new Promise(async(resolve, reject) => {
      try {
        // fetching all votes from snapshot in the last month...
        let votes : Vote[] = await this.getSnapshotVotes(1);

        // generating the participations...
        let participations : Participation[] = await this.getParticipations(votes);

        let merkleTreeObj = new MerkleTree();
        const merkleTree = merkleTreeObj.createParticipationTree(participations);
        
        let epoch = await this.saveEpoch(participations, merkleTree, votes, 'rewards has to be implemented');
        resolve(epoch);
      } catch(error) {
        reject(error);
      }
    });
  }

  private saveEpoch(participations: Array<Participation>, merkleTree: Object, votes: Vote[], rewards: string): Promise<EpochEntity> {
    return new Promise(async(resolve, reject) => {
      try {
        const provider = new ethers.providers.JsonRpcProvider(this.ethProvider);
        const ethDaterHelper = new ethDater(provider);

        let startDate = this.generateBackmonthTimestamp(1, true);
        let endDate = this.generateBackmonthTimestamp(0, true);
        
        let startBlock = await ethDaterHelper.getDate(
          startDate,
          true
        );

        let endBlock = await ethDaterHelper.getDate(
          endDate,
          true
        );

        const epochModel = new this.epochModel();
        epochModel.startDate = startDate;
        epochModel.endDate = endDate;
        epochModel.startBlock = startBlock.block;
        epochModel.endBlock = endBlock.block;
        epochModel.merkleTree = merkleTree;
        epochModel.rewards = rewards;
        epochModel.participants = this.getVotersFromShapshotVotes(votes);
        epochModel.proposals = this.getProposalsFromParticipations(participations);

        let epochDB = await epochModel.save();
        resolve(epochDB);
  
      } catch(error) {
        reject(error);
      }
    });    
  }

  private fetchLocks(blocks: number, lastID: string, lockedAt?: string, ids?: Array<string>): Promise<Lock[]> {
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
                accountVeTokenBalance
                accountWithdrawableRewards
                accountWithdrawnRewards
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
                accountVeTokenBalance
                accountWithdrawableRewards
                accountWithdrawnRewards
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

  private fetchStakers(blocks: number, lastID: string, ids?: Array<string>, condition?: string): Promise<Staker[]> {
    return new Promise(async(resolve, reject) => {
      try {
        let query = null;

        /* istanbul ignore next */
        if(!condition) {
          condition = 'id_in';
        }

        if(ids) {
          query = `{
            stakers(first: ${blocks}, where: {id_gt: "${lastID}", ${condition}: [${ids}]}) {
              id
              accountVeTokenBalance
              accountWithdrawableRewards
              accountWithdrawnRewards
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
              accountVeTokenBalance
              accountWithdrawableRewards
              accountWithdrawnRewards
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

  private getSnapshotVotes(months: number): Promise<Vote[]> {
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
        /* istanbul ignore next */
        reject(error);
      }
    });
  }

  private fetchSnapshotVotes(range, blocks, skip): Promise<Vote[]> {
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
                  space: "${this.snapshotSpaceID}"
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
        /* istanbul ignore next */
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

  private getProposalsFromParticipations(participations: Array<any>): Array<string> {
    let proposals = [];

    participations.forEach(staker => {
      staker.votes.forEach(vote => {
        proposals.push(vote.proposal.id);  
      });
    });
    
    // removing duplicates from the proposals array...
    proposals = proposals.sort().filter(function(item, pos, ary) {
      return !pos || item != ary[pos - 1];
    });
    
    return proposals;
  }

  private getVotersFromShapshotVotes(votes: Array<any>): Array<string> {
    // creating an array of voters...
    let voters = Array.from(votes, vote => vote.voter.toLowerCase());
    // removing duplicates from the voters array...
    voters = Array.from(new Set(voters)).sort();
    
    return voters;
  }

  private getOldestLock(locks: Array<any>): any {
    let oldestTimestamp = this.generateBackmonthTimestamp(0, false);
    let oldestLock = null;

    locks.forEach(lock => {
      /* istanbul ignore next */
      if(lock.lockedAt < oldestTimestamp) {
        oldestTimestamp = lock.lockedAt;
        oldestLock = lock;
      }
    });

    return oldestLock;
  }
}
