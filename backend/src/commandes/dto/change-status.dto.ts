import { IsEnum } from 'class-validator';
import { OrderStatus } from '../../common/constants/order-status.enum';

export class ChangeStatusDto {
  @IsEnum(OrderStatus)
  status: OrderStatus;
}
