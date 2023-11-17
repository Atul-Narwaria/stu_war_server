/*
  Warnings:

  - A unique constraint covering the columns `[fk_stundet_id,category]` on the table `StudentCourse` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "institute"."StudentCourse_fk_course_id_fk_stundet_id_category_key";

-- AlterTable
ALTER TABLE "institute"."StudentCourse" ADD COLUMN     "fk_sub_course_id" UUID,
ALTER COLUMN "fk_course_id" DROP NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "StudentCourse_fk_stundet_id_category_key" ON "institute"."StudentCourse"("fk_stundet_id", "category");

-- AddForeignKey
ALTER TABLE "institute"."StudentCourse" ADD CONSTRAINT "StudentCourse_fk_course_id_fkey" FOREIGN KEY ("fk_course_id") REFERENCES "institute"."courses"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "institute"."StudentCourse" ADD CONSTRAINT "StudentCourse_fk_sub_course_id_fkey" FOREIGN KEY ("fk_sub_course_id") REFERENCES "institute"."subCourses"("id") ON DELETE CASCADE ON UPDATE CASCADE;
