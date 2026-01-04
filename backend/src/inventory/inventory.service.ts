import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { UpdateInventoryDto } from './dto/update-inventory.dto';
import { PrismaService } from '../prisma/prisma.service';
import { Inventory } from '@prisma/client';

@Injectable()
export class InventoryService {
  constructor(private prisma: PrismaService) {}

  async findAll(): Promise<Inventory[]> {
    const inventories = await this.prisma.inventory.findMany({
      include: { product: true },
      orderBy: { createdAt: 'desc' },
    });
    return inventories;
  }

  async findOne(id: number): Promise<Inventory> {
    const inventory = await this.prisma.inventory.findUnique({
      where: { id },
      include: { product: true },
    });

    if (!inventory) {
      throw new NotFoundException(`Inventory #${id} not found`);
    }

    return inventory;
  }

  async findByProductId(productId: number): Promise<Inventory> {
    const inventory = await this.prisma.inventory.findUnique({
      where: { productId },
      include: { product: true },
    });

    if (!inventory) {
      throw new NotFoundException(
        `Inventory for product #${productId} not found`,
      );
    }

    return inventory;
  }

  async update(
    id: number,
    updateInventoryDto: UpdateInventoryDto,
  ): Promise<Inventory> {
    const inventory = await this.prisma.inventory.findUnique({
      where: { id },
    });

    if (!inventory) {
      throw new NotFoundException(`Inventory #${id} not found`);
    }

    // Check SKU uniqueness if being updated
    if (updateInventoryDto.sku && updateInventoryDto.sku !== inventory.sku) {
      const existingSku = await this.prisma.inventory.findUnique({
        where: { sku: updateInventoryDto.sku },
      });

      if (existingSku) {
        throw new BadRequestException(
          `SKU ${updateInventoryDto.sku} already exists`,
        );
      }
    }

    const updatedInventory = await this.prisma.inventory.update({
      where: { id },
      data: updateInventoryDto,
      include: { product: true },
    });

    return updatedInventory;
  }

  async updateByProductId(
    productId: number,
    quantity: number,
  ): Promise<Inventory> {
    const inventory = await this.prisma.inventory.findUnique({
      where: { productId },
    });

    if (!inventory) {
      throw new NotFoundException(
        `Inventory for product #${productId} not found`,
      );
    }

    if (quantity < 0) {
      throw new BadRequestException('Quantity cannot be negative');
    }

    const updatedInventory = await this.prisma.inventory.update({
      where: { productId },
      data: { quantity },
      include: { product: true },
    });

    return updatedInventory;
  }

  async getLowStock(threshold: number = 10): Promise<Inventory[]> {
    const lowStockItems = await this.prisma.inventory.findMany({
      where: {
        quantity: { lte: threshold },
      },
      include: { product: true },
      orderBy: { quantity: 'asc' },
    });

    return lowStockItems;
  }
}
