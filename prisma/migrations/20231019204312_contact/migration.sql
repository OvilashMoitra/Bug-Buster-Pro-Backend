-- CreateEnum
CREATE TYPE "ContactStatus" AS ENUM ('PENDING', 'COMPLETED');

-- AlterTable
ALTER TABLE "Contact" ADD COLUMN     "contactStatus" "ContactStatus" NOT NULL DEFAULT 'PENDING';
