import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Cron } from '@nestjs/schedule';
import { Model } from 'mongoose';
// import { PieDto } from './dto/pies.dto';
// import { PieDocument, PieEntity } from './entities/pie.entity';
// import { PieHistoryDocument, PieHistoryEntity } from './entities/pie-history.entity';
import { HttpService } from '@nestjs/axios';

@Injectable()
export class TreasuryService {

  private readonly logger = new Logger(TreasuryService.name);

  constructor(
    private httpService: HttpService,
    // @InjectModel(PieEntity.name) private pieModel: Model<PieDocument>,
    // @InjectModel(PieHistoryEntity.name) private pieHistoryModel: Model<PieHistoryDocument>
  ) {}

  // Use this every 5 minutes cron setup for testing purposes.
  // */5 * * * *
  // USe this every hour cron setup for production releases.
  // 0 * * * *
  @Cron('*/1 * * * *')
  async getTreasury(test?: boolean): Promise<void> {
    this.logger.debug("Treasury Service is running");
  }
}
