import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PiesModule } from './pies/pies.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { ScheduleModule } from '@nestjs/schedule';
import { StakingModule } from './staking/staking.module';
import { TreasuryModule } from './treasury/treasury.module';
import { TasksModule } from './tasks/tasks.module';

@Module({
  imports: [
    PiesModule,
    ConfigModule.forRoot(),
    ScheduleModule.forRoot(),
    MongooseModule.forRoot(process.env.MONGO_DB),
    StakingModule,
    TreasuryModule,    
    TasksModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
