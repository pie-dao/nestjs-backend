import { Test, TestingModule } from '@nestjs/testing';
import { StakingService } from '../staking.service';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { ScheduleModule } from '@nestjs/schedule';
import { EpochEntity, EpochSchema } from '../entities/epoch.entity';
import { EpochsStub } from './stubs/epochs.stubs';

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

  describe('getEpochs', () => {
    describe('getEpochs with startDate as param', () => {
      describe('When getEpochs is called', () => {
        jest.setTimeout(15000);
        let epochs: EpochEntity[];
  
        beforeEach(async () => {
          jest.spyOn(service, "getEpochs");
          epochs = await service.getEpochs(1627823293212);
        });
  
        test('then it should call stakingService.getEpochs', () => {
          expect(service.getEpochs).toHaveBeenCalledWith(1627823293212);
        });
  
        test('then it should return an array of EpochEntity', () => {
          let epochsMock = EpochsStub();
  
          expect(epochs).toEqual(
            expect.arrayContaining([
              expect.objectContaining({startDate: epochsMock[0].startDate, endDate: epochsMock[0].endDate})
            ])
          );
        });
  
        test('it should throw an error if no records are found', async() => {
          await expect(service.getEpochs(Number(Date.now())))
          .rejects
          .toEqual(new Error("Sorry, no epochs has been founded on our database."));
        });       
      });
    });
  
    describe('getEpochs without any param', () => {
      describe('When getEpochs is called', () => {
        jest.setTimeout(15000);
        let epochs: EpochEntity[];
  
        beforeEach(async () => {
          jest.spyOn(service, "getEpochs");
          epochs = await service.getEpochs();
        });
  
        test('then it should call stakingService.getEpochs', () => {
          expect(service.getEpochs).toHaveBeenCalled();
        });
  
        test('then it should return an array of EpochEntity', () => {
          expect(typeof epochs).toBe('object');
        });
      });
    });    
  });

  describe('getEpoch', () => {
    describe('getEpoch with id as param', () => {
      describe('When getEpoch is called', () => {
        jest.setTimeout(15000);
        let epoch: EpochEntity;
  
        beforeEach(async () => {
          jest.spyOn(service, "getEpoch");
          epoch = await service.getEpoch("612f7b555633c83b8a586b5e");
        });
  
        test('then it should call stakingService.getEpoch', () => {
          expect(service.getEpoch).toHaveBeenCalledWith("612f7b555633c83b8a586b5e");
        });
  
        test('then it should return an EpochEntity', () => {
          let epochsMock = <any>EpochsStub()[0];
          let epochObj = <any>epoch;
          expect(JSON.stringify(epochObj._id)).toEqual(JSON.stringify(epochsMock._id));
        });
  
        test('it should throw an error if no records are found', async() => {
          await expect(service.getEpoch("612f7b555633c83b8a586b5a"))
          .rejects
          .toEqual(new Error("Sorry, can't find any epoch with this id."));
        });       
      });
    });  
  
    describe('getEpoch without any param', () => {
      describe('When getEpoch is called', () => {
        jest.setTimeout(15000);
        let epoch: EpochEntity;
  
        beforeEach(async () => {
          jest.spyOn(service, "getEpoch");
          epoch = await service.getEpoch();
        });
  
        test('then it should call stakingService.getEpoch', () => {
          expect(service.getEpoch).toHaveBeenCalled();
        });
  
        test('then it should return an EpochEntity', () => {
          expect(typeof epoch).toBe("object");
        });
      });
    });     
  });

  describe('getLocks', () => {
    describe('When getLocks is called', () => {
      jest.setTimeout(15000);
      let locks: any[];

      beforeEach(async () => {
        jest.spyOn(service, "getLocks");
        locks = await service.getLocks();
      });

      test('then it should call stakingService.getLocks', () => {
        expect(service.getLocks).toHaveBeenCalled();
      });

      test('then it should return an array of Locks', () => {
        expect(typeof locks).toEqual("object");
      });     

      test('it should throw an error if no records are found', async() => {
        await expect(service.getLocks(undefined, ["not", "existing", "ids"]))
        .rejects
        .toThrow(Error);
      });      
    });

    describe('When getLocks is called with params', () => {
      jest.setTimeout(15000);
      let locks: any[];
      let timestamp = Number(Date.now()).toString();

      beforeEach(async () => {
        jest.spyOn(service, "getLocks");
        locks = await service.getLocks(timestamp);
      });

      test('then it should call stakingService.getLocks', () => {
        expect(service.getLocks).toHaveBeenCalledWith(timestamp);
      });

      test('then it should return an array of Locks', () => {
        expect(typeof locks).toEqual("object");
      });    
    });    
  }); 

  describe('getStakers', () => {
    describe('When getStakers is called', () => {
      jest.setTimeout(15000);
      let stakers: any[];

      beforeEach(async () => {
        jest.spyOn(service, "getStakers");
        stakers = await service.getStakers();
      });

      test('then it should call stakingService.getStakers', () => {
        expect(service.getStakers).toHaveBeenCalled();
      });

      test('then it should return an array of Stakers', () => {
        expect(typeof stakers).toEqual("object");
      });     

      test('it should throw an error if no records are found', async() => {
        await expect(service.getStakers(["not", "existing", "ids"]))
        .rejects
        .toThrow(Error);
      });      
    });
  }); 

  describe('generateEpoch', () => {
    describe('When generateEpoch is called', () => {
      jest.setTimeout(50000);
      let epoch: EpochEntity;

      beforeEach(async () => {
        jest.spyOn(service, "generateEpoch");
        epoch = await service.generateEpoch();
      });

      test('then it should call stakingService.generateEpoch', () => {
        expect(service.generateEpoch).toHaveBeenCalled();
      });

      test('then it should return an EpochEntity', () => {
        expect(typeof epoch).toEqual("object");
      });     
    });

    describe('When generateEpoch is called using wrong snapshot url', () => {
      jest.setTimeout(50000);

      beforeEach(async () => {
        jest.spyOn(service, "generateEpoch");

        jest.spyOn(service, "setSnapshotUrl");
        service.setSnapshotUrl("wrong_url");
      });      
      
      test('then it should call stakingService.setSnapshotUrl', () => {
        expect(service.setSnapshotUrl).toHaveBeenCalledWith("wrong_url");
      });      

      test('then new snapshotUrl should be set', () => {
        let snapshotUrl = service.getSnapshotUrl();
        expect(snapshotUrl).toEqual("wrong_url");
      });     

      test('it should throw an error if something went wrong', async() => {
        await expect(service.generateEpoch())
        .rejects
        .toThrow(Error);
      });     
    });   
    
    describe('When generateEpoch is called using wrong eth provider', () => {
      jest.setTimeout(50000);

      beforeEach(async () => {
        jest.spyOn(service, "generateEpoch");

        jest.spyOn(service, "setEthProvider");
        service.setEthProvider("wrong_provider");
      });

      test('then it should call stakingService.setEthProvider', () => {
        expect(service.setEthProvider).toHaveBeenCalledWith("wrong_provider");
      }); 

      test('then new snapshotUrl should be set', () => {
        let ethProvider = service.getEthProvider();
        expect(ethProvider).toEqual("wrong_provider");
      });   

      test('it should throw an error if something went wrong', async() => {
        await expect(service.generateEpoch())
        .rejects
        .toThrow(Error);
      });     
    });     
  }); 
});
