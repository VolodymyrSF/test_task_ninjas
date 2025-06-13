import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SuperheroController } from './superhero.controller';
import { SuperheroService } from './superhero.service';
import { Superhero, SuperheroSchema } from './superhero.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Superhero.name, schema: SuperheroSchema }]),
  ],
  controllers: [SuperheroController],
  providers: [SuperheroService],
})
export class SuperheroModule {}

