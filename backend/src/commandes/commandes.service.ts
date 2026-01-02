import { Injectable, NotFoundException } from '@nestjs/common';
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
    const commande = this.prisma.commande.findUnique({
      where: {
        id: id,
      },
      include: {
        produits: {
          include: {
            produit: true,
          },
        },
      },
    });
    if (!commande) {
      throw new NotFoundException('Commande not found');
    }
    return commande;
  }

  async update(id: number, updateCommandeDto: UpdateCommandeDto) {
    const commande = await this.prisma.commande.findUnique({
      where: { id },
      include: {
        produits: {
          include: {
            produit: true,
          },
        },
      },
    });

    if (!commande) {
      throw new NotFoundException(`Commande #${id} not found`);
    }

    // 2. Update Status
    if (updateCommandeDto.status) {
      await this.prisma.commande.update({
        where: { id },
        data: { status: updateCommandeDto.status },
      });
    }

    if (
      updateCommandeDto.addProduits &&
      updateCommandeDto.addProduits.length > 0
    ) {
      for (const prod of updateCommandeDto.addProduits) {
        const produit = await this.prisma.produit.findUnique({
          where: { id: prod.produitId },
        });

        if (!produit) {
          throw new NotFoundException(`Produit #${prod.produitId} not found`);
        }

        if (produit.stock < prod.quantity) {
          throw new NotFoundException(
            `Stock insuffisant pour produit #${prod.produitId}`,
          );
        }

        await this.prisma.comProd.create({
          data: {
            commandeId: id,
            produitId: prod.produitId,
            quantity: prod.quantity,
            price: produit.prix * prod.quantity,
          },
        });

        await this.prisma.produit.update({
          where: { id: prod.produitId },
          data: { stock: { decrement: prod.quantity } },
        });
      }
    }

    if (
      updateCommandeDto.updateProduits &&
      updateCommandeDto.updateProduits.length > 0
    ) {
      for (const prod of updateCommandeDto.updateProduits) {
        const existingComProd = await this.prisma.comProd.findFirst({
          where: {
            commandeId: id,
            produitId: prod.produitId,
          },
          include: { produit: true },
        });

        if (!existingComProd) {
          throw new NotFoundException(
            `Produit #${prod.produitId} not found in commande #${id}`,
          );
        }

        const oldQuantity = existingComProd.quantity;
        const newQuantity = prod.quantity;
        const difference = newQuantity - oldQuantity;

        if (difference > 0) {
          if (existingComProd.produit.stock < difference) {
            throw new NotFoundException(
              `Stock insuffisant pour produit #${prod.produitId}`,
            );
          }
          await this.prisma.produit.update({
            where: { id: prod.produitId },
            data: { stock: { decrement: difference } },
          });
        } else if (difference < 0) {
          await this.prisma.produit.update({
            where: { id: prod.produitId },
            data: { stock: { increment: Math.abs(difference) } },
          });
        }

        await this.prisma.comProd.update({
          where: { id: existingComProd.id },
          data: {
            quantity: newQuantity,
            price: existingComProd.produit.prix * newQuantity,
          },
        });
      }
    }

    if (
      updateCommandeDto.removeProduitIds &&
      updateCommandeDto.removeProduitIds.length > 0
    ) {
      for (const produitId of updateCommandeDto.removeProduitIds) {
        const comProd = await this.prisma.comProd.findFirst({
          where: {
            commandeId: id,
            produitId: produitId,
          },
          include: { produit: true },
        });

        if (comProd) {
          await this.prisma.produit.update({
            where: { id: produitId },
            data: { stock: { increment: comProd.quantity } },
          });

          await this.prisma.comProd.delete({
            where: { id: comProd.id },
          });
        }
      }
    }

    const allComProds = await this.prisma.comProd.findMany({
      where: { commandeId: id },
    });

    const newTotalPrice = allComProds.reduce((sum, cp) => sum + cp.price, 0);

    
    const updatedCommande = await this.prisma.commande.update({
      where: { id },
      data: { totalPrice: newTotalPrice },
      include: {
        produits: {
          include: {
            produit: true,
          },
        },
      },
    });

    return updatedCommande;
  }

  async remove(id: number): Promise<Commande> {
    const commande = await this.prisma.commande.findUnique({
      where: { id },
      include: {
        produits: {
          include: {
            produit: true,
          },
        },
      },
    });
    
    if (!commande) {
      throw new NotFoundException(`Commande #${id} not found`);
    }

    for (const comProd of commande.produits) {
      await this.prisma.produit.update({
        where: { id: comProd.produitId },
        data: { stock: { increment: comProd.quantity } },
      });
    }

    await this.prisma.comProd.deleteMany({
      where: { commandeId: id },
    });

    const deletedCommande = await this.prisma.commande.delete({
      where: { id },
    });

    return deletedCommande;
  }
  async changeStatus(id: number, status: any): Promise<Commande> {
    const commande = await this.prisma.commande.findUnique({
      where: { id },
    });

    if (!commande) {
      throw new NotFoundException(`Commande #${id} not found`);
    }

    const updatedCommande = await this.prisma.commande.update({
      where: { id },
      data: { status },
      include: {
        produits: {
          include: {
            produit: true,
          },
        },
      },
    });
    return updatedCommande;
  }
}
