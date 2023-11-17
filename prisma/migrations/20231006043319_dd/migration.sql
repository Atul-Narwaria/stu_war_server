-- AddForeignKey
ALTER TABLE "institute"."StudentCourse" ADD CONSTRAINT "studentcourse_fk" FOREIGN KEY ("fk_course_id") REFERENCES "institute"."subCourses"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
