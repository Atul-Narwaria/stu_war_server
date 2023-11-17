/*
  Warnings:

  - A unique constraint covering the columns `[fk_course_id,fk_sub_course_id]` on the table `courselinks` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "courselinks_fk_course_id_fk_sub_course_id_key" ON "institute"."courselinks"("fk_course_id", "fk_sub_course_id");
