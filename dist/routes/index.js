"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.APIRoutes = void 0;
const express_1 = require("express");
const auth_routes_1 = require("./auth.routes");
const country_routes_1 = require("./location/country.routes");
const state_routes_1 = require("./location/state.routes");
const city_routes_1 = require("./location/city.routes");
const instituteContoller_1 = require("../controller/institute/instituteContoller");
const institute_routes_1 = require("./institute/institute.routes");
const student_routes_1 = require("./institute/student.routes");
const teacher_routes_1 = require("./institute/teacher.routes");
const course_routes_1 = require("./course/course.routes");
const subCourse_routes_1 = require("./course/subCourse.routes");
const batch_routes_1 = require("./batch/batch.routes");
const batchLink_routes_1 = require("./batch/batchLink.routes");
const courseLink_routes_1 = require("./course/courseLink.routes");
const assignment_routes_1 = require("./assignment/assignment.routes");
const assignmentType_routes_1 = require("./assignment/assignmentType.routes");
const zoom_routes_1 = require("./zoom.routes");
const teacher_routes_2 = require("./teacher/teacher.routes");
const batchTeacher_routes_1 = require("./batch/batchTeacher.routes");
const events_routes_1 = require("./public/events.routes");
exports.APIRoutes = (0, express_1.Router)();
exports.APIRoutes.get("/", (req, res) => {
    res.send("Inside API call");
});
exports.APIRoutes.use("/auth", auth_routes_1.AuthRoutes);
exports.APIRoutes.use("/location/country", country_routes_1.countryRoutes);
exports.APIRoutes.use("/location/state", state_routes_1.StateRoutes);
exports.APIRoutes.use("/location/city", city_routes_1.cityRoutes);
exports.APIRoutes.use("/institute", institute_routes_1.InstitueRoutes);
exports.APIRoutes.use("/institute/student", student_routes_1.InstitueStudentRoutes);
exports.APIRoutes.use("/institute/teacher", teacher_routes_1.InstitueTeacherRoutes);
exports.APIRoutes.use("/institute/course", course_routes_1.CourseRoutes);
exports.APIRoutes.use("/institute/sub-course", subCourse_routes_1.SubCourseRoutes);
exports.APIRoutes.use("/institute/batch", batch_routes_1.batchRoutes);
exports.APIRoutes.use("/institute/batch-link", batchLink_routes_1.batchLinkRoutes);
exports.APIRoutes.use("/institute/batch-teacher", batchTeacher_routes_1.batchTeacher);
exports.APIRoutes.use("/institute/course-link", courseLink_routes_1.CourseLinkRoutes);
exports.APIRoutes.use("/institute/assigment", assignment_routes_1.assignmentRoutes);
exports.APIRoutes.use("/institute/zoom", zoom_routes_1.ZoomInstitueRoutes);
exports.APIRoutes.use("/teacher", teacher_routes_2.teacherRoutes);
exports.APIRoutes.use("/events", events_routes_1.EventRoutes);
exports.APIRoutes.use("/admin/assigmentType", assignmentType_routes_1.assignmentTypeRoutes);
exports.APIRoutes.get("/test", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let d = yield (0, instituteContoller_1.test)();
    return res.status(200).json(d);
}));
