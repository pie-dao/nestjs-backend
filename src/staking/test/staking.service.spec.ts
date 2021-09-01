import { Test, TestingModule } from '@nestjs/testing';
import { StakingService } from '../staking.service';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { ScheduleModule } from '@nestjs/schedule';
import { EpochEntity, EpochSchema } from '../entities/epoch.entity';

describe('StakingService', () => {
  let service: StakingService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [StakingService],
      imports: [
        HttpModule,
        ConfigModule.forRoot(),
        ScheduleModule.forRoot(),        
        MongooseModule.forRoot(process.env.MONGO_DB_TEST),
        MongooseModule.forFeature([{ name: EpochEntity.name, schema: EpochSchema }])
      ],      
    }).compile();

    service = module.get<StakingService>(StakingService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
