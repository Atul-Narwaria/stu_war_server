/*
  Warnings:

  - Added the required column `name` to the `batchAssignments` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "institute"."batchAssignments" ADD COLUMN     "name" TEXT NOT NULL;
