import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ProduitsModule } from './produits/produits.module';
import { CommandesModule } from './commandes/commandes.module';
import { InventoryModule } from './inventory/inventory.module';
import { AuthModule } from './auth/auth.module';
import { CategoriesModule } from './categories/categories.module';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [UsersModule, ProduitsModule, CommandesModule, InventoryModule, AuthModule, CategoriesModule,PrismaModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
