/*
  Warnings:

  - A unique constraint covering the columns `[code]` on the table `instituteMaster` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `code` to the `instituteMaster` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "institute"."instituteMaster" ADD COLUMN     "code" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "instituteMaster_code_key" ON "institute"."instituteMaster"("code");
