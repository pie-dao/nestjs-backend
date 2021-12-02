import { ethers } from 'ethers';
import { Claims } from 'src/staking/types/staking.types.Claims';
import { Participation } from 'src/staking/types/staking.types.Participation';
import * as MerkleDistributorHelper from "@uma/merkle-distributor";
import { MerkleTree } from 'src/staking/types/staking.types.MerkleTree';
import { Decimal } from 'decimal.js';
import { EpochEntity } from 'src/staking/entities/epoch.entity';

export class MerkleTreeDistributor {
  private SLICE_ADDRESS = ethers.utils.getAddress('0x1083D743A1E53805a95249fEf7310D75029f7Cd6');
  private EXPLODE_DECIMALS = new Decimal(1e18);

  constructor() {
    Decimal.set({
      toExpPos: 42,
      precision: 42
    });
  }

  private calculateProRata(totalRewardsDistributed: string, participations: Participation[]): any {
    const sliceUnits = new Decimal(totalRewardsDistributed).times(this.EXPLODE_DECIMALS);

    let totalVeDoughSupply = new Decimal(0);

    participations.forEach(participation => {
      if(participation.participation) {
        totalVeDoughSupply = totalVeDoughSupply.plus(participation.staker.accountVeTokenBalance);
      }
    });

    const proRata = new Decimal(sliceUnits).times(this.EXPLODE_DECIMALS).div(totalVeDoughSupply.toString());
    return { proRata: proRata, totalVeDoughSupply: totalVeDoughSupply };
  }

  private getUnclaimed(rewards, epoch: EpochEntity): Promise<any> {
    return new Promise(async(resolve, reject) => {
      try {
        const claims = epoch.merkleTree.claims;

        let unclaimedTokens = new Decimal(0);
        let unclaimed = [];

        Object.keys(claims).forEach(address => {
          let hasClaimed = rewards.find(reward => reward.account === address);
          if(!hasClaimed) {
            unclaimed.push({address: address, amount: claims[address].amount});
            unclaimedTokens = unclaimedTokens.plus(claims[address].amount);
          }
        });

        resolve({addresses: unclaimed, total: unclaimed.length, tokens: unclaimedTokens});
      } catch(error) {
        reject(error);
      }
    });
  }  

  async generateMerkleTree(
    totalRewardsDistributed: string, 
    windowIndex: number, 
    participations: Participation[], 
    previousEpoch: EpochEntity, 
    rewards: any[]
  ): Promise<MerkleTree> {    
    let claims = await this.generateClaims(
      totalRewardsDistributed, windowIndex, participations, previousEpoch, rewards
    );

    const recipientsWithIndex: { [key: string]: any } = {};
    Object.keys(claims.recipients).forEach((address: string, index: number) => {
      recipientsWithIndex[address] = { 
        amount: claims.recipients[address].amount.toString(),
        metaData: claims.recipients[address].metaData,
        accountIndex: index 
      };
    });
  
    const { recipientsDataWithProof, merkleRoot } = MerkleDistributorHelper.createMerkleDistributionProofs(
      recipientsWithIndex,
      claims.windowIndex
    );
  
    const outputData: MerkleTree = {
      chainId: claims.chainId,
      stats: claims.stats,
      rewardToken: claims.rewardToken,
      windowIndex: claims.windowIndex,
      totalRewardsDistributed: claims.totalRewardsDistributed,
      merkleRoot: merkleRoot,
      claims: recipientsDataWithProof,
    };

    return outputData;
  }

  async generateClaims(
    totalRewardsDistributed: string, 
    windowIndex: number, 
    participations: Participation[], 
    previousEpoch: EpochEntity, 
    rewards: any[]
  ): Promise<Claims> {
    let unclaimed = previousEpoch ? await this.getUnclaimed(rewards, previousEpoch) : null;  
    let calculations = this.calculateProRata(totalRewardsDistributed, participations);

    let claims = {
      stats: {
        proRata: calculations.proRata.toString(),
        totalVeDoughSupply: calculations.totalVeDoughSupply.toString(),
        notVotingAddresses: {}
      },
      chainId: 1,
      rewardToken: this.SLICE_ADDRESS,
      windowIndex: windowIndex,
      totalRewardsDistributed: null,
      recipients: {}
    };

    let totalCalculatedRewards = new Decimal(0);

    participations.forEach(participation => {
      let stakerBalance = new Decimal(participation.staker.accountVeTokenBalance);
      let stakerProRata = stakerBalance.times(calculations.proRata).div(this.EXPLODE_DECIMALS).truncated();
      
      if(participation.participation) {
        totalCalculatedRewards = totalCalculatedRewards.plus(stakerProRata);
  
        let unclaimedAddress = unclaimed ? unclaimed.addresses.find(element => 
          ethers.utils.getAddress(participation.address) ===  ethers.utils.getAddress(element.address)
        ) : null;
  
        if(unclaimedAddress) {
          stakerProRata = stakerProRata.plus(unclaimedAddress.amount);
        }

        claims.recipients[participation.staker.id] = {
          amount: stakerProRata,
          metaData: {
            reason: [`Distribution for epoch ${windowIndex}`]
          }
        }     
      } else {
        let notVotingStakerAddress = Object.keys(previousEpoch.merkleTree.stats.notVotingAddresses).find(address =>
          ethers.utils.getAddress(address) == ethers.utils.getAddress(participation.address)
        );

        if(!notVotingStakerAddress) {
          claims.stats.notVotingAddresses[ethers.utils.getAddress(participation.address)] = {
            amount: stakerProRata,
            windowIndex: [Number(windowIndex)]
          };
        } else {
          let notVotingStaker = previousEpoch.merkleTree.stats.notVotingAddresses[notVotingStakerAddress];
          notVotingStaker.amount = stakerProRata.plus(notVotingStaker.amount);
          notVotingStaker.windowIndex.push(Number(windowIndex));         

          claims.stats.notVotingAddresses[notVotingStakerAddress] = notVotingStaker;
        }
      }
    });

    claims.totalRewardsDistributed = totalCalculatedRewards;
    return claims;
  }
}
