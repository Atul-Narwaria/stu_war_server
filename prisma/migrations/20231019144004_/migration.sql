-- CreateTable
CREATE TABLE "institute"."batchTeacherLink" (
    "id" UUID NOT NULL,
    "fk_teacher_id" UUID NOT NULL,
    "fk_batch_id" UUID NOT NULL,
    "createAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "batchTeacherLink_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "batchTeacherLink_fk_batch_id_fk_teacher_id_key" ON "institute"."batchTeacherLink"("fk_batch_id", "fk_teacher_id");

-- AddForeignKey
ALTER TABLE "institute"."batchTeacherLink" ADD CONSTRAINT "batchTeacherLink_fk_teacher_id_fkey" FOREIGN KEY ("fk_teacher_id") REFERENCES "teacher"."teacherMaster"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "institute"."batchTeacherLink" ADD CONSTRAINT "batchTeacherLink_fk_batch_id_fkey" FOREIGN KEY ("fk_batch_id") REFERENCES "institute"."batchMaster"("id") ON DELETE CASCADE ON UPDATE CASCADE;
