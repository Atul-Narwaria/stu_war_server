/*
  Warnings:

  - A unique constraint covering the columns `[fk_bacth_id,fk_student_id]` on the table `batchLink` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "batchLink_fk_bacth_id_fk_student_id_key" ON "institute"."batchLink"("fk_bacth_id", "fk_student_id");
