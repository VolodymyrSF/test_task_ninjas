import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module.js';
import {winstonLogger} from "./utils/logger";

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: winstonLogger
  });
  
  app.enableCors({
    origin: true,
    credentials: true,
  });
  
  await app.listen(3001, '0.0.0.0');
  console.log('Application is running on: http://localhost:3001');
}
bootstrap();
