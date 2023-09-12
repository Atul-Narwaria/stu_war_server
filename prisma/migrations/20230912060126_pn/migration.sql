/*
  Warnings:

  - Added the required column `pin` to the `teacherAddress` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "teacher"."teacherAddress" ADD COLUMN     "pin" TEXT NOT NULL;
