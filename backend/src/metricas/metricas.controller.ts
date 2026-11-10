import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CreateMetricaDto } from './dto/create-metrica.dto.js';
import { UpdateMetricaDto } from './dto/update-metrica.dto.js';
import { MetricasService } from './metricas.service.js';

@Controller('metricas')
export class MetricasController {
  constructor(private readonly metricasService: MetricasService) {}

  @Get()
  findAll() {
    return this.metricasService.findAll();
  }

  @Post()
  create(@Body() createMetricaDto: CreateMetricaDto) {
    return this.metricasService.create(createMetricaDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.metricasService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateMetricaDto: UpdateMetricaDto) {
    return this.metricasService.update(id, updateMetricaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.metricasService.remove(id);
  }
}
