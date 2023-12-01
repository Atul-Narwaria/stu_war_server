/*
  Warnings:

  - You are about to drop the column `fk_batch_id` on the `batchStudentsAssignment` table. All the data in the column will be lost.
  - You are about to drop the column `instituteMasterId` on the `batchStudentsAssignment` table. All the data in the column will be lost.
  - Added the required column `fk_batch_assignment_id` to the `batchStudentsAssignment` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "institute"."batchStudentsAssignment" DROP CONSTRAINT "batchStudentsAssignment_fk_batch_id_fkey";

-- DropForeignKey
ALTER TABLE "institute"."batchStudentsAssignment" DROP CONSTRAINT "batchStudentsAssignment_instituteMasterId_fkey";

-- AlterTable
ALTER TABLE "institute"."batchStudentsAssignment" DROP COLUMN "fk_batch_id",
DROP COLUMN "instituteMasterId",
ADD COLUMN     "fk_batch_assignment_id" UUID NOT NULL;

-- AddForeignKey
ALTER TABLE "institute"."batchStudentsAssignment" ADD CONSTRAINT "batchStudentsAssignment_fk_batch_assignment_id_fkey" FOREIGN KEY ("fk_batch_assignment_id") REFERENCES "institute"."batchAssignments"("id") ON DELETE CASCADE ON UPDATE CASCADE;
