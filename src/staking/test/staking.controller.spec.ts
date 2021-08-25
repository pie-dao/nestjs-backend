import { Test, TestingModule } from '@nestjs/testing';
import { StakingController } from './staking.controller';
import { StakingService } from './staking.service';

describe('StakingController', () => {
  let controller: StakingController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [StakingController],
      providers: [StakingService],
    }).compile();

    controller = module.get<StakingController>(StakingController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
