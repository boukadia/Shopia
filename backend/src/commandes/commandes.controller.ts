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
import { CommandesService } from './commandes.service';
import { CreateCommandeDto } from './dto/create-commande.dto';
import { UpdateCommandeDto } from './dto/update-commande.dto';
import { ChangeStatusDto } from './dto/change-status.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CurrentUser } from '../auth/decorators/current-user.decorator';

@Controller('commandes')
@UseGuards(JwtAuthGuard)
export class CommandesController {
  constructor(private readonly commandesService: CommandesService) {}

  @Post()
  create(
    @Body() createCommandeDto: CreateCommandeDto,
    @CurrentUser() user: any,
  ) {
    return this.commandesService.create(createCommandeDto, user.userId);
  }

  @Get()
  findAll(@CurrentUser() user: any) {
    return this.commandesService.findAll(user.userId);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.commandesService.findOne(+id);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateCommandeDto: UpdateCommandeDto,
  ) {
    return this.commandesService.update(+id, updateCommandeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.commandesService.remove(+id);
  }
  @Put(':id/status')
  changeStatus(
    @Param('id') id: string,
    @Body() changeStatusDto: ChangeStatusDto,
  ) {
    return this.commandesService.changeStatus(+id, changeStatusDto.status);
  }
}
