import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PieEntity, PieSchema } from './entities/pie.entity';
import { PiesController } from './pies.controller';
import { PiesService } from './pies.service';

@Module({
  imports: [MongooseModule.forFeature([{ name: PieEntity.name, schema: PieSchema }])],
  controllers: [PiesController],
  providers: [PiesService]
})
export class PiesModule {}
