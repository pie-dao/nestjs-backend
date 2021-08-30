import { Module } from '@nestjs/common';
import { StakingService } from './staking.service';
import { StakingController } from './staking.controller';
import { HttpModule} from '@nestjs/axios';
import { MongooseModule } from '@nestjs/mongoose';
import { MerkleTree } from '../helpers/merkleTree/merkle-tree';
import { ParticipationEntity, ParticipationSchema } from './entities/participation.entity';

@Module({
  imports: [
    HttpModule,
    MongooseModule.forFeature([{ name: ParticipationEntity.name, schema: ParticipationSchema }])
  ],
  controllers: [StakingController],
  providers: [StakingService, MerkleTree]
})
export class StakingModule {}
