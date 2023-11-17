/*
  Warnings:

  - Added the required column `duration` to the `batchLiveClass` table without a default value. This is not possible if the table is not empty.
  - Added the required column `meeting_url` to the `batchLiveClass` table without a default value. This is not possible if the table is not empty.
  - Added the required column `password` to the `batchLiveClass` table without a default value. This is not possible if the table is not empty.
  - Added the required column `start_time` to the `batchLiveClass` table without a default value. This is not possible if the table is not empty.
  - Added the required column `topic` to the `batchLiveClass` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "institute"."batchLiveClass" ADD COLUMN     "duration" TEXT NOT NULL,
ADD COLUMN     "meeting_url" TEXT NOT NULL,
ADD COLUMN     "password" TEXT NOT NULL,
ADD COLUMN     "start_time" TEXT NOT NULL,
ADD COLUMN     "topic" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "institute"."batchMaster" ADD COLUMN     "haveLiveClass" BOOLEAN NOT NULL DEFAULT false;
