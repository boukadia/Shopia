import { Controller, Get, Post, Body, Patch, Param, Delete, Put } from '@nestjs/common';
import { ProduitsService } from './produits.service';
import { CreateProduitDto } from './dto/create-produit.dto';
import { UpdateProduitDto } from './dto/update-produit.dto';

@Controller('produits')
export class ProduitsController {
  constructor(private readonly produitsService: ProduitsService) {}

  @Post('/')
  create(@Body() createProduitDto: CreateProduitDto) {
    return this.produitsService.create(createProduitDto);
  }

  @Get('/')
  findAll() {
    return this.produitsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.produitsService.findOne(+id);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() updateProduitDto: UpdateProduitDto) {
    return this.produitsService.update(+id, updateProduitDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.produitsService.remove(+id);
  }
  @Get('by-name/:name')
  findByName(@Param('name') name: string) {
    return this.produitsService.searchByName(name);
  }
  @Get('by-category/:categoryId')
  findByCategory(@Param('categoryId') categoryId: number) {
    return this.produitsService.findByCategoryId(+categoryId);
  }
  @Get('by-price-range/:min/:max')
  findByPriceRange(@Param('min') min: number, @Param('max') max: number) {
    return this.produitsService.findByPriceRange(+min, +max);
  }
  @Put('update-stock/:id/:quantity')
  updateStock(@Param('id') id: number, @Param('quantity') quantity: number) {
    return this.produitsService.updateStock(+id, +quantity);
  }
}

