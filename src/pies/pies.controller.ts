import { Body, Get, NotFoundException, Param } from '@nestjs/common';
import { Query } from '@nestjs/common';
import { Post } from '@nestjs/common';
import { Controller } from '@nestjs/common';
import { ApiCreatedResponse, ApiNotFoundResponse, ApiOkResponse, ApiQuery, ApiTags } from '@nestjs/swagger';
import { PieDto } from './dto/pies.dto';
import { PieEntity } from './entities/pie.entity';
import { PiesService } from './pies.service';

@ApiTags('Pies')
@Controller('pies')
export class PiesController {
  constructor(private readonly piesService: PiesService) {}

  @ApiOkResponse({type: PieEntity, isArray: true})
  @ApiNotFoundResponse()
  @ApiQuery({name: 'name', required: false})
  @ApiQuery({name: 'address', required: false})
  @Get('all')
  async getPies(@Query('name') name?: string, @Query('address') address?: string): Promise<PieEntity[]> {
    try {
      return await this.piesService.getPies(name, address);
    } catch(error) {
      throw new NotFoundException(error);
    }
  };

  @ApiOkResponse({type: PieEntity, isArray: false})
  @ApiNotFoundResponse()
  @Get('address/:address')
  async getPieByAddress(@Param('address') address: string): Promise<PieEntity> {
    try {
      return await this.piesService.getPieByAddress(address);
    } catch(error) {
      throw new NotFoundException(error);
    }
  }

  @ApiOkResponse({type: PieEntity, isArray: false})
  @ApiNotFoundResponse()
  @Get('name/:name')
  async getPieByName(@Param('name') name: string): Promise<PieEntity> {
    try {
      return await this.piesService.getPieByName(name);
    } catch(error) {
      throw new NotFoundException(error);
    }
  }

  @ApiCreatedResponse({type: PieEntity})
  @ApiNotFoundResponse()
  @Post('create')
  async createPie(@Body() pie: PieDto): Promise<PieEntity> {
    try {
      return await this.piesService.createPie(pie);
    } catch(error) {
      throw new NotFoundException(error);
    }
  }
}
