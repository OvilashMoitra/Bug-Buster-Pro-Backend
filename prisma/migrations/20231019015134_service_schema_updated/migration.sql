/*
  Warnings:

  - Added the required column `category` to the `Service` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "ServiceCatefory" AS ENUM ('INTRO', 'BASE', 'POPULAR', 'ENTERPRISE');

-- AlterTable
ALTER TABLE "Service" ADD COLUMN     "category" "ServiceCatefory" NOT NULL;
