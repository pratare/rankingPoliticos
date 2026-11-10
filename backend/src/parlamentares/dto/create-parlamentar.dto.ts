import { IsBoolean, IsOptional, IsString } from 'class-validator';

export class CreateParlamentarDto {
  @IsString()
  nome: string;

  @IsString()
  cargo: string;

  @IsString()
  uf: string;

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
