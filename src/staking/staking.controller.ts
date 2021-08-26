import { BadRequestException, Controller, Get, Query } from '@nestjs/common';
import { ApiBadRequestResponse, ApiNotFoundResponse, ApiOkResponse, ApiQuery, ApiTags } from '@nestjs/swagger';
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
      throw error;
    }
  };

  @ApiOkResponse({type: Array, isArray: true})
  @ApiNotFoundResponse()
  @ApiBadRequestResponse()
  @ApiQuery({name: 'timestamp', required: true})
  @Get('generate_participations')
  async generateParticipations(@Query('timestamp') timestamp?: number): Promise<any[]> {
    try {
      return await this.stakingService.generateParticipations(timestamp);
    } catch(error) {
      throw error;
    }
  };  
}