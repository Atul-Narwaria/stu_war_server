/*
  Warnings:

  - A unique constraint covering the columns `[fkTeacherId]` on the table `teacherAddress` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "teacherAddress_fkTeacherId_key" ON "teacher"."teacherAddress"("fkTeacherId");
