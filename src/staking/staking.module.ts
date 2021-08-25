import { Module } from '@nestjs/common';
import { StakingService } from './staking.service';
import { StakingController } from './staking.controller';
import { HttpModule} from '@nestjs/axios';

@Module({
  imports: [HttpModule],
  controllers: [StakingController],
  providers: [StakingService]
})
export class StakingModule {}
