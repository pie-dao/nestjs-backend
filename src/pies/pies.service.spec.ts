import { Test, TestingModule } from '@nestjs/testing';
import { PiesService } from './pies.service';

describe('PiesService', () => {
  let service: PiesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PiesService],
    }).compile();

    service = module.get<PiesService>(PiesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
