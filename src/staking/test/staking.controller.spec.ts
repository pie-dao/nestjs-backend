import { Test, TestingModule } from '@nestjs/testing';
import { StakingController } from '../staking.controller';
import { StakingService } from '../staking.service';

jest.mock('../staking.service');

describe('StakingController', () => {
  let controller: StakingController;
  let service: StakingService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [StakingController],
      providers: [StakingService],
    }).compile();

    controller = module.get<StakingController>(StakingController);
    service = module.get<StakingService>(StakingService);
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
