import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config'; // <--- Імпортуйте ConfigService
import { SuperheroModule } from './superhero/superhero.module';
import {WinstonModule} from "nest-winston";
import {winstonLogger} from "./utils/logger";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule,WinstonModule.forRoot({ instance: winstonLogger }),],
      useFactory: async (configService: ConfigService) => {
        const mongoUri = configService.get<string>('MONGODB_URI');
        return {
          uri: mongoUri,

        };
      },
      inject: [ConfigService],
    }),
    SuperheroModule,
  ],
})
export class AppModule {}