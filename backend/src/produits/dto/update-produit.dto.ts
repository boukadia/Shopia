import { IsBoolean, IsNumber, IsOptional, IsString } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateProduitDto {
  @ApiPropertyOptional({
    description: 'Product name',
    example: 'Laptop HP',
    type: String
  })
  @IsString()
  @IsOptional()
  nom?: string;

  @ApiPropertyOptional({
    description: 'Product description',
    example: 'Laptop HP 15-dw3000 Intel Core i5',
    type: String
  })
  @IsString()
  @IsOptional()
  description?: string;

  @ApiPropertyOptional({
    description: 'Product price in MAD',
    example: 5000,
    type: Number
  })
  @IsNumber()
  @IsOptional()
  prix?: number;

  @ApiPropertyOptional({
    description: 'Category ID',
    example: 1,
    type: Number
  })
  @IsNumber()
  @IsOptional()
  categoryId?: number;

  @ApiPropertyOptional({
    description: 'Product active status',
    example: true,
    type: Boolean
  })
  @IsBoolean()
  @IsOptional()
  isActive?: boolean;
}
