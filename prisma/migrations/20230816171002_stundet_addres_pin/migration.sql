/*
  Warnings:

  - Added the required column `pin` to the `studentAddress` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "students"."studentAddress" ADD COLUMN     "pin" TEXT NOT NULL;
