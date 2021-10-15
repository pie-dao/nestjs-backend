import { Test, TestingModule } from '@nestjs/testing';
import { StakingService } from '../../staking.service';
import { ConfigModule } from '@nestjs/config';
import { VotesStub } from './stubs/snapshot.stubs';
import { StakersStub } from './stubs/stakers.stubs';
import { HttpModule } from '@nestjs/axios';
import { MongooseModule } from '@nestjs/mongoose';
import { ScheduleModule } from '@nestjs/schedule';
import { EpochEntity, EpochSchema } from '../../entities/epoch.entity';
import MockDate from 'mockdate';

// test cases are taken from:
// https://docs.google.com/spreadsheets/d/1Xb5ZtztpcPD3eW2KcQ_B-Hnes1aN_jLfxG1V-HVmhfU/edit#gid=1065509479

describe('FreeRiders integration tests', () => {
  let module: TestingModule;
  let votes = VotesStub();
  let { stakers, accounts } = StakersStub();

  function filterStakers(stakers, ids) {
    return new Promise((resolve) => {
      let filteredStakers = stakers.filter((s) => {
        return !ids.includes(s.id);
      });

      resolve(filteredStakers);
    });
  }

  beforeEach(async () => {
    module = await Test.createTestingModule({
      providers: [StakingService],
      imports: [
        HttpModule,
        ConfigModule.forRoot(),
        ScheduleModule.forRoot(),
        MongooseModule.forRoot(process.env.MONGO_DB_TEST),
        MongooseModule.forFeature([
          { name: EpochEntity.name, schema: EpochSchema },
        ]),
      ],
    }).compile();

    const getStakersHandle = jest.spyOn(
      StakingService.prototype as any,
      'getStakers',
    );

    getStakersHandle.mockImplementation((ids: Array<string>, _) => {
      return filterStakers(stakers, ids);
    });
  });

  describe('getFreeRiders, on third month (month 2)', () => {
    let service: StakingService;

    jest.setTimeout(50000);

    beforeAll(() => {
      MockDate.set(new Date('2021-04-01'));
    });

    beforeEach(async () => {
      const getSnapshotHandle = jest.spyOn(
        StakingService.prototype as any,
        'getSnapshotVotes',
      );

      getSnapshotHandle.mockImplementation(() => {
        return new Promise((resolve) => resolve(votes[2]));
      });

      service = module.get<StakingService>(StakingService);
    });

    it('No one should be a freerider', async () => {
      let freeRiders = await service.getFreeRiders();
      expect(freeRiders).toStrictEqual([]);
    });
  });

  describe('getFreeRiders, on fourth month (month 3)', () => {
    let service: StakingService;

    jest.setTimeout(50000);

    beforeAll(() => {
      MockDate.set(new Date('2021-05-01'));
    });

    beforeEach(async () => {
      const getSnapshotHandle = jest.spyOn(
        StakingService.prototype as any,
        'getSnapshotVotes',
      );

      getSnapshotHandle.mockImplementation(() => {
        return new Promise((resolve) => resolve(votes[3]));
      });

      service = module.get<StakingService>(StakingService);
    });

    it('should return alice as freerider', async () => {
      let freeRiders = await service.getFreeRiders();
      let ids = freeRiders.map(( {id: id} ) => id);

      expect(ids).toContain(accounts.alice);
    });

    afterAll(() => {
      MockDate.reset();
    });
  });

  describe('getFreeRiders, on fifth month (month 4)', () => {
    let service: StakingService;

    jest.setTimeout(50000);

    beforeAll(() => {
      MockDate.set(new Date('2021-06-01'));
    });

    beforeEach(async () => {
      const getSnapshotHandle = jest.spyOn(
        StakingService.prototype as any,
        'getSnapshotVotes',
      );

      getSnapshotHandle.mockImplementation(() => {
        return new Promise((resolve) => resolve(votes[4]));
      });

      service = module.get<StakingService>(StakingService);
    });

    it('No one should be a freerider', async () => {
      let freeRiders = await service.getFreeRiders();
      expect(freeRiders).toStrictEqual([]);
    });
  });

  describe('getFreeRiders, on sixth month (month 5)', () => {
    let service: StakingService;

    jest.setTimeout(50000);

    beforeAll(() => {
      MockDate.set(new Date('2021-07-01'));
    });

    beforeEach(async () => {
      const getSnapshotHandle = jest.spyOn(
        StakingService.prototype as any,
        'getSnapshotVotes',
      );

      getSnapshotHandle.mockImplementation(() => {
        return new Promise((resolve) => resolve(votes[5]));
      });

      service = module.get<StakingService>(StakingService);
    });

    it('No one should be a freerider', async () => {
      let freeRiders = await service.getFreeRiders();
      expect(freeRiders).toStrictEqual([]);
    });
  });

  describe('getFreeRiders, on seventh month (month 6)', () => {
    let service: StakingService;
    let stakersWithoutAlice = stakers.filter((x) => x.id != accounts.alice);

    jest.setTimeout(50000);

    beforeAll(() => {
      MockDate.set(new Date('2021-08-01'));
    });

    beforeEach(async () => {
      const getSnapshotHandle = jest.spyOn(
        StakingService.prototype as any,
        'getSnapshotVotes',
      );

      getSnapshotHandle.mockImplementation(() => {
        return new Promise((resolve) => resolve(votes[6]));
      });

      const getStakersHandle = jest.spyOn(
        StakingService.prototype as any,
        'getStakers',
      );
  
      getStakersHandle.mockImplementation((ids: Array<string>, _) => {
        return filterStakers(stakersWithoutAlice, ids);
      });

      service = module.get<StakingService>(StakingService);
    });

    it('No one should be a freerider', async () => {
      let freeRiders = await service.getFreeRiders();
      expect(freeRiders).toStrictEqual([]);
    });
  });

  describe('getFreeRiders, on eighth month (month 7)', () => {
    let service: StakingService;
    let stakersWithoutAlice = stakers.filter((x) => x.id != accounts.alice);

    jest.setTimeout(50000);

    beforeAll(() => {
      MockDate.set(new Date('2021-09-01'));
    });

    beforeEach(async () => {
      const getSnapshotHandle = jest.spyOn(
        StakingService.prototype as any,
        'getSnapshotVotes',
      );
      
      getSnapshotHandle.mockImplementation(() => {
        return new Promise((resolve) => resolve(votes[7]));
      });

      const getStakersHandle = jest.spyOn(
        StakingService.prototype as any,
        'getStakers',
      );
  
      getStakersHandle.mockImplementation((ids: Array<string>, _) => {
        return filterStakers(stakersWithoutAlice, ids);
      });  

      service = module.get<StakingService>(StakingService);
    });

    it('No one should be a freerider', async () => {
      let freeRiders = await service.getFreeRiders();
      expect(freeRiders).toStrictEqual([]);
    });
  });
});
