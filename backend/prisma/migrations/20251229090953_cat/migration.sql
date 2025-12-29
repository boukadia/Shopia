/*
  Warnings:

  - You are about to drop the column `name` on the `Category` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `Produit` table. All the data in the column will be lost.
  - Added the required column `nom` to the `Category` table without a default value. This is not possible if the table is not empty.
  - Added the required column `categoryId` to the `Produit` table without a default value. This is not possible if the table is not empty.
  - Added the required column `nom` to the `Produit` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Category" DROP COLUMN "name",
ADD COLUMN     "nom" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Produit" DROP COLUMN "name",
ADD COLUMN     "categoryId" INTEGER NOT NULL,
ADD COLUMN     "nom" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Produit" ADD CONSTRAINT "Produit_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
