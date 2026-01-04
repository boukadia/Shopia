import { IsNumber, IsOptional, IsString, Min } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateProduitDto {
  @ApiProperty({
    description: 'Product name',
    example: 'Laptop HP',
    type: String
  })
  @IsString()
  nom: string;

  @ApiPropertyOptional({
    description: 'Product description',
    example: 'Laptop HP 15-dw3000 Intel Core i5',
    type: String
  })
  @IsOptional()
  @IsString()
  description: string;

  @ApiProperty({
    description: 'Product price in MAD',
    example: 5000,
    type: Number
  })
  @IsNumber()
  prix: number;

  @ApiProperty({
    description: 'Category ID',
    example: 1,
    type: Number
  })
  @IsNumber()
  categoryId: number;

  @ApiProperty({
    description: 'Product SKU (Stock Keeping Unit)',
    example: 'LAP-HP-001',
    type: String
  })
  @IsString()
  sku: string;

  @ApiPropertyOptional({
    description: 'Initial stock quantity',
    example: 50,
    type: Number,
    default: 0
  })
  @IsOptional()
  @IsNumber()
  @Min(0)
  quantity?: number;

  @ApiPropertyOptional({
    description: 'Reserved quantity',
    example: 0,
    type: Number,
    default: 0
  })
  @IsOptional()
  @IsNumber()
  @Min(0)
  reserved?: number;
}
