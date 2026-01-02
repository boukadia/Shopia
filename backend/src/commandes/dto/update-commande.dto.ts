import { IsEnum, IsOptional, IsNumber, IsArray, ValidateNested, IsPositive } from 'class-validator';
import { Type } from 'class-transformer';
import { OrderStatus } from '../../common/constants/order-status.enum';

class ProduitUpdateDto {
  @IsNumber()
  @IsPositive()
  produitId: number;

  @IsNumber()
  @IsPositive()
  quantity: number;
}

export class UpdateCommandeDto {
  @IsEnum(OrderStatus)
  @IsOptional()
  status?: OrderStatus;

  // Operations منفصلة للمنتجات
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ProduitUpdateDto)
  @IsOptional()
  addProduits?: ProduitUpdateDto[];

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ProduitUpdateDto)
  @IsOptional()
  updateProduits?: ProduitUpdateDto[];

  @IsArray()
  @IsNumber({}, { each: true })
  @IsPositive({ each: true })
  @IsOptional()
  removeProduitIds?: number[];
}
