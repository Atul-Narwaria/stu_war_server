/*
  Warnings:

  - Added the required column `data` to the `events` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."events" ADD COLUMN     "data" DATE NOT NULL;
