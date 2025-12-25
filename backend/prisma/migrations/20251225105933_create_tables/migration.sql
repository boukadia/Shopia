-- CreateEnum
CREATE TYPE "Role" AS ENUM ('ADMIN', 'CLIENT');

-- CreateEnum
CREATE TYPE "CommandeStatus" AS ENUM ('PENDING', 'PROCESSING', 'SHIPPED', 'DELIVERED', 'CANCELLED');

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" "Role" NOT NULL DEFAULT 'CLIENT',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Produit" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "prix" INTEGER NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Produit_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Commande" (
    "id" SERIAL NOT NULL,
    "status" "CommandeStatus" NOT NULL DEFAULT 'PENDING',
    "totalPrice" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Commande_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Category" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Category_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Inventory" (
    "id" SERIAL NOT NULL,
    "sku" "CommandeStatus" NOT NULL DEFAULT 'PENDING',
    "quantity" INTEGER NOT NULL,
    "reserved" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Inventory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ComProd" (
    "id" SERIAL NOT NULL,
    "commandeId" INTEGER NOT NULL,
    "produitId" INTEGER NOT NULL,
    "quantity" INTEGER NOT NULL,
    "price" INTEGER NOT NULL,

    CONSTRAINT "ComProd_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- AddForeignKey
ALTER TABLE "ComProd" ADD CONSTRAINT "ComProd_commandeId_fkey" FOREIGN KEY ("commandeId") REFERENCES "Commande"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ComProd" ADD CONSTRAINT "ComProd_produitId_fkey" FOREIGN KEY ("produitId") REFERENCES "Produit"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
