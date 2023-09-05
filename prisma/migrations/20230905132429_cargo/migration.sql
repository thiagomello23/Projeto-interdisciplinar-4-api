-- CreateEnum
CREATE TYPE "Cargo" AS ENUM ('USUARIO', 'ADMINISTRADOR');

-- AlterTable
ALTER TABLE "usuario" ADD COLUMN     "cargo" "Cargo" NOT NULL DEFAULT 'USUARIO';
