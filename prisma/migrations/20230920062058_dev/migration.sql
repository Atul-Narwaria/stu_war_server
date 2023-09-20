/*
  Warnings:

  - You are about to drop the column `fk_course_id` on the `batchMaster` table. All the data in the column will be lost.
  - Added the required column `fk_sub_course_id` to the `batchMaster` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "institute"."batchMaster" DROP CONSTRAINT "batchMaster_fk_course_id_fkey";

-- AlterTable
ALTER TABLE "institute"."batchMaster" DROP COLUMN "fk_course_id",
ADD COLUMN     "fk_sub_course_id" UUID NOT NULL;

-- AddForeignKey
ALTER TABLE "institute"."batchMaster" ADD CONSTRAINT "batchMaster_fk_sub_course_id_fkey" FOREIGN KEY ("fk_sub_course_id") REFERENCES "institute"."subCourses"("id") ON DELETE CASCADE ON UPDATE CASCADE;
