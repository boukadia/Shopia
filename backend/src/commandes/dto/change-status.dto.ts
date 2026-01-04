import { IsEnum } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { OrderStatus } from '../../common/constants/order-status.enum';

export class ChangeStatusDto {
  @ApiProperty({
    description: 'Order status',
    enum: OrderStatus,
    example: OrderStatus.PROCESSING,
    enumName: 'OrderStatus'
  })
  @IsEnum(OrderStatus)
  status: OrderStatus;
}
