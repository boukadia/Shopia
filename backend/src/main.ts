import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  // Swagger Configuration
  const config = new DocumentBuilder()
    .setTitle('Shopia API')
    .setDescription('API documentation for Shopia e-commerce platform')
    .setVersion('1.0')
    .addBearerAuth()
    .addTag('Auth', 'Authentication endpoints')
    .addTag('Users', 'User management')
    .addTag('Produits', 'Product management')
    .addTag('Categories', 'Category management')
    .addTag('Commandes', 'Order management')
    .addTag('Inventory', 'Inventory management')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(process.env.PORT ?? 3000);
  console.log(
    ` Server running on http://localhost:${process.env.PORT ?? 3000}`,
  );
  console.log(
    ` Swagger docs available at http://localhost:${process.env.PORT ?? 3000}/api`,
  );
}
bootstrap();
