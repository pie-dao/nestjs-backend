import { ethers } from 'ethers';
import { Claims } from 'src/staking/types/staking.types.Claims';
import { Participation } from 'src/staking/types/staking.types.Participation';
import * as MerkleDistributorHelper from "@uma/merkle-distributor";
import { Decimal } from 'decimal.js';

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

  generateMerkleTree(totalRewardsDistributed: string, windowIndex: number, participations: Participation[]): Claims {
    let claims = this.generateClaims(totalRewardsDistributed, windowIndex, participations);
    // MerkleTreeDistributor shall be called here...
    return claims;
  }

  generateClaims(totalRewardsDistributed: string, windowIndex: number, participations: Participation[]): Claims {
    let calculations = this.calculateProRata(totalRewardsDistributed, participations);

    let claims = {
      stats: {
        proRata: calculations.proRata.toString(),
        totalVeDoughSupply: calculations.totalVeDoughSupply.toString(),
      },
      chainId: 1,
      rewardToken: this.SLICE_ADDRESS,
      windowIndex: windowIndex,
      totalRewardsDistributed: null,
      recipients: {}
    };

    let totalCalculatedRewards = new Decimal(0);

    participations.forEach(participation => {
      if(participation.participation) {
        let stakerBalance = new Decimal(participation.staker.accountVeTokenBalance);
        let stakerProRata = stakerBalance.times(calculations.proRata).div(this.EXPLODE_DECIMALS).truncated();
        totalCalculatedRewards = totalCalculatedRewards.plus(stakerProRata);

        claims.recipients[participation.staker.id] = {
          amount: stakerProRata,
          metaData: {
            reason: [`Distribution for epoch ${windowIndex}`]
          }
        }     
      }
    });

    claims.totalRewardsDistributed = totalCalculatedRewards;
    return claims;
  }
}
