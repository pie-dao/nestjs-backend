import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ParticipationDocument, ParticipationEntity } from './entities/participation.entity';

@Injectable()
export class StakingService {
  private graphUrl = 'https://api.thegraph.com/subgraphs/name/chiptuttofuso/piedao-subgraph-mainnet';
  private snapshotUrl = 'https://hub.snapshot.org/graphql';
  private doughV2 = '0xad32a8e6220741182940c5abf610bde99e737b2d';

  constructor(
    private httpService: HttpService,
    @InjectModel(ParticipationEntity.name) private participationModel: Model<ParticipationDocument>,
  ) { }

  generateParticipations(): Promise<any[]> {
    return new Promise(async(resolve, reject) => {
      try {
        // fetching all votes from snapshot, in the last 3 months...
        let votes = await this.getSnapshotVotes();
        // creating an array of voters...
        let voters = Array.from(votes, vote => '"' + vote.voter.toLowerCase() + '"');
        // removing duplicates from the voters array...
        voters = voters.sort().filter(function(item, pos, ary) {
          return !pos || item != ary[pos - 1];
        });        

        // retrieving the holders from our subgraph, filtering them by
        // the addresses of those who've voted in the last 3 months...
        let tokenHolders = await this.getAccounts(voters);
  
        const participations = [];

        tokenHolders.forEach(tokenHolder => {
          let holderVotes = votes.filter(vote => vote.voter.toLowerCase() == tokenHolder.holder.id);

          participations.push({
            address: tokenHolder.holder.id,
            holder: tokenHolder,
            votes: holderVotes
          });
        });
        
        resolve(participations);
      } catch(error) {
        reject(error);
      }
    });
  }

  updateParticipations(): Promise<any[]> {
    return new Promise(async (resolve, reject) => {
      try {
        let participations = await this.generateParticipations();

        // for(let i = 0; i < participations.length; i++) {
        //   await this.updateParticipation(participations[i]);
        // }

        resolve(participations);
      } catch (error) {
        reject(error);
      }
    });
  }

  getAccounts(ids?: Array<string>): Promise<any[]> {
    return new Promise(async (resolve, reject) => {
      try {
        let lastID = "";
        let blocks = 1000;
        let accounts = [];

        let holders = await this.fetchAccounts(blocks, lastID, ids);

        while(holders.length > 0) {
          accounts = accounts.concat(holders);
          holders = await this.fetchAccounts(blocks, holders[holders.length - 1].id, ids);
        }

        resolve(accounts);
      } catch (error) {
        reject(error);
      }
    });
  }

  private fetchAccounts(blocks: number, lastID: string, ids?: Array<string>): Promise<any[]> {
    return new Promise(async(resolve, reject) => {
      try {
        let query = null;

        if(ids) {
          query = `{
            positions(first: ${blocks}, where: {token: "${this.doughV2}", id_gt: "${lastID}", holder_in: [${ids}]}) {
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
        } else {
          query = `{
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

        let response = await this.httpService.post(
          this.graphUrl,
          {
            query: query
          }
        ).toPromise();

        resolve(response.data.data.positions);
      } catch(error) {
        reject(error);
      }
    })
  }

  private updateParticipation(participation: any): Promise<ParticipationEntity> {
    return new Promise(async(resolve, reject) => {
      try {
        let participationDB = null;
        let participationsDB = await this.participationModel
        .find({ address: participation.address.toLocaleLowerCase() })
        .lean();

        if(participationsDB.length > 0) {
          participationDB = participationsDB[0];
          participationDB.participation = participation.participation;
          participationDB.save();

          resolve(participationsDB[0]);
        } else {
          const participationModel = new this.participationModel(participation);
          let participationDB = await participationModel.save();

          resolve(participationDB);
        }

      } catch(error) {
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
}
