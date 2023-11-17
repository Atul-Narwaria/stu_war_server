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
exports.assignmentRoutes = void 0;
const express_1 = require("express");
const authMiddleware_1 = require("../../middleware/authMiddleware");
const requestValidation_1 = require("../../middleware/requestValidation");
const assignmentMaster_1 = require("../../model/assignment/assignmentMaster");
exports.assignmentRoutes = (0, express_1.Router)();
exports.assignmentRoutes.post('/create', [authMiddleware_1.validateToken, authMiddleware_1.isInstitute], (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const reqError = requestValidation_1.instituteAssignmentMasterCreate.validate(req.body);
        if (reqError === null || reqError === void 0 ? void 0 : reqError.error) {
            return res.status(422).json({ status: "error", message: (_a = reqError.error) === null || _a === void 0 ? void 0 : _a.message });
        }
        let { code, status, message } = yield (0, assignmentMaster_1.createAssignmentMaster)(req.body, req.userid);
        return res.status(code).json({ status, message });
    }
    catch (e) {
        return res.status(500).json({ status: "error", message: e.message });
    }
}));
exports.assignmentRoutes.put('/edit/:id', [authMiddleware_1.validateToken, authMiddleware_1.isInstitute], (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _b;
    try {
        const reqError = requestValidation_1.instituteAssignmentMasterEdit.validate(req.body);
        if (reqError === null || reqError === void 0 ? void 0 : reqError.error) {
            return res.status(422).json({ status: "error", message: (_b = reqError.error) === null || _b === void 0 ? void 0 : _b.message });
        }
        let { code, status, message } = yield (0, assignmentMaster_1.editAssignmentMaster)(req.body, req.params.id);
        return res.status(code).json({ status, message });
    }
    catch (e) {
        return res.status(500).json({ status: "error", message: e.message });
    }
}));
exports.assignmentRoutes.get('/get/active', [authMiddleware_1.validateToken, authMiddleware_1.isInstitute], (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let { code, status, message } = yield (0, assignmentMaster_1.getActiveAssignmentMaster)(req.userid);
        return res.status(code).json({ status, message });
    }
    catch (e) {
        return res.status(500).json({ status: "error", message: e.message });
    }
}));
exports.assignmentRoutes.get('/get/all', [authMiddleware_1.validateToken, authMiddleware_1.isInstitute], (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let { code, status, message } = yield (0, assignmentMaster_1.getAssignmentMaster)(req.userid);
        return res.status(code).json({ status, message });
    }
    catch (e) {
        return res.status(500).json({ status: "error", message: e.message });
    }
}));
exports.assignmentRoutes.delete('/delete/:id', [authMiddleware_1.validateToken, authMiddleware_1.isInstitute], (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let { code, status, message } = yield (0, assignmentMaster_1.deleteAssignmentMaster)(req.params.id);
        return res.status(code).json({ status, message });
    }
    catch (e) {
        return res.status(500).json({ status: "error", message: e.message });
    }
}));
