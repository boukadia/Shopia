import { IsArray, IsEnum, IsNumber, IsOptional } from 'class-validator';
import { CommandeStatus } from '@prisma/client';

export class UpdateProduitDto {
  @IsNumber()
  produitId: number;

  @IsNumber()
  quantity: number;
}

export class UpdateCommandeDto {
  @IsOptional()
  @IsEnum(CommandeStatus)
  status?: CommandeStatus;

  @IsOptional()
  @IsArray()
  addProduits?: UpdateProduitDto[];

  @IsOptional()
  @IsArray()
  updateProduits?: UpdateProduitDto[];

  @IsOptional()
  @IsArray()
  @IsNumber({}, { each: true })
  removeProduitIds?: number[];
}
