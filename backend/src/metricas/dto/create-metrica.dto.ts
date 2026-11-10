import { IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateMetricaDto {
  @IsString()
  parlamentarId: string;

  @IsString()
  criterioId: string;

  @IsOptional()
  @IsString()
  fonteDadoId?: string;

  @IsNumber()
  valor: number;

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
