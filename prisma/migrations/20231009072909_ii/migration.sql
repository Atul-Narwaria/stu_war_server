-- DropForeignKey
ALTER TABLE "institute"."StudentCourse" DROP CONSTRAINT "studentcourse_fk";

-- AddForeignKey
ALTER TABLE "institute"."StudentCourse" ADD CONSTRAINT "fk_course_id_map" FOREIGN KEY ("fk_course_id") REFERENCES "institute"."subCourses"("id") ON DELETE CASCADE ON UPDATE CASCADE;
