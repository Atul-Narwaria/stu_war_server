-- DropForeignKey
ALTER TABLE "institute"."batchMaster" DROP CONSTRAINT "batchMaster_fk_institute_id_fkey";

-- DropForeignKey
ALTER TABLE "institute"."batchStudent" DROP CONSTRAINT "batchStudent_fk_institute_id_fkey";

-- DropForeignKey
ALTER TABLE "institute"."batchStudent" DROP CONSTRAINT "batchStudent_fk_student_id_fkey";

-- DropForeignKey
ALTER TABLE "institute"."instituteAddress" DROP CONSTRAINT "instituteAddress_fk_institute_id_fkey";

-- DropForeignKey
ALTER TABLE "institute"."instituteAddress" DROP CONSTRAINT "instituteAddress_fkcityId_fkey";

-- DropForeignKey
ALTER TABLE "institute"."instituteAddress" DROP CONSTRAINT "instituteAddress_fkcountryId_fkey";

-- DropForeignKey
ALTER TABLE "institute"."instituteAddress" DROP CONSTRAINT "instituteAddress_fkstateId_fkey";

-- DropForeignKey
ALTER TABLE "institute"."instituteLogin" DROP CONSTRAINT "instituteLogin_fk_institute_id_fkey";

-- DropForeignKey
ALTER TABLE "locations"."city" DROP CONSTRAINT "city_fkCountryId_fkey";

-- DropForeignKey
ALTER TABLE "locations"."city" DROP CONSTRAINT "city_fkstateId_fkey";

-- DropForeignKey
ALTER TABLE "locations"."state" DROP CONSTRAINT "state_fkCountryId_fkey";

-- DropForeignKey
ALTER TABLE "students"."studentAddress" DROP CONSTRAINT "studentAddress_fkStudentId_fkey";

-- DropForeignKey
ALTER TABLE "students"."studentAddress" DROP CONSTRAINT "studentAddress_fkcityId_fkey";

-- DropForeignKey
ALTER TABLE "students"."studentAddress" DROP CONSTRAINT "studentAddress_fkcountryId_fkey";

-- DropForeignKey
ALTER TABLE "students"."studentAddress" DROP CONSTRAINT "studentAddress_fkstateId_fkey";

-- DropForeignKey
ALTER TABLE "students"."studentDocuments" DROP CONSTRAINT "studentDocuments_fkStudentId_fkey";

-- DropForeignKey
ALTER TABLE "students"."studentMaster" DROP CONSTRAINT "studentMaster_fk_institute_id_fkey";

-- DropForeignKey
ALTER TABLE "teacher"."teacherAddress" DROP CONSTRAINT "teacherAddress_fkTeacherId_fkey";

-- DropForeignKey
ALTER TABLE "teacher"."teacherAddress" DROP CONSTRAINT "teacherAddress_fkcityId_fkey";

-- DropForeignKey
ALTER TABLE "teacher"."teacherAddress" DROP CONSTRAINT "teacherAddress_fkcountryId_fkey";

-- DropForeignKey
ALTER TABLE "teacher"."teacherAddress" DROP CONSTRAINT "teacherAddress_fkstateId_fkey";

-- DropForeignKey
ALTER TABLE "teacher"."teacherDocuments" DROP CONSTRAINT "teacherDocuments_fkTeacherId_fkey";

-- DropForeignKey
ALTER TABLE "teacher"."teacherExprience" DROP CONSTRAINT "teacherExprience_fkTeacherId_fkey";

