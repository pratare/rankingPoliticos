import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { CreateParlamentarDto } from './dto/create-parlamentar.dto.js';
import { UpdateParlamentarDto } from './dto/update-parlamentar.dto.js';
import { ParlamentaresService } from './parlamentares.service.js';
import type { ParlamentarFilters } from './parlamentares.service.js';

@Controller('parlamentares')
export class ParlamentaresController {
  constructor(private readonly parlamentaresService: ParlamentaresService) {}

  @Get()
  findAll(@Query() filters?: ParlamentarFilters) {
    return this.parlamentaresService.findAll(filters);
  }

  @Post()
  create(@Body() createParlamentarDto: CreateParlamentarDto) {
    return this.parlamentaresService.create(createParlamentarDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.parlamentaresService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateParlamentarDto: UpdateParlamentarDto) {
    return this.parlamentaresService.update(id, updateParlamentarDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.parlamentaresService.remove(id);
  }
}
