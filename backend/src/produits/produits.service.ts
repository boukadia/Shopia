import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProduitDto } from './dto/create-produit.dto';
import { UpdateProduitDto } from './dto/update-produit.dto';
import { Produit } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ProduitsService {
  constructor(private prisma: PrismaService) {}
  async create(data: CreateProduitDto): Promise<Produit> {
    const produit = await this.prisma.produit.create({
      data: data,
    });
    return produit;
  }

  async findAll(): Promise<Produit[]> {
    const produits =await this.prisma.produit.findMany();
    return produits;
  }

  async findOne(id: number) {
    const produitExist = await this.prisma.produit.findUnique({
      where: { id: id }
    });
    if (!produitExist) {
      throw new NotFoundException('Produit not found');
    }
    return `This action returns a #${id} produit`;
  }

 async update(id: number, updateProduitDto: UpdateProduitDto) : Promise<Produit| null > {
    const produitExist = await this.prisma.produit.findUnique({ 
      where: { id :id}
    });

    if (!produitExist) {
      throw new NotFoundException('Produit not found');
    }

    const produit = await this.prisma.produit.update({
      where: { id: id },
      data:updateProduitDto
    });
    return produit;
  }

  async remove(id: number) : Promise<Produit | null > {
    const produitExist = await this.prisma.produit.findUnique({
      where: { id }
    });
    if (!produitExist) {
      throw new NotFoundException('Produit not found');
    }
    const produit = await this.prisma.produit.delete({
      where: { id: id }
    });
    return produit;
  }

  async findByCategoryId(categoryId: number): Promise<Produit[]> {
    const produits = await this.prisma.produit.findMany({
      where: { categoryId: categoryId },
    });
    return produits;
  }
  async findByPriceRange(minPrice: number, maxPrice: number): Promise<Produit[]> {
    const produits = await this.prisma.produit.findMany({
      where: {
        prix: {
          gte: minPrice,
          lte: maxPrice,
        },
      },
    });
    return produits;
  }

  async searchByName(nom: string): Promise<Produit[]> {
    const produits = await this.prisma.produit.findMany({
      where: {
        nom: {
          contains: nom,
          mode: 'insensitive',
        },
      },
    });
    return produits;
  }
}
