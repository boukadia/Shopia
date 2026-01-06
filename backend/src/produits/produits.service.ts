import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { CreateProduitDto } from './dto/create-produit.dto';
import { UpdateProduitDto } from './dto/update-produit.dto';
import { Produit } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ProduitsService {
  constructor(private prisma: PrismaService) {}
  async create(data: CreateProduitDto): Promise<Produit> {
    // Check if category exists
    const categoryExists = await this.prisma.category.findUnique({
      where: { id: data.categoryId },
    });

    if (!categoryExists) {
      throw new BadRequestException(`Category #${data.categoryId} does not exist`);
    }

    // Check if SKU already exists
    const existingSku = await this.prisma.inventory.findUnique({
      where: { sku: data.sku },
    });

    if (existingSku) {
      throw new BadRequestException('SKU already exists');
    }

    // Create product
    const produit = await this.prisma.produit.create({
      data: {
        nom: data.nom,
        description: data.description,
        prix: data.prix,
        categoryId: data.categoryId,
      },
    });

    // Create inventory for the product
    await this.prisma.inventory.create({
      data: {
        productId: produit.id,
        sku: data.sku,
        quantity: data.quantity ?? 0,
        reserved: data.reserved ?? 0,
      },
    });

    return produit;
  }

  async findAll(): Promise<Produit[]> {
    const produits = await this.prisma.produit.findMany();
    return produits;
  }
  async findAllActive(): Promise<Produit[]> {
    const produits = await this.prisma.produit.findMany({
      where: { isActive: true },
    });
    return produits;
  }

  async findOne(id: number) {
    const produitExist = await this.prisma.produit.findUnique({
      where: { id: id },
    });
    if (!produitExist) {
      throw new NotFoundException('Produit not found');
    }
    const produit = await this.prisma.produit.findUnique({ where: { id: id } });

    return produit;
  }

  async update(
    id: number,
    updateProduitDto: UpdateProduitDto,
  ): Promise<Produit | null> {
    const produitExist = await this.prisma.produit.findUnique({
      where: { id: id },
    });

    if (!produitExist) {
      throw new NotFoundException('Produit not found');
    }

    const produit = await this.prisma.produit.update({
      where: { id: id },
      data: updateProduitDto,
    });
    return produit;
  }

  async remove(id: number): Promise<Produit | null> {
    const produitExist = await this.prisma.produit.findUnique({
      where: { id },
    });
    if (!produitExist) {
      throw new NotFoundException('Produit not found');
    }
    const produit = await this.prisma.produit.update({
      where: { id: id },
      data: { isActive: false },
    });
    return produit;
  }

  async findByCategoryId(categoryId: number): Promise<Produit[]> {
    const produits = await this.prisma.produit.findMany({
      where: { categoryId: categoryId },
    });
    return produits;
  }
  async findByPriceRange(
    minPrice: number,
    maxPrice: number,
  ): Promise<Produit[]> {
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
  async toggleStatus(id: number): Promise<Produit> {
    const produit = await this.prisma.produit.findUnique({ where: { id: id } });
    if (!produit) {
      throw new NotFoundException('Produit not found');
    }

    const updatedProduit = await this.prisma.produit.update({
      where: { id: id },
      data: { isActive: !produit.isActive },
    });

    return updatedProduit;
  }
}
