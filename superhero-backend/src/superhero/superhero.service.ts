import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Superhero, SuperheroDocument } from './superhero.schema';
import { CreateSuperheroDto, UpdateSuperheroDto } from './dto/superhero.dto';

@Injectable()
export class SuperheroService {
  constructor(
    @InjectModel(Superhero.name) private superheroModel: Model<SuperheroDocument>,
  ) {}

  async create(createSuperheroDto: CreateSuperheroDto): Promise<Superhero> {
    const createdSuperhero = new this.superheroModel(createSuperheroDto);
    return createdSuperhero.save();
  }

  async findAll(page: number = 1, limit: number = 5): Promise<{ superheroes: Superhero[], total: number, totalPages: number }> {
    const skip = (page - 1) * limit;
    const superheroes = await this.superheroModel
      .find()
      .skip(skip)
      .limit(limit)
      .exec();
    
    const total = await this.superheroModel.countDocuments().exec();
    const totalPages = Math.ceil(total / limit);
    
    return { superheroes, total, totalPages };
  }

  async findOne(id: string): Promise<Superhero> {
    const superhero = await this.superheroModel.findById(id).exec();
    if (!superhero) {
      throw new NotFoundException(`Superhero with ID ${id} not found`);
    }
    return superhero;
  }

  async update(id: string, updateSuperheroDto: UpdateSuperheroDto): Promise<Superhero> {
    const updatedSuperhero = await this.superheroModel
      .findByIdAndUpdate(id, updateSuperheroDto, { new: true })
      .exec();
    
    if (!updatedSuperhero) {
      throw new NotFoundException(`Superhero with ID ${id} not found`);
    }
    
    return updatedSuperhero;
  }

  async remove(id: string): Promise<void> {
    const result = await this.superheroModel.findByIdAndDelete(id).exec();
    if (!result) {
      throw new NotFoundException(`Superhero with ID ${id} not found`);
    }
  }
}

