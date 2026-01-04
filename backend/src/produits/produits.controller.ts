import { Controller, Get, Post, Body, Patch, Param, Delete, Put } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBearerAuth } from '@nestjs/swagger';
import { ProduitsService } from './produits.service';
import { CreateProduitDto } from './dto/create-produit.dto';
import { UpdateProduitDto } from './dto/update-produit.dto';

@ApiTags('Produits')
@ApiBearerAuth()
@Controller('produits')
export class ProduitsController {
  constructor(private readonly produitsService: ProduitsService) {}

  @Post('/')
  @ApiOperation({ summary: 'Create product', description: 'Create a new product' })
  @ApiResponse({ status: 201, description: 'Product created successfully' })
  @ApiResponse({ status: 400, description: 'Invalid data' })
  create(@Body() createProduitDto: CreateProduitDto) {
    return this.produitsService.create(createProduitDto);
  }

  @Get('/')
  @ApiOperation({ summary: 'Get all products', description: 'Get list of all products' })
  @ApiResponse({ status: 200, description: 'Products retrieved successfully' })
  findAll() {
    return this.produitsService.findAll();
  }

  @Get('/active')
  @ApiOperation({ summary: 'Get active products', description: 'Get list of all active products' })
  @ApiResponse({ status: 200, description: 'Active products retrieved successfully' })
  findAllActive() {
    return this.produitsService.findAllActive();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get product by ID', description: 'Get a specific product by ID' })
  @ApiParam({ name: 'id', description: 'Product ID', type: Number })
  @ApiResponse({ status: 200, description: 'Product found' })
  @ApiResponse({ status: 404, description: 'Product not found' })
  findOne(@Param('id') id: number) {
    return this.produitsService.findOne(+id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update product', description: 'Update product information' })
  @ApiParam({ name: 'id', description: 'Product ID', type: Number })
  @ApiResponse({ status: 200, description: 'Product updated successfully' })
  @ApiResponse({ status: 404, description: 'Product not found' })
  update(@Param('id') id: number, @Body() updateProduitDto: UpdateProduitDto) {
    return this.produitsService.update(+id, updateProduitDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete product', description: 'Delete a product by ID' })
  @ApiParam({ name: 'id', description: 'Product ID', type: Number })
  @ApiResponse({ status: 200, description: 'Product deleted successfully' })
  @ApiResponse({ status: 404, description: 'Product not found' })
  remove(@Param('id') id: number) {
    return this.produitsService.remove(+id);
  }

  @Get('by-name/:name')
  @ApiOperation({ summary: 'Search products by name', description: 'Search products by name' })
  @ApiParam({ name: 'name', description: 'Product name', type: String })
  @ApiResponse({ status: 200, description: 'Products found' })
  findByName(@Param('name') name: string) {
    return this.produitsService.searchByName(name);
  }

  @Get('by-category/:categoryId')
  @ApiOperation({ summary: 'Get products by category', description: 'Get all products in a specific category' })
  @ApiParam({ name: 'categoryId', description: 'Category ID', type: Number })
  @ApiResponse({ status: 200, description: 'Products found' })
  findByCategory(@Param('categoryId') categoryId: number) {
    return this.produitsService.findByCategoryId(+categoryId);
  }

  @Get('by-price-range/:min/:max')
  @ApiOperation({ summary: 'Get products by price range', description: 'Get products within a price range' })
  @ApiParam({ name: 'min', description: 'Minimum price', type: Number })
  @ApiParam({ name: 'max', description: 'Maximum price', type: Number })
  @ApiResponse({ status: 200, description: 'Products found' })
  findByPriceRange(@Param('min') min: number, @Param('max') max: number) {
    return this.produitsService.findByPriceRange(+min, +max);
  }

  @Put('status/:id/')
  @ApiOperation({ summary: 'Toggle product status', description: 'Toggle product active/inactive status' })
  @ApiParam({ name: 'id', description: 'Product ID', type: Number })
  @ApiResponse({ status: 200, description: 'Status updated successfully' })
  @ApiResponse({ status: 404, description: 'Product not found' })
  updateStatus(@Param('id') id: number){
    return this.produitsService.toggleStatus(+id);
  }

}

