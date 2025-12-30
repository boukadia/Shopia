import { Injectable } from '@nestjs/common';
import { CreateCommandeDto } from './dto/create-commande.dto';
import { UpdateCommandeDto } from './dto/update-commande.dto';
import { Commande } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class CommandesService {
  constructor(private prisma: PrismaService) {}
  async create(data: CreateCommandeDto, userId: number): Promise<Commande> {
    const { produits, ...commandeData } = data;
    const commande = await this.prisma.commande.create({
      data: {
        ...commandeData,
        userId: userId,
        produits: {
          create: produits.map((p) => ({
            produit: { connect: { id: p.produitId } },
            quantity: p.quantity,
            price: 0,
          })),
        },
      },
      include: {
        produits: {
          include: {
            produit: true,
          },
        },
      },
    });
    return commande;
  }

  async findAll(userId: number) {
    const commandes = await this.prisma.commande.findMany({
      where: { userId: userId },
      include: {
        produits: {
          include: {
            produit: true,
          },
        },
      },
    });
    return commandes;
  }

  findOne(id: number) {
    return `This action returns a #${id} commande`;
  }

  update(id: number, updateCommandeDto: UpdateCommandeDto) {
    return `This action updates a #${id} commande`;
  }

  remove(id: number) {
    return `This action removes a #${id} commande`;
  }
}
