/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `courses` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name,fk_course_id]` on the table `subCourses` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "courses_name_key" ON "institute"."courses"("name");

-- CreateIndex
CREATE UNIQUE INDEX "subCourses_name_fk_course_id_key" ON "institute"."subCourses"("name", "fk_course_id");
