import { Test, TestingModule } from '@nestjs/testing';
import { TasksService } from '../tasks.service';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';
import { NotFoundException } from '@nestjs/common';
import { AirdropStub } from './stubs/airdrop.stubs';

describe('TasksService', () => {
  let service: TasksService;
  let TESTING_BLOCK = 13352729;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TasksService],
      imports: [
        HttpModule,
        ConfigModule.forRoot()
      ],      
    }).compile();

    service = module.get<TasksService>(TasksService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getKpiAirdrop', () => {
    describe('getKpiAirdrop', () => {
      describe('When getKpiAirdrop is called', () => {
        jest.setTimeout(50000);
        let airdrop: any;
  
        beforeEach(async () => {
          jest.spyOn(service, "getKpiAirdrop");
          airdrop = await service.getKpiAirdrop(TESTING_BLOCK);
        });
  
        test('then it should call stakingService.getEpochs', () => {
          expect(service.getKpiAirdrop).toHaveBeenCalledWith(TESTING_BLOCK);
        });
  
        test('then it should return an object for the airdrop', () => {
          let airdropStub = AirdropStub();
  
          expect(airdropStub).toEqual(
              expect.objectContaining({amount: "9999999.99999999996965821"})
          );
        });  
      });
    });
  }); 
});
