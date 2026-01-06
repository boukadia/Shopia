import { IsArray, IsNumber } from 'class-validator';

export class CreateCommandeDto {
  @IsArray()
  produits: {
    produitId: number;
    quantity: number;
  }[];

  @IsNumber()
  totalPrice: number;
}
