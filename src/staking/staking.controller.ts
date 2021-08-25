import { Controller, Get } from '@nestjs/common';
import { ApiBadRequestResponse, ApiNotFoundResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { StakingService } from './staking.service';

@ApiTags('Staking')
@Controller('staking')
export class StakingController {
  constructor(private readonly stakingService: StakingService) {}

  @ApiOkResponse({type: Array, isArray: true})
  @ApiNotFoundResponse()
  @ApiBadRequestResponse()
  @Get('accounts')
  async getAccounts(): Promise<any[]> {
    try {
      return await this.stakingService.getAccounts();
    } catch(error) {
      throw new Error(error);
    }
  };  
}
