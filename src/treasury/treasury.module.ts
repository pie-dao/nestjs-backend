import { Module } from '@nestjs/common';
import { HttpModule} from '@nestjs/axios';
import { MongooseModule } from '@nestjs/mongoose';
import { TreasuryService } from './treasury.service';
import { TreasuryController } from './treasury.controller';
// import { PieEntity, PieSchema } from './entities/pie.entity';
// import { PieHistoryEntity, PieHistorySchema } from './entities/pie-history.entity';

@Module({
  imports: [
    HttpModule,
    // MongooseModule.forFeature([{ name: PieEntity.name, schema: PieSchema }]),
    // MongooseModule.forFeature([{ name: PieHistoryEntity.name, schema: PieHistorySchema }])
  ],
  controllers: [TreasuryController],
  providers: [TreasuryService]
})
export class TreasuryModule {}
