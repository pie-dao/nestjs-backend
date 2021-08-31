import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PiesModule } from './pies/pies.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { ScheduleModule } from '@nestjs/schedule';
import { StakingModule } from './staking/staking.module';

@Module({
  imports: [
    PiesModule,
    ConfigModule.forRoot(),
    ScheduleModule.forRoot(),
    MongooseModule.forRoot(process.env.NODE_ENV == 'development' ? process.env.MONGO_DB_TEST : process.env.MONGO_DB),
    StakingModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
