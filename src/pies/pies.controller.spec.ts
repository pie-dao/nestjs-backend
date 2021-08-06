import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { ScheduleModule } from '@nestjs/schedule';
import { Test, TestingModule } from '@nestjs/testing';
import { PieHistoryEntity, PieHistorySchema } from './entities/pie-history.entity';
import { PieEntity, PieSchema } from './entities/pie.entity';
import { PiesController } from './pies.controller';
import { PiesService } from './pies.service';

describe('PiesController', () => {
  let controller: PiesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        HttpModule,
        ConfigModule.forRoot(),
        ScheduleModule.forRoot(),        
        MongooseModule.forRoot(process.env.MONGO_DB),
        MongooseModule.forFeature([{ name: PieEntity.name, schema: PieSchema }]),
        MongooseModule.forFeature([{ name: PieHistoryEntity.name, schema: PieHistorySchema }])        
      ],      
      controllers: [PiesController],
      providers: [PiesService],
    }).compile();

    controller = module.get<PiesController>(PiesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
