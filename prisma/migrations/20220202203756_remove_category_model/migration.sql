/*
  Warnings:

  - You are about to drop the column `category_id` on the `product` table. All the data in the column will be lost.
  - You are about to drop the `category` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "product" DROP CONSTRAINT "product_category_id_fkey";

-- DropIndex
DROP INDEX "product_category_id_key";

-- AlterTable
ALTER TABLE "product" DROP COLUMN "category_id";

-- DropTable
DROP TABLE "category";
