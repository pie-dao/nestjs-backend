import { Test, TestingModule } from '@nestjs/testing';
import { PiesController } from './pies.controller';

describe('PiesController', () => {
  let controller: PiesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PiesController],
    }).compile();

    controller = module.get<PiesController>(PiesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
