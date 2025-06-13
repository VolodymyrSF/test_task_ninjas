import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule, ConfigService } from '@nestjs/config'; // <--- Імпортуйте ConfigService
import { SuperheroModule } from './superhero/superhero.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // Рекомендовано для ConfigModule, щоб він був доступний у всіх модулях
      envFilePath: '.env', // Переконайтеся, що це правильний шлях до вашого .env файлу
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule], // <--- Важливо: імпортуємо ConfigModule, щоб ConfigService був доступний
      useFactory: async (configService: ConfigService) => {
        const mongoUri = configService.get<string>('MONGODB_URI');
        console.log('MongoDB URI з .env:', mongoUri); // <--- Додайте для перевірки
        if (!mongoUri) {
          console.error('Змінна середовища MONGODB_URI не знайдена!');
          // Можете додати логіку для виходу або використання дефолтного значення
          // throw new Error('MONGODB_URI environment variable is not set.');
        }
        return {
          uri: mongoUri,
          // Додаткові опції Mongoose, якщо потрібно
          // useNewUrlParser: true,
          // useUnifiedTopology: true,
        };
      },
      inject: [ConfigService], // <--- Вказуємо, що потрібен ConfigService
    }),
    SuperheroModule,
  ],
})
export class AppModule {}