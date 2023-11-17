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
exports.CourseLinkRoutes = void 0;
const express_1 = require("express");
const authMiddleware_1 = require("../../middleware/authMiddleware");
const requestValidation_1 = require("../../middleware/requestValidation");
const courseLink_1 = require("../../model/course/courseLink");
const studentCourse_1 = require("../../model/student/studentCourse");
exports.CourseLinkRoutes = (0, express_1.Router)();
exports.CourseLinkRoutes.post('/create', [authMiddleware_1.validateToken, authMiddleware_1.isInstitute], (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const reqError = requestValidation_1.instituteCourselink.validate(req.body);
        if (reqError === null || reqError === void 0 ? void 0 : reqError.error) {
            return res.status(422).json({ status: "error", message: (_a = reqError.error) === null || _a === void 0 ? void 0 : _a.message });
        }
        let subCourse = req.body.subCourse;
        let data = [];
        if (subCourse.length > 0) {
            subCourse.map((e) => {
                data.push({
                    fk_course_id: req.body.fk_course_id,
                    fk_sub_course_id: e
                });
            });
        }
        else {
            return res.status(422).json({ status: "error", message: "sub course required" });
        }
        console.log(data);
        let { code, status, message } = yield (0, courseLink_1.createCourseLink)(data);
        return res.status(code).json({ status, message });
    }
    catch (e) {
        return res.status(500).json({ status: "error", message: e.message });
    }
}));
exports.CourseLinkRoutes.delete('/delete/:id', [authMiddleware_1.validateToken, authMiddleware_1.isInstitute], (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let { code, status, message } = yield (0, courseLink_1.deleteCourseLink)(req.params.id);
        return res.status(code).json({ status, message });
    }
    catch (e) {
        return res.status(500).json({ status: "error", message: e.message });
    }
}));
exports.CourseLinkRoutes.post('/create/studentCourse', [authMiddleware_1.validateToken, authMiddleware_1.isInstitute], (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!req.body.fk_course_id || req.body.fk_course_id == "") {
            return res.status(422).json({ status: "error", message: "fk_course_id required" });
        }
        let stundetCourse = req.body.stundetList;
        console.log(req.body);
        let data = [];
        if (stundetCourse.length > 0) {
            stundetCourse.map((e) => {
                if (req.body.course_type === 1) {
                    data.push({
                        fk_course_id: req.body.fk_course_id,
                        fk_stundet_id: e,
                        category: req.body.course_type
                    });
                }
                if (req.body.course_type === 2) {
                    data.push({
                        fk_sub_course_id: req.body.fk_course_id,
                        fk_stundet_id: e,
                        category: req.body.course_type
                    });
                }
            });
        }
        else {
            return res.status(422).json({ status: "error", message: "stundetCourse required" });
        }
        // console.log()
        console.log(data);
        let { code, status, message } = yield (0, courseLink_1.createStudentCourse)(data);
        return res.status(code).json({ status: status, message: message });
    }
    catch (e) {
        return res.status(500).json({ status: "error", message: e.message });
    }
}));
exports.CourseLinkRoutes.get('/get/student/course/:id', [authMiddleware_1.validateToken, authMiddleware_1.isInstitute], (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!req.params.id) {
            return res.status(422).json({ status: "error", message: "course required" });
        }
        let { code, status, message } = yield (0, studentCourse_1.getCourseStudents)(req.params.id);
        return res.status(code).json({ status, message });
    }
    catch (e) {
        return res.status(500).json({ status: "error", message: e.message });
    }
}));
exports.CourseLinkRoutes.get('/get/student/sub-course/:id', [authMiddleware_1.validateToken, authMiddleware_1.isInstitute], (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!req.params.id) {
            return res.status(422).json({ status: "error", message: "course required" });
        }
        let { code, status, message } = yield (0, studentCourse_1.getSubCourseStudents)(req.params.id);
        return res.status(code).json({ status, message });
    }
    catch (e) {
        return res.status(500).json({ status: "error", message: e.message });
    }
}));
exports.CourseLinkRoutes.delete('/get/student/course/delete/:id', [authMiddleware_1.validateToken, authMiddleware_1.isInstitute], (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!req.params.id) {
            return res.status(422).json({ status: "error", message: "course required" });
        }
        let { code, status, message } = yield (0, studentCourse_1.deleteStudentCourse)(req.params.id);
        return res.status(code).json({ status, message });
    }
    catch (e) {
        return res.status(500).json({ status: "error", message: e.message });
    }
}));
exports.CourseLinkRoutes.get('/get/all-course/students', [authMiddleware_1.validateToken, authMiddleware_1.isInstitute], (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const page = req.query.page || 1;
        const insID = req.userid;
        let { code, status, message, totalPage, totalRow } = yield (0, studentCourse_1.getActiveStudentWithCourse)(page, insID);
        return res.status(code).json({ status, message, totalPage: totalPage, totalRow });
    }
    catch (e) {
        return res.status(500).json({ status: "error", message: e.message });
    }
}));
