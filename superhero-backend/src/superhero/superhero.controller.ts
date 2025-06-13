import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  ValidationPipe,
  UsePipes,
} from '@nestjs/common';
import { SuperheroService } from './superhero.service';
import { CreateSuperheroDto, UpdateSuperheroDto } from './dto/superhero.dto';

@Controller('superheroes')
export class SuperheroController {
  constructor(private readonly superheroService: SuperheroService) {}

  @Post()
  @UsePipes(new ValidationPipe())
  create(@Body() createSuperheroDto: CreateSuperheroDto) {
    return this.superheroService.create(createSuperheroDto);
  }

  @Get()
  findAll(@Query('page') page: string = '1', @Query('limit') limit: string = '5') {
    const pageNum = parseInt(page, 10) || 1;
    const limitNum = parseInt(limit, 10) || 5;
    return this.superheroService.findAll(pageNum, limitNum);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.superheroService.findOne(id);
  }

  @Patch(':id')
  @UsePipes(new ValidationPipe())
  update(@Param('id') id: string, @Body() updateSuperheroDto: UpdateSuperheroDto) {
    return this.superheroService.update(id, updateSuperheroDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.superheroService.remove(id);
  }
}