-- AddForeignKey
ALTER TABLE "locations"."state" ADD CONSTRAINT "state_fkCountryId_fkey" FOREIGN KEY ("fkCountryId") REFERENCES "locations"."country"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "locations"."city" ADD CONSTRAINT "city_fkCountryId_fkey" FOREIGN KEY ("fkCountryId") REFERENCES "locations"."country"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "locations"."city" ADD CONSTRAINT "city_fkstateId_fkey" FOREIGN KEY ("fkstateId") REFERENCES "locations"."state"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "students"."studentMaster" ADD CONSTRAINT "studentMaster_fk_institute_id_fkey" FOREIGN KEY ("fk_institute_id") REFERENCES "institute"."instituteMaster"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "students"."studentDocuments" ADD CONSTRAINT "studentDocuments_fkStudentId_fkey" FOREIGN KEY ("fkStudentId") REFERENCES "students"."studentMaster"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "students"."studentAddress" ADD CONSTRAINT "studentAddress_fkStudentId_fkey" FOREIGN KEY ("fkStudentId") REFERENCES "students"."studentMaster"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "students"."studentAddress" ADD CONSTRAINT "studentAddress_fkcountryId_fkey" FOREIGN KEY ("fkcountryId") REFERENCES "locations"."country"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "students"."studentAddress" ADD CONSTRAINT "studentAddress_fkstateId_fkey" FOREIGN KEY ("fkstateId") REFERENCES "locations"."state"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "students"."studentAddress" ADD CONSTRAINT "studentAddress_fkcityId_fkey" FOREIGN KEY ("fkcityId") REFERENCES "locations"."city"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "teacher"."teacherExprience" ADD CONSTRAINT "teacherExprience_fkTeacherId_fkey" FOREIGN KEY ("fkTeacherId") REFERENCES "teacher"."teacherMaster"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "teacher"."teacherDocuments" ADD CONSTRAINT "teacherDocuments_fkTeacherId_fkey" FOREIGN KEY ("fkTeacherId") REFERENCES "teacher"."teacherMaster"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "teacher"."teacherAddress" ADD CONSTRAINT "teacherAddress_fkTeacherId_fkey" FOREIGN KEY ("fkTeacherId") REFERENCES "teacher"."teacherMaster"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "teacher"."teacherAddress" ADD CONSTRAINT "teacherAddress_fkcountryId_fkey" FOREIGN KEY ("fkcountryId") REFERENCES "locations"."country"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "teacher"."teacherAddress" ADD CONSTRAINT "teacherAddress_fkstateId_fkey" FOREIGN KEY ("fkstateId") REFERENCES "locations"."state"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "teacher"."teacherAddress" ADD CONSTRAINT "teacherAddress_fkcityId_fkey" FOREIGN KEY ("fkcityId") REFERENCES "locations"."city"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "institute"."instituteAddress" ADD CONSTRAINT "instituteAddress_fk_institute_id_fkey" FOREIGN KEY ("fk_institute_id") REFERENCES "institute"."instituteMaster"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "institute"."instituteAddress" ADD CONSTRAINT "instituteAddress_fkcountryId_fkey" FOREIGN KEY ("fkcountryId") REFERENCES "locations"."country"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "institute"."instituteAddress" ADD CONSTRAINT "instituteAddress_fkstateId_fkey" FOREIGN KEY ("fkstateId") REFERENCES "locations"."state"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "institute"."instituteAddress" ADD CONSTRAINT "instituteAddress_fkcityId_fkey" FOREIGN KEY ("fkcityId") REFERENCES "locations"."city"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "institute"."instituteLogin" ADD CONSTRAINT "instituteLogin_fk_institute_id_fkey" FOREIGN KEY ("fk_institute_id") REFERENCES "institute"."instituteMaster"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "institute"."batchMaster" ADD CONSTRAINT "batchMaster_fk_institute_id_fkey" FOREIGN KEY ("fk_institute_id") REFERENCES "institute"."instituteMaster"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "institute"."batchStudent" ADD CONSTRAINT "batchStudent_fk_institute_id_fkey" FOREIGN KEY ("fk_institute_id") REFERENCES "institute"."instituteMaster"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "institute"."batchStudent" ADD CONSTRAINT "batchStudent_fk_student_id_fkey" FOREIGN KEY ("fk_student_id") REFERENCES "students"."studentMaster"("id") ON DELETE CASCADE ON UPDATE CASCADE;
