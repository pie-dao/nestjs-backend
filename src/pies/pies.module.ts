import { Module } from '@nestjs/common';
import { PiesController } from './pies.controller';
import { PiesService } from './pies.service';

@Module({
  controllers: [PiesController],
  providers: [PiesService]
})
export class PiesModule {}
