/*
  Warnings:

  - Added the required column `fk_institute_id` to the `instituteAddress` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "institute"."instituteMaster" ALTER COLUMN "profileImg" DROP NOT NULL;

-- AlterTable
ALTER TABLE "teacher"."instituteAddress" ADD COLUMN     "fk_institute_id" UUID NOT NULL;

-- AddForeignKey
ALTER TABLE "teacher"."instituteAddress" ADD CONSTRAINT "instituteAddress_fk_institute_id_fkey" FOREIGN KEY ("fk_institute_id") REFERENCES "institute"."instituteMaster"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "institute"."instituteLogin" ADD CONSTRAINT "instituteLogin_fk_institute_id_fkey" FOREIGN KEY ("fk_institute_id") REFERENCES "institute"."instituteMaster"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
