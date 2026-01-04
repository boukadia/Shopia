import { IsEnum, IsOptional, IsNumber, IsArray, ValidateNested, IsPositive } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { OrderStatus } from '../../common/constants/order-status.enum';

class ProduitUpdateDto {
  @ApiProperty({ description: 'Product ID', example: 1 })
  @IsNumber()
  @IsPositive()
  produitId: number;

  @ApiProperty({ description: 'Quantity', example: 5 })
  @IsNumber()
  @IsPositive()
  quantity: number;
}

export class UpdateCommandeDto {
  @ApiPropertyOptional({
    description: 'Order status',
    enum: OrderStatus,
    example: OrderStatus.PROCESSING
  })
  @IsEnum(OrderStatus)
  @IsOptional()
  status?: OrderStatus;

  @ApiPropertyOptional({
    description: 'Add new products to order',
    type: [ProduitUpdateDto],
    example: [{ produitId: 5, quantity: 3 }]
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ProduitUpdateDto)
  @IsOptional()
  addProduits?: ProduitUpdateDto[];

  @ApiPropertyOptional({
    description: 'Update existing product quantities',
    type: [ProduitUpdateDto],
    example: [{ produitId: 1, quantity: 10 }]
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ProduitUpdateDto)
  @IsOptional()
  updateProduits?: ProduitUpdateDto[];

  @ApiPropertyOptional({
    description: 'Remove products by IDs',
    type: [Number],
    example: [3, 7]
  })
  @IsArray()
  @IsNumber({}, { each: true })
  @IsPositive({ each: true })
  @IsOptional()
  removeProduitIds?: number[];
}
