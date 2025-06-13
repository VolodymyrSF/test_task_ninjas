import { IsString, IsNotEmpty, IsArray, IsOptional } from 'class-validator';

export class CreateSuperheroDto {
  @IsString()
  @IsNotEmpty()
  nickname: string;

  @IsString()
  @IsNotEmpty()
  real_name: string;

  @IsString()
  @IsNotEmpty()
  origin_description: string;

  @IsString()
  @IsNotEmpty()
  superpowers: string;

  @IsString()
  @IsNotEmpty()
  catch_phrase: string;

  @IsArray()
  @IsOptional()
  images?: string[];
}

export class UpdateSuperheroDto {
  @IsString()
  @IsOptional()
  nickname?: string;

  @IsString()
  @IsOptional()
  real_name?: string;

  @IsString()
  @IsOptional()
  origin_description?: string;

  @IsString()
  @IsOptional()
  superpowers?: string;

  @IsString()
  @IsOptional()
  catch_phrase?: string;

  @IsArray()
  @IsOptional()
  images?: string[];
}

