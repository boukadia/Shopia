import { IsNumber, IsPositive, IsString, Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateInventoryDto {
  @ApiProperty({
    description: 'Product ID',
    example: 1,
    type: Number
  })
  @IsNumber()
  @IsPositive()
  productId: number;

  @ApiProperty({
    description: 'SKU code',
    example: 'LAP-HP-001',
    type: String
  })
  @IsString()
  sku: string;

  @ApiProperty({
    description: 'Available quantity',
    example: 50,
    type: Number
  })
  @IsNumber()
  @Min(0)
  quantity: number;

  @ApiProperty({
    description: 'Reserved quantity',
    example: 0,
    type: Number,
    default: 0
  })
  @IsNumber()
  @Min(0)
  reserved: number;
}
