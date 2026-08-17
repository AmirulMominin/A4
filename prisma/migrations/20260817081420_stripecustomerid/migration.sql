/*
  Warnings:

  - You are about to drop the column `stripeCustomerId` on the `Payment` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "Payment_stripeCustomerId_key";

-- AlterTable
ALTER TABLE "Payment" DROP COLUMN "stripeCustomerId";
