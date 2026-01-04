import { IsNumber, IsOptional, IsString } from 'class-validator';
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
}
