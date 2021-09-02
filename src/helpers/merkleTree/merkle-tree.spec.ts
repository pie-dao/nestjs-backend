import { Test, TestingModule } from '@nestjs/testing';
import { MerkleTree } from './merkle-tree';
import { StakingService } from '../../staking/staking.service';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';
import { ScheduleModule } from '@nestjs/schedule';
import { MongooseModule } from '@nestjs/mongoose';
import { EpochEntity, EpochSchema } from '../../staking/entities/epoch.entity';

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
    let merkleTreeObj = new MerkleTree();
    expect(merkleTreeObj).toBeDefined();
  });

  describe('createParticipationTree', () => {
    describe('When createParticipationTree is called with empty participations', () => {  
      jest.setTimeout(15000);
      let merkleTreeObj = new MerkleTree();
      let merkleTree = null;
      let root = null;

      beforeEach(async () => {
        jest.spyOn(merkleTreeObj, "createParticipationTree");
        merkleTree = merkleTreeObj.createParticipationTree();

        jest.spyOn(merkleTreeObj, "getRoot");
        root = merkleTreeObj.getRoot();
      });

      test('then it should call merkleTree.createParticipationTree', () => {
        expect(merkleTreeObj.createParticipationTree).toHaveBeenCalled();
      });

      test('then it should return a MerkleTree', () => {
        expect(merkleTree).toMatchObject({"elements": [], "layers": [[""]], "leafs": []});
      });

      test('then it should call merkleTree.getRoot', () => {
        expect(merkleTreeObj.createParticipationTree).toHaveBeenCalled();
      });      
    });
  });
  
  describe('combinedHash', () => {
    describe('When combinedHash is called', () => {  
      jest.setTimeout(15000);
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

  describe('getProof', () => {
    describe('When getProof is called', () => {
      jest.setTimeout(15000);
      let merkleTreeObj = new MerkleTree();
      let proof = null;
      let merkleTree = null;
      let leaf = null;

      beforeEach(async () => {
        jest.spyOn(merkleTreeObj, "createParticipationTree");
        merkleTree = merkleTreeObj.createParticipationTree(participations);

        leaf = merkleTree.leafs.find(
          (item) => item.address.toLowerCase() === "0x1a1087bf077f74fb21fd838a8a25cf9fe0818450".toLowerCase(),
        );

        jest.spyOn(merkleTreeObj, "getProof");        
        proof = merkleTreeObj.getProof(leaf.leaf);     
      });

      test('then it should call merkleTree.getProof', () => {
        expect(merkleTreeObj.getProof).toHaveBeenCalledWith(leaf.leaf);
      });
    });

    describe('When getProof is called on unexisting participant', () => {
      jest.setTimeout(15000);
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
