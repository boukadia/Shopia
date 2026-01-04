import { Controller, Get, Body, Param, Put, Query } from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBearerAuth,
  ApiQuery,
} from '@nestjs/swagger';
import { InventoryService } from './inventory.service';
import { UpdateInventoryDto } from './dto/update-inventory.dto';

@ApiTags('Inventory')
@ApiBearerAuth()
@Controller('inventory')
export class InventoryController {
  constructor(private readonly inventoryService: InventoryService) {}

  @Get()
  @ApiOperation({
    summary: 'Get all inventories',
    description: 'Get list of all inventories',
  })
  @ApiResponse({
    status: 200,
    description: 'Inventories retrieved successfully',
  })
  findAll() {
    return this.inventoryService.findAll();
  }

  @Get('low-stock')
  @ApiOperation({
    summary: 'Get low stock items',
    description: 'Get items with quantity below threshold',
  })
  @ApiQuery({
    name: 'threshold',
    required: false,
    type: Number,
    description: 'Stock threshold (default: 10)',
  })
  @ApiResponse({ status: 200, description: 'Low stock items retrieved' })
  getLowStock(@Query('threshold') threshold?: string) {
    return this.inventoryService.getLowStock(threshold ? +threshold : 10);
  }

  @Get('product/:productId')
  @ApiOperation({
    summary: 'Get inventory by product ID',
    description: 'Get inventory for a specific product',
  })
  @ApiParam({ name: 'productId', description: 'Product ID', type: Number })
  @ApiResponse({ status: 200, description: 'Inventory found' })
  @ApiResponse({ status: 404, description: 'Inventory not found' })
  findByProductId(@Param('productId') productId: string) {
    return this.inventoryService.findByProductId(+productId);
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Get inventory by ID',
    description: 'Get a specific inventory by ID',
  })
  @ApiParam({ name: 'id', description: 'Inventory ID', type: Number })
  @ApiResponse({ status: 200, description: 'Inventory found' })
  @ApiResponse({ status: 404, description: 'Inventory not found' })
  findOne(@Param('id') id: string) {
    return this.inventoryService.findOne(+id);
  }

  @Put(':id')
  @ApiOperation({
    summary: 'Update inventory',
    description: 'Update inventory information',
  })
  @ApiParam({ name: 'id', description: 'Inventory ID', type: Number })
  @ApiResponse({ status: 200, description: 'Inventory updated successfully' })
  @ApiResponse({ status: 404, description: 'Inventory not found' })
  @ApiResponse({ status: 400, description: 'SKU already exists' })
  update(
    @Param('id') id: string,
    @Body() updateInventoryDto: UpdateInventoryDto,
  ) {
    return this.inventoryService.update(+id, updateInventoryDto);
  }

  @Put('product/:productId/quantity')
  @ApiOperation({
    summary: 'Update quantity by product ID',
    description: 'Set new quantity for a product inventory',
  })
  @ApiParam({ name: 'productId', description: 'Product ID', type: Number })
  @ApiResponse({ status: 200, description: 'Quantity updated successfully' })
  @ApiResponse({ status: 404, description: 'Inventory not found' })
  @ApiResponse({ status: 400, description: 'Invalid quantity' })
  updateQuantityByProductId(
    @Param('productId') productId: string,
    @Body('quantity') quantity: number,
  ) {
    return this.inventoryService.updateByProductId(+productId, quantity);
  }
}
