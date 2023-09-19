/*
  Warnings:

  - You are about to drop the column `fk_course_id` on the `subCourses` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[name]` on the table `subCourses` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "institute"."subCourses" DROP CONSTRAINT "subCourses_fk_course_id_fkey";

-- DropIndex
DROP INDEX "institute"."subCourses_name_fk_course_id_key";

-- AlterTable
ALTER TABLE "institute"."subCourses" DROP COLUMN "fk_course_id";

-- CreateIndex
CREATE UNIQUE INDEX "subCourses_name_key" ON "institute"."subCourses"("name");
