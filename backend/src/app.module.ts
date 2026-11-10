import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { CriteriosModule } from './criterios/criterios.module.js';
import { MetricasModule } from './metricas/metricas.module.js';
import { ParlamentaresModule } from './parlamentares/parlamentares.module.js';
import { PrismaModule } from './prisma/prisma.module.js';
import { RankingModule } from './ranking/ranking.module.js';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env'],
    }),
    PrismaModule,
    ParlamentaresModule,
    CriteriosModule,
    MetricasModule,
    RankingModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
