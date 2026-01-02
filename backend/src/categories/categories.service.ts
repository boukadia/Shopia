import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Category } from '@prisma/client';

@Injectable()
export class CategoriesService {
  constructor(private prisma: PrismaService) {}
  async create(data: CreateCategoryDto): Promise<Category> {
    const category = await this.prisma.category.create({ data: data });
    return category;
  }

  async findAll(): Promise<Category[]> {
    const categories = await this.prisma.category.findMany();
    return categories;
  }

  async findOne(id: number): Promise<Category | null> {
    const category = await this.prisma.category.findUnique({
      where: { id: id },
    });
    if (!category) {
      throw new NotFoundException('Category not found');
    }
    return category;
  }

  async update(id: number, updateCategoryDto: UpdateCategoryDto) {
    const categoryExists = await this.prisma.category.findUnique({
      where: { id: id },
    });
    if (!categoryExists) {
      throw new NotFoundException('Category not found');
    }
    const category = await this.prisma.category.update({
      where: { id: id },
      data: {
        ...updateCategoryDto,
      },
    });
    return category;
  }

  async remove(id: number): Promise<Category> {
    const categoryExists = await this.prisma.category.findUnique({
      where: { id: id },
    });
    if (!categoryExists) {
      throw new NotFoundException('Category not found');
    }
    const category = await this.prisma.category.delete({ where: { id: id } });
    return category;
  }
}
