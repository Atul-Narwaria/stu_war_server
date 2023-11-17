/*
  Warnings:

  - A unique constraint covering the columns `[fk_course_id,fk_stundet_id]` on the table `StudentCourse` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "StudentCourse_fk_course_id_fk_stundet_id_key" ON "institute"."StudentCourse"("fk_course_id", "fk_stundet_id");
