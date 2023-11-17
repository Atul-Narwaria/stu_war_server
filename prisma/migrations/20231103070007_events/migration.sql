-- CreateTable
CREATE TABLE "institute"."batchLiveClass" (
    "id" UUID NOT NULL,
    "fk_batch_id" UUID NOT NULL,
    "createAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "batchLiveClass_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."events" (
    "id" UUID NOT NULL,
    "name" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "isleave" BOOLEAN NOT NULL,
    "createAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "events_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "batchLiveClass_fk_batch_id_key" ON "institute"."batchLiveClass"("fk_batch_id");

-- AddForeignKey
ALTER TABLE "institute"."batchLiveClass" ADD CONSTRAINT "batchLiveClass_fk_batch_id_fkey" FOREIGN KEY ("fk_batch_id") REFERENCES "institute"."batchMaster"("id") ON DELETE CASCADE ON UPDATE CASCADE;
