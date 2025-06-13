import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  Query,
  DefaultValuePipe,
  ParseIntPipe,
  LoggerService,
  Inject,
  Res,
  HttpStatus
} from '@nestjs/common';
import { Response } from 'express';
import { SuperheroService } from './superhero.service';
import { CreateSuperheroDto } from './dto/superhero.dto';
import { WINSTON_MODULE_NEST_PROVIDER } from 'nest-winston';

@Controller('superheroes')
export class SuperheroController {
  constructor(
      private readonly superheroService: SuperheroService,
      @Inject(WINSTON_MODULE_NEST_PROVIDER) private readonly logger: LoggerService
  ) {}

  @Post()
  async create(@Body() createDto: CreateSuperheroDto, @Res() res: Response) {
    try {
      const hero = await this.superheroService.create(createDto);
      this.logger.log(`✅ Superhero created: ${hero.nickname}`);
      return res.status(HttpStatus.CREATED).json(hero);
    } catch (error) {
      let message = 'Unknown error';
      if (error instanceof Error) {
        message = error.message;
      }
      this.logger.error(`❌ Controller create error: ${message}`);
      return res.status((error as any).status || 500).json({ message });
    }

  }

  @Get()
  async findAll(
      @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
      @Query('limit', new DefaultValuePipe(5), ParseIntPipe) limit: number,
      @Query('search') search: string,
      @Res() res: Response
  ) {
    try {
      const data = await this.superheroService.findAll(page, limit, search);
      return res.status(HttpStatus.OK).json(data);
    } catch (error) {
      let message = 'Unknown error';
      if (error instanceof Error) {
        message = error.message;
      }
      this.logger.error(`❌ Controller findAll error: ${message}`);
      return res.status((error as any).status || 500).json({ message });
    }
  }


  @Get(':id')
  async findOne(@Param('id') id: string, @Res() res: Response) {
    try {
      const hero = await this.superheroService.findOne(id);
      return res.status(HttpStatus.OK).json(hero);
    } catch (error) {
      let message = 'Unknown error';
      if (error instanceof Error) {
        message = error.message;
      }
      this.logger.error(`❌ Controller findOne error: ${message}`);
      return res.status((error as any).status || 500).json({ message });
    }

  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() dto: CreateSuperheroDto, @Res() res: Response) {
    try {
      const updated = await this.superheroService.update(id, dto);
      return res.status(HttpStatus.OK).json(updated);
    }catch (error) {
      let message = 'Unknown error';
      if (error instanceof Error) {
        message = error.message;
      }
      this.logger.error(`❌ Controller update error: ${message}`);
      return res.status((error as any).status || 500).json({ message });
    }

  }

  @Delete(':id')
  async remove(@Param('id') id: string, @Res() res: Response) {
    try {
      await this.superheroService.remove(id);
      return res.status(HttpStatus.NO_CONTENT).send();
    } catch (error) {
      let message = 'Unknown error';
      if (error instanceof Error) {
        message = error.message;
      }
      this.logger.error(`❌ Controller delete error: ${message}`);
      return res.status((error as any).status || 500).json({ message });
    }

  }
}
