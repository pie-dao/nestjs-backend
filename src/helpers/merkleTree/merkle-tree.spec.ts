import { Test, TestingModule } from '@nestjs/testing';
import { MerkleTree } from './merkle-tree';
import { StakingService } from '../../staking/staking.service';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';
import { ScheduleModule } from '@nestjs/schedule';
import { MongooseModule } from '@nestjs/mongoose';
import { EpochEntity, EpochSchema } from '../../staking/entities/epoch.entity';
import { MerkleTreeStub, HardcodedMerkleTreeStub } from './stubs/merkle-tree.stubs';
import { ParticipationsStub, HardcodedParticipationsStub } from './stubs/participations.stubs';
import { NotFoundException } from '@nestjs/common';

describe('MerkleTree', () => {
  let service: StakingService;
  let participations = [];

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
    participations = await service.getParticipations();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getMerkleTree with Mocks and check validity', () => {
    describe('When getMerkleTree is called with a mock participations and votes', () => {  
      jest.setTimeout(50000);
      let merkleTree = null;

      beforeEach(async () => {
        jest.spyOn(service, "getMerkleTree");
        merkleTree = await service.getMerkleTree(HardcodedParticipationsStub());
      });

      test('then it should call service.getMerkleTree', () => {
        expect(service.getMerkleTree).toHaveBeenCalled();
      });

      test('then it should return a correct MerkleTree', () => {
        expect(merkleTree).toMatchObject(HardcodedMerkleTreeStub());
      });    
    });
  });  

  describe('getMerkleTree with Mocks and check validity', () => {
    describe('When getMerkleTree is called with a mock participations and votes', () => {  
      jest.setTimeout(50000);
      let participations, merkleTree = null;

      beforeEach(async () => {
        participations = ParticipationsStub();

        jest.spyOn(service, "getMerkleTree");
        merkleTree = await service.getMerkleTree(participations);
      });

      test('then it should call service.getMerkleTree', () => {
        expect(service.getMerkleTree).toHaveBeenCalled();
      });

      test('then it should return a correct MerkleTree', () => {
        expect(merkleTree).toMatchObject(MerkleTreeStub());
      });
    });
  });

  describe('getMerkleTree', () => {
    describe('When getMerkleTree is called with empty participations', () => {  
      jest.setTimeout(50000);
      let merkleTree = null;

      beforeEach(async () => {
        jest.spyOn(service, "getMerkleTree");
      });

      test('it should throw an error if no records are found', async() => {
        await expect(service.getMerkleTree([]))
        .rejects
        .toEqual(new NotFoundException("Sorry, you must pass a participations json as parameter, and it must be a valid array."));
      });  
    });
  });
  
  describe('getLayers', () => {
    describe('When getLayers is called', () => {  
      jest.setTimeout(50000);
      let hash = null;

      beforeEach(async () => {
        jest.spyOn(MerkleTree, "getLayers");
        hash = MerkleTree.getLayers([]);
      });

      test('then it should call merkleTree.getLayers', () => {
        expect(MerkleTree.getLayers).toHaveBeenCalledWith([]);
      });     
    });
  });  

  describe('combinedHash', () => {
    describe('When combinedHash is called', () => {  
      jest.setTimeout(50000);
      let hash = null;

      beforeEach(async () => {
        jest.spyOn(MerkleTree, "combinedHash");
        hash = MerkleTree.combinedHash(null, participations[0]);
      });

      test('then it should call merkleTree.combinedHash', () => {
        expect(MerkleTree.combinedHash).toHaveBeenCalledWith(null, participations[0]);
      });     
    });
  });

  describe('getProof / getRoot', () => {
    describe('When getProof / getRoot is called', () => {
      jest.setTimeout(50000);
      let merkleTreeObj = new MerkleTree();
      let proof, root, merkleTree, leaf  = null;

      beforeEach(async () => {
        jest.spyOn(merkleTreeObj, "createParticipationTree");
        merkleTree = merkleTreeObj.createParticipationTree(JSON.stringify(participations));

        jest.spyOn(merkleTreeObj, "getRoot");
        root = merkleTreeObj.getRoot();        

        leaf = merkleTree.leafs.find(
          (item) => item.address.toLowerCase() === "0xac60913f8e9821e9006507b05e1956f5a82749c1".toLowerCase(),
        );

        jest.spyOn(merkleTreeObj, "getProof");        
        proof = merkleTreeObj.getProof(leaf.leaf);     
      });

      test('then it should call merkleTree.getProof', () => {
        expect(merkleTreeObj.getProof).toHaveBeenCalledWith(leaf.leaf);
      });

      test('then it should call merkleTree.getRoot', () => {
        expect(merkleTreeObj.getRoot).toHaveBeenCalled();
      });      
    });

    describe('When getProof is called on unexisting participant', () => {
      jest.setTimeout(50000);
      let merkleTreeObj = new MerkleTree();
      let merkleTree = null;

      beforeEach(async () => {
        jest.spyOn(merkleTreeObj, "createParticipationTree");
        merkleTree = merkleTreeObj.createParticipationTree(participations);

        jest.spyOn(merkleTreeObj, "getProof");
      });

      test('it should throw an error if no records are found', async() => {
        try {
          merkleTreeObj.getProof("not_existing_one");          
        } catch(error) {
          expect(error).toBeInstanceOf(Error);
        }
      }); 
    });    
  }); 
});
