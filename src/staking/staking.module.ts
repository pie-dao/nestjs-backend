import { Module } from '@nestjs/common';
import { StakingService } from './staking.service';
import { StakingController } from './staking.controller';
import { HttpModule} from '@nestjs/axios';
import { MongooseModule } from '@nestjs/mongoose';
import { MerkleTree } from '../helpers/merkleTree/merkle-tree';
import { EpochEntity, EpochSchema } from './entities/epoch.entity';

@Module({
  imports: [
    HttpModule,
    MongooseModule.forFeature([{ name: EpochEntity.name, schema: EpochSchema }])
  ],
  controllers: [StakingController],
  providers: [StakingService, MerkleTree]
})
export class StakingModule {}
