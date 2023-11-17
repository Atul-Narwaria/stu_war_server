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
exports.assignmentTypeRoutes = void 0;
const express_1 = require("express");
const authMiddleware_1 = require("../../middleware/authMiddleware");
const assignmentType_1 = require("../../model/assignment/assignmentType");
const requestValidation_1 = require("../../middleware/requestValidation");
exports.assignmentTypeRoutes = (0, express_1.Router)();
exports.assignmentTypeRoutes.post('/create', [authMiddleware_1.validateToken, authMiddleware_1.isAdmin], (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const reqError = requestValidation_1.instituteAssignmentTypeCreate.validate(req.body);
        if (reqError === null || reqError === void 0 ? void 0 : reqError.error) {
            return res.status(422).json({ status: "error", message: (_a = reqError.error) === null || _a === void 0 ? void 0 : _a.message });
        }
        let { code, status, message } = yield (0, assignmentType_1.createAssignmentType)(req.body.name, req.body.status);
        return res.status(code).json({ status, message });
    }
    catch (e) {
        return res.status(500).json({ status: "error", message: e.message });
    }
}));
exports.assignmentTypeRoutes.put('/update/:id', [authMiddleware_1.validateToken, authMiddleware_1.isAdmin], (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _b;
    try {
        const reqError = requestValidation_1.instituteBatchStatusSchema.validate(req.body);
        if (reqError === null || reqError === void 0 ? void 0 : reqError.error) {
            return res.status(200).json({ status: "error", message: (_b = reqError.error) === null || _b === void 0 ? void 0 : _b.message });
        }
        let { code, status, message } = yield (0, assignmentType_1.AssignmentTypeStatusUpdate)(req.params.id, req.body.status);
        return res.status(code).json({ status, message });
    }
    catch (e) {
        return res.status(500).json({ status: "error", message: e.message });
    }
}));
exports.assignmentTypeRoutes.get('/get/active', [authMiddleware_1.validateToken, authMiddleware_1.isAdmin], (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let { code, status, message } = yield (0, assignmentType_1.getActiveAssignmentType)();
        return res.status(code).json({ status, message });
    }
    catch (e) {
        return res.status(500).json({ status: "error", message: e.message });
    }
}));
exports.assignmentTypeRoutes.get('/get/all', [authMiddleware_1.validateToken, authMiddleware_1.isAdmin], (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let { code, status, message } = yield (0, assignmentType_1.getAssignmentType)();
        return res.status(code).json({ status, message });
    }
    catch (e) {
        return res.status(500).json({ status: "error", message: e.message });
    }
}));
exports.assignmentTypeRoutes.delete('/delete/:id', [authMiddleware_1.validateToken, authMiddleware_1.isAdmin], (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let { code, status, message } = yield (0, assignmentType_1.deleteAssignmentType)(req.params.id);
        return res.status(code).json({ status, message });
    }
    catch (e) {
        return res.status(500).json({ status: "error", message: e.message });
    }
}));
