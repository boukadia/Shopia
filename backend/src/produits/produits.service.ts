import { Injectable } from '@nestjs/common';
import { CreateProduitDto } from './dto/create-produit.dto';
import { UpdateProduitDto } from './dto/update-produit.dto';
import { Produit } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ProduitsService {
  constructor(private prisma: PrismaService) {}
  async create(data: CreateProduitDto): Promise<Produit> {
    const produit = await this.prisma.produit.create({
      data
    });
    return produit;
  }

  findAll() {
    return `This action returns all produits`;
  }

  findOne(id: number) {
    return `This action returns a #${id} produit`;
  }

  update(id: number, updateProduitDto: UpdateProduitDto) {
    return `This action updates a #${id} produit`;
  }

  remove(id: number) {
    return `This action removes a #${id} produit`;
  }
}
