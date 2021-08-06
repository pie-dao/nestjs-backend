import { Test, TestingModule } from '@nestjs/testing';
import { PiesController } from '../pies.controller';
import { PiesService } from '../pies.service';

jest.mock('../pies.service');

describe('PiesController', () => {
  let controller: PiesController;
  let service: PiesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [],      
      controllers: [PiesController],
      providers: [PiesService],
    }).compile();

    controller = module.get<PiesController>(PiesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
