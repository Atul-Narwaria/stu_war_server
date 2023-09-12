/*
  Warnings:

  - A unique constraint covering the columns `[fkStudentId]` on the table `studentAddress` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "studentAddress_fkStudentId_key" ON "students"."studentAddress"("fkStudentId");
