/*
  Warnings:

  - Added the required column `category` to the `StudentCourse` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "institute"."StudentCourse" ADD COLUMN     "category" INTEGER NOT NULL;
