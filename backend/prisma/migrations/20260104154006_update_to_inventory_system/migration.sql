/*
  Warnings:

  - You are about to drop the column `stock` on the `Produit` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[productId]` on the table `Inventory` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[sku]` on the table `Inventory` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `productId` to the `Inventory` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `sku` on the `Inventory` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "Inventory" ADD COLUMN     "productId" INTEGER NOT NULL,
DROP COLUMN "sku",
ADD COLUMN     "sku" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Produit" DROP COLUMN "stock";

-- CreateIndex
CREATE UNIQUE INDEX "Inventory_productId_key" ON "Inventory"("productId");

-- CreateIndex
CREATE UNIQUE INDEX "Inventory_sku_key" ON "Inventory"("sku");

-- AddForeignKey
ALTER TABLE "Inventory" ADD CONSTRAINT "Inventory_productId_fkey" FOREIGN KEY ("productId") REFERENCES "Produit"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
