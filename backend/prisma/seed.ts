import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Starting seed...');

  // 1. Create Users
  const hashedPassword = await bcrypt.hash('password123', 10);
  
  const admin = await prisma.user.create({
    data: {
      email: 'admin@shopia.com',
      name: 'Admin User',
      password: hashedPassword,
      role: 'ADMIN',
    },
  });

  const client1 = await prisma.user.create({
    data: {
      email: 'client1@example.com',
      name: 'Mohamed Ali',
      password: hashedPassword,
      role: 'CLIENT',
    },
  });

  const client2 = await prisma.user.create({
    data: {
      email: 'client2@example.com',
      name: 'Fatima Zahra',
      password: hashedPassword,
      role: 'CLIENT',
    },
  });

  console.log('✅ Users created');

  // 2. Create Categories
  const electronics = await prisma.category.create({
    data: { nom: 'Electronics' },
  });

  const fashion = await prisma.category.create({
    data: { nom: 'Fashion' },
  });

  const books = await prisma.category.create({
    data: { nom: 'Books' },
  });

  console.log('✅ Categories created');

  // 3. Create Products
  const laptop = await prisma.produit.create({
    data: {
      nom: 'Laptop HP 15',
      description: 'HP Laptop 15-dw3000 Intel Core i5 8GB RAM 512GB SSD',
      prix: 5500,
      categoryId: electronics.id,
      isActive: true,
    },
  });

  const phone = await prisma.produit.create({
    data: {
      nom: 'Samsung Galaxy S23',
      description: 'Samsung Galaxy S23 5G 128GB',
      prix: 7500,
      categoryId: electronics.id,
      isActive: true,
    },
  });

  const shirt = await prisma.produit.create({
    data: {
      nom: 'T-Shirt Nike',
      description: 'Nike Sportswear Essential T-Shirt',
      prix: 250,
      categoryId: fashion.id,
      isActive: true,
    },
  });

  const jeans = await prisma.produit.create({
    data: {
      nom: 'Jeans Levis',
      description: 'Levis 501 Original Fit Jeans',
      prix: 450,
      categoryId: fashion.id,
      isActive: true,
    },
  });

  const book1 = await prisma.produit.create({
    data: {
      nom: 'Clean Code',
      description: 'A Handbook of Agile Software Craftsmanship by Robert C. Martin',
      prix: 350,
      categoryId: books.id,
      isActive: true,
    },
  });

  const book2 = await prisma.produit.create({
    data: {
      nom: 'The Pragmatic Programmer',
      description: 'Your Journey To Mastery by David Thomas',
      prix: 400,
      categoryId: books.id,
      isActive: true,
    },
  });

  console.log('✅ Products created');

  // 4. Create Inventory for each product
  await prisma.inventory.create({
    data: {
      productId: laptop.id,
      sku: 'LAP-HP-001',
      quantity: 15,
      reserved: 0,
    },
  });

  await prisma.inventory.create({
    data: {
      productId: phone.id,
      sku: 'PHN-SAM-001',
      quantity: 25,
      reserved: 0,
    },
  });

  await prisma.inventory.create({
    data: {
      productId: shirt.id,
      sku: 'TSH-NIK-001',
      quantity: 50,
      reserved: 0,
    },
  });

  await prisma.inventory.create({
    data: {
      productId: jeans.id,
      sku: 'JNS-LEV-001',
      quantity: 30,
      reserved: 0,
    },
  });

  await prisma.inventory.create({
    data: {
      productId: book1.id,
      sku: 'BOK-CLN-001',
      quantity: 20,
      reserved: 0,
    },
  });

  await prisma.inventory.create({
    data: {
      productId: book2.id,
      sku: 'BOK-PRA-001',
      quantity: 18,
      reserved: 0,
    },
  });

  console.log('✅ Inventory created');

  // 5. Create some orders
  const order1 = await prisma.commande.create({
    data: {
      userId: client1.id,
      status: 'PROCESSING',
      totalPrice: 6000,
      produits: {
        create: [
          {
            produitId: laptop.id,
            quantity: 1,
            price: 5500,
          },
          {
            produitId: shirt.id,
            quantity: 2,
            price: 500,
          },
        ],
      },
    },
  });

  // Update inventory for order1
  await prisma.inventory.update({
    where: { productId: laptop.id },
    data: { quantity: { decrement: 1 } },
  });
  await prisma.inventory.update({
    where: { productId: shirt.id },
    data: { quantity: { decrement: 2 } },
  });

  const order2 = await prisma.commande.create({
    data: {
      userId: client2.id,
      status: 'PENDING',
      totalPrice: 8350,
      produits: {
        create: [
          {
            produitId: phone.id,
            quantity: 1,
            price: 7500,
          },
          {
            produitId: book1.id,
            quantity: 1,
            price: 350,
          },
          {
            produitId: book2.id,
            quantity: 1,
            price: 400,
          },
          {
            produitId: jeans.id,
            quantity: 1,
            price: 450,
          },
        ],
      },
    },
  });

  // Update inventory for order2
  await prisma.inventory.update({
    where: { productId: phone.id },
    data: { quantity: { decrement: 1 } },
  });
  await prisma.inventory.update({
    where: { productId: book1.id },
    data: { quantity: { decrement: 1 } },
  });
  await prisma.inventory.update({
    where: { productId: book2.id },
    data: { quantity: { decrement: 1 } },
  });
  await prisma.inventory.update({
    where: { productId: jeans.id },
    data: { quantity: { decrement: 1 } },
  });

  console.log('✅ Orders created');

  console.log('🎉 Seed completed successfully!');
  console.log('\n📊 Summary:');
  console.log('  👥 Users: 3 (1 admin, 2 clients)');
  console.log('  📁 Categories: 3');
  console.log('  📦 Products: 6');
  console.log('  🏪 Inventory: 6 items');
  console.log('  🛒 Orders: 2');
  console.log('\n🔑 Login credentials:');
  console.log('  Admin: admin@shopia.com / password123');
  console.log('  Client 1: client1@example.com / password123');
  console.log('  Client 2: client2@example.com / password123');
}

main()
  .catch((e) => {
    console.error('❌ Seed failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
