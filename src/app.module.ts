import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PiesModule } from './pies/pies.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';

console.log(process.env.MONGO_DB);
@Module({
  imports: [
    PiesModule,
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.MONGO_DB)
    // 'mongodb+srv://heroku-app:4IGm1eTroN7iJ7GH@piedaobackendcluster.cmtix.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
