/*
  Warnings:

  - Added the required column `end_time` to the `batchMaster` table without a default value. This is not possible if the table is not empty.
  - Added the required column `start_time` to the `batchMaster` table without a default value. This is not possible if the table is not empty.
  - Added the required column `weekdays` to the `batchMaster` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "institute"."batchMaster" ADD COLUMN     "end_time" TEXT NOT NULL,
ADD COLUMN     "start_time" TEXT NOT NULL,
ADD COLUMN     "weekdays" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "institute"."courselinks" (
    "id" UUID NOT NULL,
    "fk_course_id" UUID NOT NULL,
    "fk_sub_course_id" UUID NOT NULL,
    "createAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "courselinks_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "institute"."courselinks" ADD CONSTRAINT "courselinks_fk_course_id_fkey" FOREIGN KEY ("fk_course_id") REFERENCES "institute"."courses"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "institute"."courselinks" ADD CONSTRAINT "courselinks_fk_sub_course_id_fkey" FOREIGN KEY ("fk_sub_course_id") REFERENCES "institute"."subCourses"("id") ON DELETE CASCADE ON UPDATE CASCADE;
