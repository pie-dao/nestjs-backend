import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { ScheduleModule } from '@nestjs/schedule';
import { Test, TestingModule } from '@nestjs/testing';
import { PieHistoryEntity, PieHistorySchema } from '../entities/pie-history.entity';
import { PieEntity, PieSchema } from '../entities/pie.entity';
import { PiesService } from '../pies.service';

describe('PiesService', () => {
  let service: PiesService;

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
      providers: [PiesService],
    }).compile();

    service = module.get<PiesService>(PiesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
