import {
  Injectable,
  NotFoundException,
  InternalServerErrorException,
  ConflictException,
  LoggerService,
  Inject
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Superhero, SuperheroDocument } from './superhero.schema';
import { CreateSuperheroDto, UpdateSuperheroDto } from './dto/superhero.dto';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';

@Injectable()
export class SuperheroService {
  constructor(
      @InjectModel(Superhero.name) private superheroModel: Model<SuperheroDocument>,
      @Inject(WINSTON_MODULE_NEST_PROVIDER) private readonly logger: LoggerService
  ) {}

  async create(createSuperheroDto: CreateSuperheroDto): Promise<Superhero> {
    try {
      const exists = await this.superheroModel.findOne({ nickname: createSuperheroDto.nickname });
      if (exists) {
        this.logger.warn(`⚠️ Nickname already exists: ${createSuperheroDto.nickname}`);
        throw new ConflictException('Superhero with this nickname already exists.');
      }

      const createdSuperhero = new this.superheroModel(createSuperheroDto);
      const saved = await createdSuperhero.save();
      this.logger.log(`✅ Created superhero with ID: ${saved._id}`);
      return saved;
    } catch (error) {
      const err = error as Error;
      this.logger.error(`❌ Create failed: ${err.message}`);
      throw new InternalServerErrorException('Failed to create superhero');
    }
  }

  async findAll(page = 1, limit = 5, search?: string) {
    try {
      const skip = (page - 1) * limit;
      const filter = search ? { nickname: { $regex: search, $options: 'i' } } : {};
      const superheroes = await this.superheroModel.find(filter).skip(skip).limit(limit).exec();
      const total = await this.superheroModel.countDocuments(filter).exec();
      const totalPages = Math.ceil(total / limit);
      this.logger.log(`📦 Fetched page ${page} of superheroes`);
      return { superheroes, total, totalPages };
    } catch (error) {
      const err = error as Error;
      this.logger.error(`❌ Fetch all failed: ${err.message}`);
      throw new InternalServerErrorException('Failed to fetch superheroes');
    }
  }

  async findOne(id: string): Promise<Superhero> {
    try {
      const hero = await this.superheroModel.findById(id).exec();
      if (!hero) {
        this.logger.warn(`⚠️ Superhero not found: ${id}`);
        throw new NotFoundException('Superhero not found');
      }
      return hero;
    } catch (error) {
      const err = error as Error;
      this.logger.error(`❌ Fetch one failed: ${err.message}`);
      throw new InternalServerErrorException('Failed to fetch superhero');
    }
  }

  async update(id: string, updateDto: UpdateSuperheroDto): Promise<Superhero> {
    try {
      const updated = await this.superheroModel.findByIdAndUpdate(id, updateDto, { new: true }).exec();
      if (!updated) {
        this.logger.warn(`⚠️ Update failed, superhero not found: ${id}`);
        throw new NotFoundException('Superhero not found');
      }
      this.logger.log(`✅ Updated superhero ${id}`);
      return updated;
    } catch (error) {
      const err = error as Error;
      this.logger.error(`❌ Update error: ${err.message}`);
      throw new InternalServerErrorException('Failed to update superhero');
    }
  }

  async remove(id: string): Promise<void> {
    try {
      const result = await this.superheroModel.findByIdAndDelete(id).exec();
      if (!result) {
        this.logger.warn(`⚠️ Delete failed, superhero not found: ${id}`);
        throw new NotFoundException('Superhero not found');
      }
      this.logger.log(`🗑 Superhero deleted: ${id}`);
    } catch (error) {
      const err = error as Error;
      this.logger.error(`❌ Delete error: ${err.message}`);
      throw new InternalServerErrorException('Failed to delete superhero');
    }
  }
}
