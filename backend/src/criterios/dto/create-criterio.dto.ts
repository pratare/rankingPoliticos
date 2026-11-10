import { IsNumber, IsOptional, IsString, Min } from 'class-validator';

export class CreateCriterioDto {
  @IsString()
  nome: string;

  @IsString()
  codigo: string;

  @IsOptional()
  @IsString()
  descricao?: string;

  @IsNumber()
  @Min(0)
  peso: number;

  @IsNumber()
  @Min(0)
  ordem: number;

  @IsOptional()
  @IsString()
  fontePrincipalId?: string;
}
