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
exports.InstitueStudentRoutes = void 0;
const express_1 = require("express");
const authMiddleware_1 = require("../../middleware/authMiddleware");
const requestValidation_1 = require("../../middleware/requestValidation");
const studentController_1 = require("../../controller/institute/studentController");
const student_1 = require("../../model/student/student");
exports.InstitueStudentRoutes = (0, express_1.Router)();
exports.InstitueStudentRoutes.post("/create", [authMiddleware_1.validateToken, authMiddleware_1.isInstitute], (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const reqError = requestValidation_1.instituteCreateStudentSchema.validate(req.body);
        if (reqError === null || reqError === void 0 ? void 0 : reqError.error) {
            return res.status(422).json({ status: "error", message: (_a = reqError.error) === null || _a === void 0 ? void 0 : _a.message });
        }
        let instituteCode = req.userid;
        let { code, status, message } = yield (0, studentController_1.institutecreateStudent)(req.body, instituteCode);
        return res.status(code).json({ status, message });
    }
    catch (e) {
        return res.status(500).json({ status: "error", message: e.message });
    }
}));
exports.InstitueStudentRoutes.post("/create/bulk", [authMiddleware_1.validateToken, authMiddleware_1.isInstitute], (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _b;
    try {
        // const reqError = instituteCreateStudentSchema.validate(req.body);
        // if (reqError?.error) {
        //     return res.status(422).json({ status: "error", message: reqError.error?.message });
        // }
        let instituteCode = req.userid;
        let { code, status, message } = yield (0, studentController_1.createBulkStundentController)((_b = req.body) === null || _b === void 0 ? void 0 : _b.data, instituteCode);
        return res.status(code).json({ status, message });
    }
    catch (e) {
        return res.status(500).json({ status: "error", message: e.message });
    }
}));
exports.InstitueStudentRoutes.get("/get/all", [authMiddleware_1.validateToken, authMiddleware_1.isInstitute], (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const page = req.query.page || 1;
        const insID = req.userid;
        const { code, status, message, totalPage, totalRow } = yield (0, student_1.getInstituteStudents)(page, insID);
        return res.status(code).json({ status: status, message: message, totalPage: totalPage, totalRow });
    }
    catch (e) {
        return res.status(500).json({ status: "error", message: e.message });
    }
}));
exports.InstitueStudentRoutes.get("/get/active", [authMiddleware_1.validateToken, authMiddleware_1.isInstitute], (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const page = req.query.page || 1;
        const insID = req.userid;
        const { code, status, message, totalPage, totalRow } = yield (0, student_1.getInstituteStudentsActive)(page, insID);
        return res.status(code).json({ status: status, message: message, totalPage: totalPage, totalRow });
    }
    catch (e) {
        return res.status(500).json({ status: "error", message: e.message });
    }
}));
exports.InstitueStudentRoutes.get("/get/search", [authMiddleware_1.validateToken, authMiddleware_1.isInstitute], (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const page = req.query.page || 1;
        const insID = req.userid;
        let query = req.query.query;
        if (query === '' || query === undefined || query === null) {
            query = '';
        }
        const { code, status, message, totalPage, totalRow } = yield (0, student_1.InstituteStudentSeach)(page, query, insID);
        return res.status(code).json({ status: status, message: message, totalPage: totalPage, totalRow: totalRow });
    }
    catch (e) {
        return res.status(500).json({ status: "error", message: e.message });
    }
}));
exports.InstitueStudentRoutes.get("/get/search/daterange", [authMiddleware_1.validateToken, authMiddleware_1.isInstitute], (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const page = req.query.page || 1;
        const insID = req.userid;
        const startDate = req.query.startDate || null;
        const endDate = req.query.endDate || null;
        const { code, status, message, totalPage, totalRow } = yield (0, student_1.getstudentsByDate)(page, insID, startDate, endDate);
        return res.status(code).json({ status: status, message: message, totalPage: totalPage, totalRow: totalRow });
    }
    catch (e) {
        return res.status(500).json({ status: "error", message: e.message });
    }
}));
exports.InstitueStudentRoutes.put("/update/:id", [authMiddleware_1.validateToken, authMiddleware_1.isInstitute], (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _c;
    try {
        const reqError = requestValidation_1.InstituteUpdateStatusSchema.validate({
            id: req.params.id,
            status: req.body.status
        });
        if (reqError === null || reqError === void 0 ? void 0 : reqError.error) {
            return res.status(422).json({ status: "error", message: (_c = reqError.error) === null || _c === void 0 ? void 0 : _c.message });
        }
        const { code, status, message } = yield (0, student_1.StudentStatusUpdate)(req.params.id, req.body.status);
        return res.status(200).json({ status, message });
    }
    catch (e) {
        return res.status(500).json({ status: "error", message: e.message });
    }
}));
exports.InstitueStudentRoutes.delete("/delete/:id", [authMiddleware_1.validateToken, authMiddleware_1.isInstitute], (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _d;
    try {
        const reqError = requestValidation_1.InstituteDeleteSchema.validate(req.params);
        if (reqError === null || reqError === void 0 ? void 0 : reqError.error) {
            return res.status(422).json({ status: "error", message: (_d = reqError.error) === null || _d === void 0 ? void 0 : _d.message });
        }
        const { code, status, message } = yield (0, student_1.studentDelete)(req.params.id);
        return res.status(200).json({ status, message });
    }
    catch (e) {
        return res.status(500).json({ status: "error", message: e.message });
    }
}));
exports.InstitueStudentRoutes.put("/edit/:id", [authMiddleware_1.validateToken, authMiddleware_1.isInstitute], (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _e;
    try {
        const reqError = requestValidation_1.instituteCreateStudentSchema.validate(req.body);
        if (reqError === null || reqError === void 0 ? void 0 : reqError.error) {
            return res.status(422).json({ status: "error", message: (_e = reqError.error) === null || _e === void 0 ? void 0 : _e.message });
        }
        const { code, status, message } = yield (0, student_1.editInstituteStudent)(req.params.id, req.body);
        return res.status(code).json({ status, message });
    }
    catch (e) {
        return res.status(500).json({ status: "error", message: e.message });
    }
}));
exports.InstitueStudentRoutes.get("/get/student/:id", [authMiddleware_1.validateToken, authMiddleware_1.isInstitute], (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { code, status, message } = yield (0, student_1.getstundet)(req.params.id);
        return res.status(code).json({ status: status, message: message });
    }
    catch (e) {
        return res.status(500).json({ status: "error", message: e.message });
    }
}));
