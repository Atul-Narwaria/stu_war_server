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
exports.batchLinkRoutes = void 0;
const express_1 = require("express");
const authMiddleware_1 = require("../../middleware/authMiddleware");
const requestValidation_1 = require("../../middleware/requestValidation");
const batchLink_1 = require("../../model/batch/batchLink");
exports.batchLinkRoutes = (0, express_1.Router)();
exports.batchLinkRoutes.post('/create', [authMiddleware_1.validateToken, authMiddleware_1.isInstitute], (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const reqError = requestValidation_1.instituteBatchLinkCreateSchema.validate(req.body);
        if (reqError === null || reqError === void 0 ? void 0 : reqError.error) {
            return res.status(200).json({ status: "error", message: (_a = reqError.error) === null || _a === void 0 ? void 0 : _a.message });
        }
        let { code, status, message } = yield (0, batchLink_1.createBatchLink)(req.body, req.userid);
        return res.status(code).json({ status, message });
    }
    catch (e) {
        return res.status(500).json({ status: "error", message: e.message });
    }
}));
exports.batchLinkRoutes.post('/create/bulk', [authMiddleware_1.validateToken, authMiddleware_1.isInstitute], (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!req.body || !req.body.data) {
            return res.status(200).json({ status: "error", message: "data not found" });
        }
        let data = [];
        let bodyData = req.body.data;
        if (bodyData.length != 0) {
            bodyData.map((e) => {
                data.push({
                    fk_institute_id: req.userid,
                    fk_student_id: e.fk_student_id,
                    fk_bacth_id: e.fk_batch_id,
                    status: true
                });
            });
        }
        if (data.length != 0) {
            let { code, status, message } = yield (0, batchLink_1.createBatchBulkLink)(data);
            return res.status(code).json({ status, message });
        }
        return res.status(422).json({ status: "error", message: "something went wrong" });
    }
    catch (e) {
        return res.status(500).json({ status: "error", message: e.message });
    }
}));
exports.batchLinkRoutes.delete('/delete/:id', [authMiddleware_1.validateToken, authMiddleware_1.isInstitute], (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let { code, status, message } = yield (0, batchLink_1.deleteBatchLink)(req.params.id);
        return res.status(code).json({ status, message });
    }
    catch (e) {
        return res.status(500).json({ status: "error", message: e.message });
    }
}));
