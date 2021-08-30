import { Controller, Get, Query } from '@nestjs/common';
import { ApiBadRequestResponse, ApiNotFoundResponse, ApiOkResponse, ApiQuery, ApiTags } from '@nestjs/swagger';
import { StakingService } from './staking.service';

@ApiTags('Staking')
@Controller('staking')
export class StakingController {
  constructor(private readonly stakingService: StakingService) {}

  @ApiOkResponse({type: Array, isArray: true})
  @ApiNotFoundResponse()
  @ApiBadRequestResponse()
  @ApiQuery({name: 'ids', required: false})
  @Get('stakers')
  async getStakers(@Query('ids') ids?: string): Promise<any[]> {
    try {
      let stakersIds = null;

      if(ids) {
        stakersIds = ids.split(",").map(id => '"' + id + '"');
      }

      return await this.stakingService.getStakers(stakersIds);
    } catch(error) {
      throw error;
    }
  };

  @ApiOkResponse({type: Array, isArray: true})
  @ApiNotFoundResponse()
  @ApiBadRequestResponse()
  @ApiQuery({name: 'locked_at', required: false})
  @ApiQuery({name: 'ids', required: false})
  @Get('locks')
  async getLocks(@Query('locked_at') locked_at?: string, @Query('ids') ids?: string): Promise<any[]> {
    try {
      let stakersIds = null;

      if(ids) {
        stakersIds = ids.split(",").map(id => '"' + id + '"');
      }

      return await this.stakingService.getLocks(locked_at, stakersIds);
    } catch(error) {
      throw error;
    }
  };

  @ApiOkResponse({type: Array, isArray: true})
  @ApiNotFoundResponse()
  @ApiBadRequestResponse()
  @ApiQuery({name: 'kind', required: false})
  @Get('participations')
  async getParticipations(@Query('kind') kind?: string): Promise<any[]> {
    try {
      return await this.stakingService.getParticipations(kind);
    } catch(error) {
      throw error;
    }
  };  
}