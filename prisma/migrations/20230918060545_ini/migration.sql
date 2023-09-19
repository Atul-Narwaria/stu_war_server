/*
  Warnings:

  - Added the required column `fk_institute_id` to the `subCourses` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "institute"."subCourses" ADD COLUMN     "fk_institute_id" UUID NOT NULL;

-- AddForeignKey
ALTER TABLE "institute"."subCourses" ADD CONSTRAINT "subCourses_fk_institute_id_fkey" FOREIGN KEY ("fk_institute_id") REFERENCES "institute"."instituteMaster"("id") ON DELETE CASCADE ON UPDATE CASCADE;
