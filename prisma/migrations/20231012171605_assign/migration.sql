/*
  Warnings:

  - Added the required column `fk_institute_id` to the `assignmentMaster` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "institute"."assignmentMaster" ADD COLUMN     "fk_institute_id" UUID NOT NULL;

-- AddForeignKey
ALTER TABLE "institute"."assignmentMaster" ADD CONSTRAINT "assignmentMaster_fk_institute_id_fkey" FOREIGN KEY ("fk_institute_id") REFERENCES "institute"."instituteMaster"("id") ON DELETE CASCADE ON UPDATE CASCADE;
