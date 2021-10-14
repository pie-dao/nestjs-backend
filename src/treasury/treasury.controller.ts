import { Get, NotFoundException, Post } from '@nestjs/common';
import { Controller } from '@nestjs/common';
import { TreasuryService } from './treasury.service';
import {
  ApiBadRequestResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';

@ApiTags('Treasury')
@Controller('treasury')
export class TreasuryController {
  constructor(private readonly treasuryService: TreasuryService) {}

  //   @ApiOkResponse({type: PieEntity, isArray: true})
  @ApiNotFoundResponse()
  @ApiBadRequestResponse()
  @Get()
  async getTreasury(): Promise<void> {
    try {
      return await this.treasuryService.fetchTreasuryRecord();
    } catch (error) {
      throw new NotFoundException(error);
    }
  }
}
