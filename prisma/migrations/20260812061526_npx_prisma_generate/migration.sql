-- CreateEnum
CREATE TYPE "PropertyStatus" AS ENUM ('RENTED', 'AVAILABLE');

-- CreateEnum
CREATE TYPE "Role" AS ENUM ('Tenant', 'Landlord', 'Admin');

-- CreateEnum
CREATE TYPE "UserStatus" AS ENUM ('ACTIVE', 'BANNED');

-- CreateTable
CREATE TABLE "Properties" (
    "id" TEXT NOT NULL,
    "details" TEXT NOT NULL,
    "rent" TEXT NOT NULL,
    "status" "PropertyStatus" NOT NULL DEFAULT 'AVAILABLE',
    "landlordId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Properties_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" "Role" NOT NULL,
    "status" "UserStatus" NOT NULL DEFAULT 'ACTIVE',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Properties_landlordId_key" ON "Properties"("landlordId");

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- AddForeignKey
ALTER TABLE "Properties" ADD CONSTRAINT "Properties_landlordId_fkey" FOREIGN KEY ("landlordId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
