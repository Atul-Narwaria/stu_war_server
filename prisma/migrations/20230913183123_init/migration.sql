/*
  Warnings:

  - You are about to drop the `batchStudent` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `fk_course_id` to the `batchMaster` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `batchMaster` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "institute"."batchStudent" DROP CONSTRAINT "batchStudent_fk_institute_id_fkey";

-- DropForeignKey
ALTER TABLE "institute"."batchStudent" DROP CONSTRAINT "batchStudent_fk_student_id_fkey";

-- AlterTable
ALTER TABLE "institute"."batchMaster" ADD COLUMN     "fk_course_id" UUID NOT NULL,
ADD COLUMN     "name" TEXT NOT NULL;

-- DropTable
DROP TABLE "institute"."batchStudent";

-- CreateTable
CREATE TABLE "institute"."batchLink" (
    "id" UUID NOT NULL,
    "fk_institute_id" UUID NOT NULL,
    "fk_student_id" UUID NOT NULL,
    "status" BOOLEAN NOT NULL DEFAULT true,
    "createAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "batchLink_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "institute"."courses" (
    "id" UUID NOT NULL,
    "fk_institute_id" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "amount" INTEGER NOT NULL,
    "image" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "durantion" INTEGER NOT NULL,
    "status" BOOLEAN NOT NULL DEFAULT true,
    "createAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "courses_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "institute"."subCourses" (
    "id" UUID NOT NULL,
    "fk_course_id" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "amount" INTEGER NOT NULL,
    "image" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "duration" INTEGER NOT NULL,
    "status" BOOLEAN NOT NULL DEFAULT true,
    "createAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "subCourses_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "institute"."batchMaster" ADD CONSTRAINT "batchMaster_fk_course_id_fkey" FOREIGN KEY ("fk_course_id") REFERENCES "institute"."courses"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "institute"."batchLink" ADD CONSTRAINT "batchLink_fk_institute_id_fkey" FOREIGN KEY ("fk_institute_id") REFERENCES "institute"."instituteMaster"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "institute"."batchLink" ADD CONSTRAINT "batchLink_fk_student_id_fkey" FOREIGN KEY ("fk_student_id") REFERENCES "students"."studentMaster"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "institute"."courses" ADD CONSTRAINT "courses_fk_institute_id_fkey" FOREIGN KEY ("fk_institute_id") REFERENCES "institute"."instituteMaster"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "institute"."subCourses" ADD CONSTRAINT "subCourses_fk_course_id_fkey" FOREIGN KEY ("fk_course_id") REFERENCES "institute"."courses"("id") ON DELETE CASCADE ON UPDATE CASCADE;
