import { Test, TestingModule } from '@nestjs/testing';
import { PieEntity } from '../entities/pie.entity';
import { PiesController } from '../pies.controller';
import { PiesService } from '../pies.service';
import { PiesStub } from './stubs/pies.stubs';

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
    service = module.get<PiesService>(PiesService);

    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('getPies', () => {
    describe('When getPies is called', () => {
      let pies: PieEntity[];

      beforeEach(async () => {
        pies = await controller.getPies();
      });

      test('then it should call pieService', () => {
        expect(service.getPies).toBeCalled();
      });

      test('then it should return an array of PieEntity', () => {
        expect(pies).toEqual(PiesStub);
      })
    });
  });
});
