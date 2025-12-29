import { PartialType } from '@nestjs/mapped-types';
import { CreateProduitDto } from './create-produit.dto';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateProduitDto  {
    @IsString()
    @IsOptional()
    nom: string;
    @IsString()
    @IsOptional()
    description: string;
    @IsNumber()
    @IsOptional()
    prix: number;
}
