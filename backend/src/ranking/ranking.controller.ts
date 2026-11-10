import { Controller, Get, Param, Query } from '@nestjs/common';
import { RankingService } from './ranking.service.js';
import type { RankingFilters } from './ranking.service.js';

@Controller('ranking')
export class RankingController {
  constructor(private readonly rankingService: RankingService) {}

  @Get()
  findAll(@Query() filters?: RankingFilters) {
    return this.rankingService.findAll(filters);
  }

  @Get(':periodo')
  findByPeriodo(@Param('periodo') periodo: string, @Query() filters?: Omit<RankingFilters, 'periodo'>) {
    return this.rankingService.findByPeriodo(periodo, filters);
  }
}
