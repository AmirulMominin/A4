-- CreateEnum
CREATE TYPE "RentalStatus" AS ENUM ('PENDING', 'REJECTED', 'ACCEPTED', 'ACTIVE');

-- CreateTable
CREATE TABLE "Rental" (
    "id" TEXT NOT NULL,
    "tenantId" TEXT NOT NULL,
    "propertyId" TEXT NOT NULL,
    "rentalStatus" "RentalStatus" NOT NULL DEFAULT 'PENDING',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Rental_pkey" PRIMARY KEY ("id")
);
