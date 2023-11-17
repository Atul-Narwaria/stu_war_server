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
exports.InstitueTeacherRoutes = void 0;
const express_1 = require("express");
const authMiddleware_1 = require("../../middleware/authMiddleware");
const requestValidation_1 = require("../../middleware/requestValidation");
const teacherController_1 = require("../../controller/institute/teacherController");
const Teacher_1 = require("../../model/Teacher/Teacher");
const Teacher_controller_1 = require("../../controller/teacher/Teacher.controller");
exports.InstitueTeacherRoutes = (0, express_1.Router)();
exports.InstitueTeacherRoutes.post("/create", [authMiddleware_1.validateToken, authMiddleware_1.isInstitute], (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const reqError = requestValidation_1.instituteCreateStudentSchema.validate(req.body);
        if (reqError === null || reqError === void 0 ? void 0 : reqError.error) {
            return res
                .status(422)
                .json({ status: "error", message: (_a = reqError.error) === null || _a === void 0 ? void 0 : _a.message });
        }
        let instituteCode = req.userid;
        let { code, status, message } = yield (0, teacherController_1.institutecreateTeacher)(req.body, instituteCode);
        return res.status(code).json({ status, message });
    }
    catch (e) {
        return res.status(500).json({ status: "error", message: e.message });
    }
}));
exports.InstitueTeacherRoutes.post("/create/bulk", [authMiddleware_1.validateToken, authMiddleware_1.isInstitute], (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _b, _c;
    try {
        // const reqError = instituteCreateStudentSchema.validate(req.body);
        // if (reqError?.error) {
        //     return res.status(422).json({ status: "error", message: reqError.error?.message });
        // }
        let instituteCode = req.userid;
        let data = (_b = req.body) === null || _b === void 0 ? void 0 : _b.data;
        let { code, status, message } = yield (0, teacherController_1.createBulkTeacherController)((_c = req.body) === null || _c === void 0 ? void 0 : _c.data, instituteCode);
        return res.status(code).json({ status, message });
    }
    catch (e) {
        return res.status(500).json({ status: "error", message: e.message });
    }
}));
exports.InstitueTeacherRoutes.get("/get/all/active", [authMiddleware_1.validateToken, authMiddleware_1.isInstitute], (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const page = req.query.page || 1;
        const insID = req.userid;
        const { code, status, message } = yield (0, Teacher_1.getTeachersAllActive)(insID);
        return res.status(code).json({
            status: status,
            message: message,
        });
    }
    catch (e) {
        return res.status(500).json({ status: "error", message: e.message });
    }
}));
exports.InstitueTeacherRoutes.get("/get/all", [authMiddleware_1.validateToken, authMiddleware_1.isInstitute], (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const page = req.query.page || 1;
        const insID = req.userid;
        const { code, status, message, totalPage, totalRow } = yield (0, Teacher_1.getInstituteTeacher)(page, insID);
        return res.status(code).json({
            status: status,
            message: message,
            totalPage: totalPage,
            totalRow,
        });
    }
    catch (e) {
        return res.status(500).json({ status: "error", message: e.message });
    }
}));
exports.InstitueTeacherRoutes.get("/get/search", [authMiddleware_1.validateToken, authMiddleware_1.isInstitute], (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const page = req.query.page || 1;
        const insID = req.userid;
        const query = req.query.query || null;
        const { code, status, message, totalPage, totalRow } = yield (0, Teacher_1.InstituteteacherSeach)(page, query, insID);
        return res.status(code).json({
            status: status,
            message: message,
            totalPage: totalPage,
            totalRow: totalRow,
        });
    }
    catch (e) {
        return res.status(500).json({ status: "error", message: e.message });
    }
}));
exports.InstitueTeacherRoutes.put("/update/:id", [authMiddleware_1.validateToken, authMiddleware_1.isInstitute], (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _d;
    try {
        const reqError = requestValidation_1.InstituteUpdateStatusSchema.validate({
            id: req.params.id,
            status: req.body.status,
        });
        if (reqError === null || reqError === void 0 ? void 0 : reqError.error) {
            return res
                .status(422)
                .json({ status: "error", message: (_d = reqError.error) === null || _d === void 0 ? void 0 : _d.message });
        }
        const { code, status, message } = yield (0, Teacher_1.TeacherStatusUpdate)(req.params.id, req.body.status);
        return res.status(200).json({ status, message });
    }
    catch (e) {
        return res.status(500).json({ status: "error", message: e.message });
    }
}));
exports.InstitueTeacherRoutes.delete("/delete/:id", [authMiddleware_1.validateToken, authMiddleware_1.isInstitute], (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _e;
    try {
        const reqError = requestValidation_1.InstituteDeleteSchema.validate(req.params);
        if (reqError === null || reqError === void 0 ? void 0 : reqError.error) {
            return res
                .status(422)
                .json({ status: "error", message: (_e = reqError.error) === null || _e === void 0 ? void 0 : _e.message });
        }
        const { code, status, message } = yield (0, Teacher_1.teacherDelete)(req.params.id);
        return res.status(200).json({ status, message });
    }
    catch (e) {
        return res.status(500).json({ status: "error", message: e.message });
    }
}));
exports.InstitueTeacherRoutes.put("/edit/:id", [authMiddleware_1.validateToken, authMiddleware_1.isInstitute], (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _f;
    try {
        const reqError = requestValidation_1.instituteCreateStudentSchema.validate(req.body);
        if (reqError === null || reqError === void 0 ? void 0 : reqError.error) {
            return res
                .status(422)
                .json({ status: "error", message: (_f = reqError.error) === null || _f === void 0 ? void 0 : _f.message });
        }
        const { code, status, message } = yield (0, Teacher_1.editInstituteTeache)(req.params.id, req.body);
        return res.status(code).json({ status, message });
    }
    catch (e) {
        return res.status(500).json({ status: "error", message: e.message });
    }
}));
exports.InstitueTeacherRoutes.get("/get/student/:id", [authMiddleware_1.validateToken, authMiddleware_1.isInstitute], (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { code, status, message } = yield (0, Teacher_1.getTeacher)(req.params.id);
        return res.status(code).json({ status: status, message: message });
    }
    catch (e) {
        return res.status(500).json({ status: "error", message: e.message });
    }
}));
exports.InstitueTeacherRoutes.put("/reset/password/:id", [authMiddleware_1.validateToken, authMiddleware_1.isInstitute], (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!req.params.id) {
            return res
                .status(422)
                .json({ status: "error", message: "id required" });
        }
        const { code, status, message } = yield (0, Teacher_controller_1.resetPassword)(req.params.id);
        return res.status(code).json({ status: status, message: message });
    }
    catch (e) {
        return res.status(500).json({ status: "error", message: e.message });
    }
}));
