/*
  Warnings:

  - Added the required column `fk_institute_id` to the `teacherMaster` table without a default value. This is not possible if the table is not empty.
  - Added the required column `password` to the `teacherMaster` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "students"."studentMaster" ADD COLUMN     "password_reset" BOOLEAN NOT NULL DEFAULT false;

-- AlterTable
ALTER TABLE "teacher"."teacherMaster" ADD COLUMN     "fk_institute_id" UUID NOT NULL,
ADD COLUMN     "password" TEXT NOT NULL,
ADD COLUMN     "password_reset" BOOLEAN NOT NULL DEFAULT false,
ALTER COLUMN "joiningDate" SET DEFAULT CURRENT_TIMESTAMP;

-- AddForeignKey
ALTER TABLE "teacher"."teacherMaster" ADD CONSTRAINT "teacherMaster_fk_institute_id_fkey" FOREIGN KEY ("fk_institute_id") REFERENCES "institute"."instituteMaster"("id") ON DELETE CASCADE ON UPDATE CASCADE;
