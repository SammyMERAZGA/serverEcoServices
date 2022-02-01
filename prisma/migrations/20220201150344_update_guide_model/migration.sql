/*
  Warnings:

  - You are about to drop the column `frist_name` on the `quotation` table. All the data in the column will be lost.
  - Made the column `type` on table `user` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "order" DROP CONSTRAINT "order_product_id_fkey";

-- DropForeignKey
ALTER TABLE "order" DROP CONSTRAINT "order_user_id_fkey";

-- DropForeignKey
ALTER TABLE "product" DROP CONSTRAINT "product_category_id_fkey";

-- AlterTable
ALTER TABLE "order" ALTER COLUMN "user_id" DROP NOT NULL,
ALTER COLUMN "product_id" DROP NOT NULL;

-- AlterTable
ALTER TABLE "product" ALTER COLUMN "category_id" DROP NOT NULL;

-- AlterTable
ALTER TABLE "quotation" DROP COLUMN "frist_name",
ADD COLUMN     "first_name" TEXT,
ALTER COLUMN "last_name" DROP NOT NULL;

-- AlterTable
ALTER TABLE "user" ALTER COLUMN "type" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "product" ADD CONSTRAINT "product_category_id_fkey" FOREIGN KEY ("category_id") REFERENCES "category"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "order" ADD CONSTRAINT "order_product_id_fkey" FOREIGN KEY ("product_id") REFERENCES "product"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "order" ADD CONSTRAINT "order_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "user"("id") ON DELETE SET NULL ON UPDATE CASCADE;
