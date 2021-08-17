import { Test, TestingModule } from '@nestjs/testing';
import { PieEntity } from '../entities/pie.entity';
import { PieHistoryEntity } from '../entities/pie-history.entity';
import { PiesController } from '../pies.controller';
import { PiesService } from '../pies.service';
import { PiesStub, PieStub } from './stubs/pies.stubs';
import { PieHistoryStub } from './stubs/pies-history.stubs';

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

      test('then it should call pieService.getPies', () => {
        expect(service.getPies).toHaveBeenCalled();
      });

      test('then it should return an array of PieEntity', () => {
        expect(pies).toEqual(PiesStub());
      });
    });
  });

  describe('getPieByAddress', () => {
    describe('When getPieByAddress is called', () => {
      let pie: PieEntity;

      beforeEach(async () => {
        pie = await controller.getPieByAddress(PieStub().address);
      });

      test('then it should call pieService.getPieByAddress', () => {
        expect(service.getPieByAddress).toHaveBeenCalledWith(PieStub().address);
      });

      test('then it should return a PieEntity', () => {
        expect(pie).toEqual(PieStub());
      });
    });
  });

  describe('getPieByName', () => {
    describe('When getPieByName is called', () => {
      let pie: PieEntity;

      beforeEach(async () => {
        pie = await controller.getPieByName(PieStub().name);
      });

      test('then it should call pieService.getPieByName', () => {
        expect(service.getPieByName).toHaveBeenCalledWith(PieStub().name);
      });

      test('then it should return a PieEntity', () => {
        expect(pie).toEqual(PieStub());
      });
    });
  });

  describe('getPieHistory', () => {
    describe('When getPieHistory is called', () => {
      let pieHistory: PieHistoryEntity[];

      beforeEach(async () => {
        pieHistory = await controller.getPieHistory(undefined, PieStub().address);
      });

      test('then it should call pieService.getPieHistory', () => {
        expect(service.getPieHistory).toHaveBeenCalledWith(undefined, PieStub().address);
      });

      test('then it should return a PieHistoryEntity', () => {
        expect(pieHistory).toEqual(PieHistoryStub());
      });
    });
  });
});
