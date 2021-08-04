import { Body, Get, Param } from '@nestjs/common';
import { Post } from '@nestjs/common';
import { Controller } from '@nestjs/common';
import { PieDto } from './dto/pies.dto';
import { PieEntity } from './entities/pie.entity';
import { PiesService } from './pies.service';

@Controller('pies')
export class PiesController {
  constructor(private readonly piesService: PiesService) {}

  @Get()
  async getPies(): Promise<PieEntity[]> {
    try {
      return await this.piesService.getPies();
    } catch(error) {
      return error;
    }
  };

  @Get('address/:address')
  async getPieByAddress(@Param('address') address: string): Promise<PieEntity> {
    try {
      return await this.piesService.getPieByAddress(address);
    } catch(error) {
      return error;
    }
  }

  @Get('name/:name')
  async getPieByName(@Param('name') name: string): Promise<PieEntity> {
    try {
      return await this.piesService.getPieByName(name);
    } catch(error) {
      return error;
    }
  }

  @Post()
  async createPie(@Body() pie: PieDto): Promise<PieEntity> {
    try {
      return await this.piesService.createPie(pie);
    } catch(error) {
      return error;
    }
  }
}
