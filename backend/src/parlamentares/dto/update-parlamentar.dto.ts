import { IsBoolean, IsOptional, IsString } from 'class-validator';

export class UpdateParlamentarDto {
  @IsOptional()
  @IsString()
  nome?: string;

  @IsOptional()
  @IsString()
  cargo?: string;

  @IsOptional()
  @IsString()
  uf?: string;

  @IsOptional()
  @IsString()
  partido?: string;

  @IsOptional()
  @IsString()
  fotoUrl?: string;

  @IsOptional()
  @IsString()
  perfilUrl?: string;

  @IsOptional()
  @IsBoolean()
  ativo?: boolean;
}
