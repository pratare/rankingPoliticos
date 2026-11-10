import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CreateCriterioDto } from './dto/create-criterio.dto.js';
import { UpdateCriterioDto } from './dto/update-criterio.dto.js';
import { CriteriosService } from './criterios.service.js';

@Controller('criterios')
export class CriteriosController {
  constructor(private readonly criteriosService: CriteriosService) {}

  @Get()
  findAll() {
    return this.criteriosService.findAll();
  }

  @Post()
  create(@Body() createCriterioDto: CreateCriterioDto) {
    return this.criteriosService.create(createCriterioDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.criteriosService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateCriterioDto: UpdateCriterioDto) {
    return this.criteriosService.update(id, updateCriterioDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.criteriosService.remove(id);
  }
}
