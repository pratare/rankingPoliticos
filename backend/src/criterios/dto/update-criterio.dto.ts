import { IsNumber, IsOptional, IsString, Min } from 'class-validator';

export class UpdateCriterioDto {
  @IsOptional()
  @IsString()
  nome?: string;

  @IsOptional()
  @IsString()
  codigo?: string;

  @IsOptional()
  @IsString()
  descricao?: string;

  @IsOptional()
  @IsNumber()
  @Min(0)
  peso?: number;

  @IsOptional()
  @IsNumber()
  @Min(0)
  ordem?: number;

  @IsOptional()
  @IsString()
  fontePrincipalId?: string;
}
