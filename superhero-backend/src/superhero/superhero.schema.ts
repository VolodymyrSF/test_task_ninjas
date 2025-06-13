import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type SuperheroDocument = Superhero & Document;

@Schema()
export class Superhero {
  @Prop({ required: true })
  nickname: string;

  @Prop({ required: true })
  real_name: string;

  @Prop({ required: true })
  origin_description: string;

  @Prop({ required: true })
  superpowers: string;

  @Prop({ required: true })
  catch_phrase: string;

  @Prop({ type: [String], default: [] })
  images: string[];
}

export const SuperheroSchema = SchemaFactory.createForClass(Superhero);

