-- CreateTable
CREATE TABLE "institute"."StudentCourse" (
    "id" UUID NOT NULL,
    "fk_course_id" UUID NOT NULL,
    "fk_sub_course_id" UUID,
    "fk_stundet_id" UUID NOT NULL,
    "createAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "StudentCourse_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "institute"."StudentCourse" ADD CONSTRAINT "StudentCourse_fk_course_id_fkey" FOREIGN KEY ("fk_course_id") REFERENCES "institute"."courses"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "institute"."StudentCourse" ADD CONSTRAINT "StudentCourse_fk_sub_course_id_fkey" FOREIGN KEY ("fk_sub_course_id") REFERENCES "institute"."subCourses"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "institute"."StudentCourse" ADD CONSTRAINT "StudentCourse_fk_stundet_id_fkey" FOREIGN KEY ("fk_stundet_id") REFERENCES "students"."studentMaster"("id") ON DELETE CASCADE ON UPDATE CASCADE;
