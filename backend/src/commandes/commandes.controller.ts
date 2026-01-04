import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Put,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
  ApiParam,
  ApiBody,
} from '@nestjs/swagger';
import { CommandesService } from './commandes.service';
import { CreateCommandeDto } from './dto/create-commande.dto';
import { UpdateCommandeDto } from './dto/update-commande.dto';
import { ChangeStatusDto } from './dto/change-status.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CurrentUser } from '../auth/decorators/current-user.decorator';

@ApiTags('Commandes')
@ApiBearerAuth()
@Controller('commandes')
@UseGuards(JwtAuthGuard)
export class CommandesController {
  constructor(private readonly commandesService: CommandesService) {}

  @Post()
  @ApiOperation({
    summary: 'Create new order',
    description: 'Create a new order with products',
  })
  @ApiResponse({ status: 201, description: 'Order created successfully' })
  @ApiResponse({ status: 400, description: 'Bad request - Invalid data' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  create(
    @Body() createCommandeDto: CreateCommandeDto,
    @CurrentUser() user: any,
  ) {
    return this.commandesService.create(createCommandeDto, user.userId);
  }

  @Get()
  @ApiOperation({
    summary: 'Get my orders',
    description: 'Get all orders for current user',
  })
  @ApiResponse({ status: 200, description: 'Orders retrieved successfully' })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  findAllMy(@CurrentUser() user: any) {
    return this.commandesService.findAllMy(user.userId);
  }

  @Get('/all')
  @ApiOperation({
    summary: 'Get all orders (Admin)',
    description: 'Get all orders from all users',
  })
  @ApiResponse({
    status: 200,
    description: 'All orders retrieved successfully',
  })
  @ApiResponse({ status: 401, description: 'Unauthorized' })
  findAll() {
    return this.commandesService.findAll();
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Get order by ID',
    description: 'Get a specific order by its ID',
  })
  @ApiParam({ name: 'id', description: 'Order ID', type: Number })
  @ApiResponse({ status: 200, description: 'Order found' })
  @ApiResponse({ status: 404, description: 'Order not found' })
  findOne(@Param('id') id: string) {
    return this.commandesService.findOne(+id);
  }

  @Put(':id')
  @ApiOperation({
    summary: 'Update order',
    description: 'Update order products (add/update/remove)',
  })
  @ApiParam({ name: 'id', description: 'Order ID', type: Number })
  @ApiResponse({ status: 200, description: 'Order updated successfully' })
  @ApiResponse({ status: 404, description: 'Order or product not found' })
  @ApiResponse({ status: 400, description: 'Insufficient stock' })
  update(
    @Param('id') id: string,
    @Body() updateCommandeDto: UpdateCommandeDto,
  ) {
    return this.commandesService.update(+id, updateCommandeDto);
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Delete order',
    description: 'Delete an order and restore product stock',
  })
  @ApiParam({ name: 'id', description: 'Order ID', type: Number })
  @ApiResponse({ status: 200, description: 'Order deleted successfully' })
  @ApiResponse({ status: 404, description: 'Order not found' })
  remove(@Param('id') id: number) {
    return this.commandesService.remove(+id);
  }

  @Put(':id/status')
  @ApiOperation({
    summary: 'Change order status',
    description:
      'Update order status (PENDING, PROCESSING, SHIPPED, DELIVERED, CANCELLED)',
  })
  @ApiParam({ name: 'id', description: 'Order ID', type: Number })
  @ApiResponse({ status: 200, description: 'Status updated successfully' })
  @ApiResponse({ status: 404, description: 'Order not found' })
  @ApiResponse({ status: 400, description: 'Invalid status' })
  changeStatus(
    @Param('id') id: string,
    @Body() changeStatusDto: ChangeStatusDto,
  ) {
    return this.commandesService.changeStatus(+id, changeStatusDto.status);
  }
}
