/*
  Warnings:

  - You are about to drop the column `fk_sub_course_id` on the `StudentCourse` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "institute"."StudentCourse" DROP CONSTRAINT "StudentCourse_fk_sub_course_id_fkey";

-- AlterTable
ALTER TABLE "institute"."StudentCourse" DROP COLUMN "fk_sub_course_id",
ADD COLUMN     "subCoursesId" UUID;

-- AddForeignKey
ALTER TABLE "institute"."StudentCourse" ADD CONSTRAINT "StudentCourse_subCoursesId_fkey" FOREIGN KEY ("subCoursesId") REFERENCES "institute"."subCourses"("id") ON DELETE SET NULL ON UPDATE CASCADE;
