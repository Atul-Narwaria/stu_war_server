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
exports.batchTeacher = void 0;
const express_1 = require("express");
const authMiddleware_1 = require("../../middleware/authMiddleware");
const batchTeacherLink_1 = require("../../model/batch/batchTeacherLink");
const requestValidation_1 = require("../../middleware/requestValidation");
const batchTeacher_controller_1 = require("../../controller/batch/batchTeacher/batchTeacher.controller");
exports.batchTeacher = (0, express_1.Router)();
exports.batchTeacher.post("/create", [authMiddleware_1.validateToken, authMiddleware_1.isInstitute], (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const reqError = requestValidation_1.instituteBatchTeacher.validate(req.body);
        if (reqError === null || reqError === void 0 ? void 0 : reqError.error) {
            return res
                .status(200)
                .json({ status: "error", message: (_a = reqError.error) === null || _a === void 0 ? void 0 : _a.message });
        }
        let { code, status, message } = yield (0, batchTeacherLink_1.createBatchTeacherLink)(req.body.fkTeacherId, req.body.fkBatchId);
        return res.status(code).json({ status, message });
    }
    catch (e) {
        return res.status(500).json({ status: "error", message: e.message });
    }
}));
exports.batchTeacher.get("/get/teacher/:id", [authMiddleware_1.validateToken, authMiddleware_1.isInstitute], (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { code, status, message } = yield (0, batchTeacherLink_1.getTeacherFromBatch)(req.params.id);
        return res.status(code).json({ status: status, message: message });
    }
    catch (e) {
        return res.status(500).json({ status: "error", message: e.message });
    }
}));
exports.batchTeacher.get("/get/batch/student/counts", [authMiddleware_1.validateToken, authMiddleware_1.isTeacher], (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const teacherId = req.userid;
        const { code, status, message } = yield (0, batchTeacherLink_1.getAllStudentCount)(teacherId);
        // console.log(message);
        return res.status(code).json({ status: status, message: message });
    }
    catch (e) {
        return res.status(500).json({ status: "error", message: e.message });
    }
}));
exports.batchTeacher.get("/get/batch/count", [authMiddleware_1.validateToken, authMiddleware_1.isTeacher], (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const teacherId = req.userid;
        const { code, status, message } = yield (0, batchTeacherLink_1.getTotalteacherBatchCount)(teacherId);
        // console.log(message);
        return res.status(code).json({ status: status, message: message });
    }
    catch (e) {
        return res.status(500).json({ status: "error", message: e.message });
    }
}));
exports.batchTeacher.get("/get/batch/remaning/count", [authMiddleware_1.validateToken, authMiddleware_1.isTeacher], (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const teacherId = req.userid;
        const { code, status, message } = yield (0, batchTeacher_controller_1.TodayRemainingBatch)(teacherId);
        // console.log(message);
        return res.status(code).json({ status: status, message: message });
    }
    catch (e) {
        return res.status(500).json({ status: "error", message: e.message });
    }
}));
exports.batchTeacher.get("/get/batch", [authMiddleware_1.validateToken, authMiddleware_1.isTeacher], (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const teacherId = req.userid;
        const { code, status, message } = yield (0, batchTeacher_controller_1.BatchListDashboard)(teacherId);
        // console.log(message);
        return res.status(code).json({ status: status, message: message });
    }
    catch (e) {
        return res.status(500).json({ status: "error", message: e.message });
    }
}));
exports.batchTeacher.delete("/delete/:id", [authMiddleware_1.validateToken, authMiddleware_1.isInstitute], (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let { code, status, message } = yield (0, batchTeacherLink_1.deleteBatchTeacherLink)(req.params.id);
        return res.status(code).json({ status, message });
    }
    catch (e) {
        return res.status(500).json({ status: "error", message: e.message });
    }
}));
