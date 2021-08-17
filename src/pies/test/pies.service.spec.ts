import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { ScheduleModule } from '@nestjs/schedule';
import { Test, TestingModule } from '@nestjs/testing';
import { PieHistoryEntity, PieHistorySchema } from '../entities/pie-history.entity';
import { PieEntity, PieSchema } from '../entities/pie.entity';
import { PiesService } from '../pies.service';
import { PieHistoryStub } from './stubs/pies-history.stubs';
import { PiesStub, PieStub } from './stubs/pies.stubs';

describe('PiesService', () => {
  let service: PiesService;

  beforeEach(async () => {
    jest.setTimeout(50000);

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

  describe('getPies', () => {
    describe('When getPies is called', () => {
      let pies: PieEntity[];

      beforeEach(async () => {
        jest.spyOn(service, "getPies");
        pies = await service.getPies();
      });

      test('then it should call pieService.getPies', () => {
        expect(service.getPies).toHaveBeenCalled();
      });

      test('then it should return an Array of PieEntity', () => {
        let piesMock = PiesStub();

        expect(pies).toEqual(
          expect.arrayContaining([
            expect.objectContaining({name: piesMock[0].name, address: piesMock[0].address.toLowerCase()}),
            expect.objectContaining({name: piesMock[1].name, address: piesMock[1].address.toLowerCase()}),
            expect.objectContaining({name: piesMock[2].name, address: piesMock[2].address.toLowerCase()}),
            expect.objectContaining({name: piesMock[3].name, address: piesMock[3].address.toLowerCase()}),
            expect.objectContaining({name: piesMock[4].name, address: piesMock[4].address.toLowerCase()}),
            expect.objectContaining({name: piesMock[5].name, address: piesMock[5].address.toLowerCase()}),
            expect.objectContaining({name: piesMock[6].name, address: piesMock[6].address.toLowerCase()}),
            expect.objectContaining({name: piesMock[7].name, address: piesMock[7].address.toLowerCase()})
          ])
        );
      });
    });
  });  

  describe('getPieByAddress', () => {
    describe('When getPieByAddress is called', () => {
      let pie: PieEntity;

      beforeEach(async () => {
        jest.spyOn(service, "getPieByAddress");
        pie = await service.getPieByAddress(PieStub().address);
      });

      test('then it should call pieService.getPieByAddress', () => {
        expect(service.getPieByAddress).toHaveBeenCalledWith(PieStub().address);
      });

      test('then it should return a PieEntity', () => {
        expect(pie.address).toEqual(PieStub().address.toLowerCase());
      });
    });
  }); 

  describe('getPieByName', () => {
    describe('When getPieByName is called', () => {
      let pie: PieEntity;

      beforeEach(async () => {
        jest.spyOn(service, "getPieByName");
        pie = await service.getPieByName(PieStub().name);
      });

      test('then it should call pieService.getPieByName', () => {
        expect(service.getPieByName).toHaveBeenCalledWith(PieStub().name);
      });

      test('then it should return a PieEntity', () => {
        expect(pie.name).toEqual(PieStub().name);
      });
    });
  });   

  describe('getPieHistory', () => {
    describe('When getPieHistory is called', () => {
      let pieHistory: PieHistoryEntity[];

      beforeEach(async () => {
        jest.spyOn(service, "getPieHistory");
        pieHistory = await service.getPieHistory(undefined, PieStub().address.toLowerCase());
      });

      test('then it should call pieService.getPieHistory', () => {
        expect(service.getPieHistory).toHaveBeenCalledWith(undefined, PieStub().address.toLowerCase());
      });

      test('then it should return a PieHistoryEntity', () => {
        expect(typeof pieHistory).toBe("object");
      });
    });
  });  
});
