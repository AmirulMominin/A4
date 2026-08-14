/*
  Warnings:

  - You are about to alter the column `rent` on the `properties` table. The data in that column could be lost. The data in that column will be cast from `Decimal(65,30)` to `Decimal(10,2)`.
  - Added the required column `location` to the `properties` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "properties" ADD COLUMN     "location" TEXT NOT NULL,
ALTER COLUMN "rent" SET DATA TYPE DECIMAL(10,2);
