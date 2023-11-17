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
exports.SubCourseRoutes = void 0;
const express_1 = require("express");
const authMiddleware_1 = require("../../middleware/authMiddleware");
const requestValidation_1 = require("../../middleware/requestValidation");
const subCourse_1 = require("../../model/course/subCourse");
exports.SubCourseRoutes = (0, express_1.Router)();
exports.SubCourseRoutes.post('/create', [authMiddleware_1.validateToken, authMiddleware_1.isInstitute], (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const reqError = requestValidation_1.instituteSubCourseCreateSchema.validate(req.body);
        if (reqError === null || reqError === void 0 ? void 0 : reqError.error) {
            return res.status(422).json({ status: "error", message: (_a = reqError.error) === null || _a === void 0 ? void 0 : _a.message });
        }
        console.log(req.userid);
        let { code, status, message } = yield (0, subCourse_1.createSubCourse)(req.body, req.userid);
        return res.status(code).json({ status, message });
    }
    catch (e) {
        return res.status(500).json({ status: "error", message: e.message });
    }
}));
exports.SubCourseRoutes.put('/edit/:id', [authMiddleware_1.validateToken, authMiddleware_1.isInstitute], (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _b;
    try {
        const reqError = requestValidation_1.instituteSubCourseCreateSchema.validate(req.body);
        if (reqError === null || reqError === void 0 ? void 0 : reqError.error) {
            return res.status(200).json({ status: "error", message: (_b = reqError.error) === null || _b === void 0 ? void 0 : _b.message });
        }
        let { code, status, message } = yield (0, subCourse_1.editSubCourse)(req.body, req.params.id);
        return res.status(code).json({ status, message });
    }
    catch (e) {
        return res.status(500).json({ status: "error", message: e.message });
    }
}));
exports.SubCourseRoutes.put('/update/:id', [authMiddleware_1.validateToken, authMiddleware_1.isInstitute], (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _c;
    try {
        const reqError = requestValidation_1.instituteSubCourseStatusSchema.validate(req.body);
        if (reqError === null || reqError === void 0 ? void 0 : reqError.error) {
            return res.status(200).json({ status: "error", message: (_c = reqError.error) === null || _c === void 0 ? void 0 : _c.message });
        }
        let { code, status, message } = yield (0, subCourse_1.updateSubCourseStatus)(req.params.id, req.body.status);
        return res.status(code).json({ status, message });
    }
    catch (e) {
        return res.status(500).json({ status: "error", message: e.message });
    }
}));
exports.SubCourseRoutes.get('/get/active/', [authMiddleware_1.validateToken, authMiddleware_1.isInstitute], (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let { code, status, message } = yield (0, subCourse_1.getActiveSubCourse)(req.params.id);
        return res.status(code).json({ status, message });
    }
    catch (e) {
        return res.status(500).json({ status: "error", message: e.message });
    }
}));
exports.SubCourseRoutes.get('/get/all/', [authMiddleware_1.validateToken, authMiddleware_1.isInstitute], (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const page = req.query.page || 1;
        const insID = req.userid;
        let { code, status, message, totalPage, totalRow } = yield (0, subCourse_1.getAllSubCourse)(page, req.userid);
        return res.status(code).json({ status: status, message: message, totalPage: totalPage, totalRow });
    }
    catch (e) {
        return res.status(500).json({ status: "error", message: e.message });
    }
}));
exports.SubCourseRoutes.get('/get/sub-course/:id', [authMiddleware_1.validateToken, authMiddleware_1.isInstitute], (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let { code, status, message } = yield (0, subCourse_1.getSubCourseById)(req.params.id);
        return res.status(code).json({ status, message });
    }
    catch (e) {
        return res.status(500).json({ status: "error", message: e.message });
    }
}));
exports.SubCourseRoutes.delete('/delete/:id', [authMiddleware_1.validateToken, authMiddleware_1.isInstitute], (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let { code, status, message } = yield (0, subCourse_1.deleteSubCourse)(req.params.id);
        return res.status(code).json({ status, message });
    }
    catch (e) {
        return res.status(500).json({ status: "error", message: e.message });
    }
}));
exports.SubCourseRoutes.get("/get/search", [authMiddleware_1.validateToken, authMiddleware_1.isInstitute], (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const page = req.query.page || 1;
        const insID = req.userid;
        const query = req.query.query || null;
        const { code, status, message, totalPage, totalRow } = yield (0, subCourse_1.InstituteSubCourseSeach)(page, query, insID);
        return res.status(code).json({ status: status, message: message, totalPage: totalPage, totalRow: totalRow });
    }
    catch (e) {
        return res.status(500).json({ status: "error", message: e.message });
    }
}));
