import { IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateMetricaDto {
  @IsOptional()
  @IsString()
  parlamentarId?: string;

  @IsOptional()
  @IsString()
  criterioId?: string;

  @IsOptional()
  @IsString()
  fonteDadoId?: string;

  @IsOptional()
  @IsNumber()
  valor?: number;

  @IsOptional()
  @IsNumber()
  nota?: number;

  @IsOptional()
  @IsString()
  unidade?: string;

  @IsOptional()
  @IsString()
  observacao?: string;

  @IsOptional()
  @IsString()
  dataReferencia?: string;
}
