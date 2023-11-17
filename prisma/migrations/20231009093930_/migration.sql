/*
  Warnings:

  - A unique constraint covering the columns `[fk_stundet_id,category,fk_course_id,fk_sub_course_id]` on the table `StudentCourse` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "institute"."StudentCourse_fk_stundet_id_category_key";

-- CreateIndex
CREATE UNIQUE INDEX "StudentCourse_fk_stundet_id_category_fk_course_id_fk_sub_co_key" ON "institute"."StudentCourse"("fk_stundet_id", "category", "fk_course_id", "fk_sub_course_id");
