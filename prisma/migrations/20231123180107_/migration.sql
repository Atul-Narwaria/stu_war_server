-- AlterTable
ALTER TABLE "institute"."batchAssignments" ADD COLUMN     "media" TEXT,
ALTER COLUMN "contents" DROP NOT NULL;

-- AlterTable
ALTER TABLE "institute"."batchStudentsAssignment" ADD COLUMN     "media" TEXT,
ALTER COLUMN "contents" DROP NOT NULL;
