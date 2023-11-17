/*
  Warnings:

  - You are about to drop the column `subCoursesId` on the `StudentCourse` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "institute"."StudentCourse" DROP CONSTRAINT "StudentCourse_subCoursesId_fkey";

-- AlterTable
ALTER TABLE "institute"."StudentCourse" DROP COLUMN "subCoursesId";
