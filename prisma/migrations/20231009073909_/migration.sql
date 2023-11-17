/*
  Warnings:

  - A unique constraint covering the columns `[fk_course_id,fk_stundet_id,category]` on the table `StudentCourse` will be added. If there are existing duplicate values, this will fail.

*/
-- DropForeignKey
ALTER TABLE "institute"."StudentCourse" DROP CONSTRAINT "StudentCourse_fk_course_id_fkey";

-- DropForeignKey
ALTER TABLE "institute"."StudentCourse" DROP CONSTRAINT "fk_course_id_map";

-- CreateIndex
CREATE UNIQUE INDEX "StudentCourse_fk_course_id_fk_stundet_id_category_key" ON "institute"."StudentCourse"("fk_course_id", "fk_stundet_id", "category");
