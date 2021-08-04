import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PiesModule } from './pies/pies.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    PiesModule,
    // MongooseModule.forRoot('mongodb://localhost/piedao_backend')
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
