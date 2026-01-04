import { IsArray, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCommandeDto {
  @ApiProperty({
    description: 'List of products with quantities',
    example: [
      { produitId: 1, quantity: 2 },
      { produitId: 3, quantity: 5 },
    ],
    type: 'array',
    items: {
      type: 'object',
      properties: {
        produitId: { type: 'number' },
        quantity: { type: 'number' },
      },
    },
  })
  @IsArray()
  produits: {
    produitId: number;
    quantity: number;
  }[];

  @ApiProperty({
    description: 'Total price of the order',
    example: 150,
    type: Number,
  })
  @IsNumber()
  totalPrice: number;
}
