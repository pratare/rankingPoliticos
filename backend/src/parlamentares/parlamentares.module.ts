import { Module } from '@nestjs/common';
import { ParlamentaresController } from './parlamentares.controller.js';
import { ParlamentaresService } from './parlamentares.service.js';

@Module({
  controllers: [ParlamentaresController],
  providers: [ParlamentaresService],
  exports: [ParlamentaresService],
})
export class ParlamentaresModule {}
