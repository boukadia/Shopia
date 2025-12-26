import { IsNumber, IsOptional, IsString } from "class-validator";

export class CreateProduitDto {
    @IsString()
    nom: string;
    @IsOptional()
    @IsString()
    description: string;
    @IsNumber()
    prix: number;
    @IsNumber()
    categoryId: number;

}
