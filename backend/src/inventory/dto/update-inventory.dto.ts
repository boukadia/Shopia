import { PartialType } from '@nestjs/mapped-types';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString, Min } from 'class-validator';
import { CreateInventoryDto } from './create-inventory.dto';

export class UpdateInventoryDto extends PartialType(CreateInventoryDto) {
  @ApiPropertyOptional({
    description: 'SKU code',
    example: 'LAP-HP-002',
    type: String
  })
  @IsString()
  @IsOptional()
  sku?: string;

  @ApiPropertyOptional({
    description: 'Available quantity',
    example: 45,
    type: Number
  })
  @IsNumber()
  @Min(0)
  @IsOptional()
  quantity?: number;

  @ApiPropertyOptional({
    description: 'Reserved quantity',
    example: 5,
    type: Number
  })
  @IsNumber()
  @Min(0)
  @IsOptional()
  reserved?: number;
}
