/*
  Warnings:

  - Added the required column `end_date` to the `assignmentMaster` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "institute"."assignmentMaster" ADD COLUMN     "end_date" TEXT NOT NULL;
