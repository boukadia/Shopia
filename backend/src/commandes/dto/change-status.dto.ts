import { IsEnum } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { CommandeStatus } from '@prisma/client';

export class ChangeStatusDto {
  @ApiProperty({
    description: 'Order status',
    enum: CommandeStatus,
    example: 'PROCESSING',
    enumName: 'CommandeStatus'
  })
  @IsEnum(CommandeStatus)
  status: CommandeStatus;
}
