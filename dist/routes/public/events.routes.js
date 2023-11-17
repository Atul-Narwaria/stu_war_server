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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventRoutes = void 0;
const express_1 = require("express");
const authMiddleware_1 = require("../../middleware/authMiddleware");
const events_1 = require("../../model/public/events");
const requestValidation_1 = require("../../middleware/requestValidation");
const moment_1 = __importDefault(require("moment"));
exports.EventRoutes = (0, express_1.Router)();
exports.EventRoutes.post("/create", [authMiddleware_1.validateToken, authMiddleware_1.isInstitute], (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const reqError = requestValidation_1.eventsCreateSchema.validate(req.body);
        if (reqError === null || reqError === void 0 ? void 0 : reqError.error) {
            return res
                .status(422)
                .json({ status: "error", message: (_a = reqError.error) === null || _a === void 0 ? void 0 : _a.message });
        }
        const institute = req.userid;
        const { name, category, isleave, date } = req.body;
        const { code, status, message } = yield (0, events_1.createEvent)(name, category, isleave, institute, date);
        // console.log(message);
        return res.status(code).json({ status: status, message: message });
    }
    catch (e) {
        return res.status(500).json({ status: "error", message: e.message });
    }
}));
exports.EventRoutes.post("/create/bulk", [authMiddleware_1.validateToken, authMiddleware_1.isInstitute], (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let instituteCode = req.userid;
        var data = req.body.data;
        if (!data) {
            return res
                .status(422)
                .json({ status: "error", message: "data required" });
        }
        var updatedData = [];
        if (data.length > 0) {
            data.map((item) => {
                updatedData.push({
                    name: item.name,
                    category: item.category,
                    isleave: item.isleave,
                    fk_institute_id: instituteCode,
                    date: new Date(item.date),
                    status: true,
                });
            });
        }
        if (data.length <= 0) {
            return res
                .status(422)
                .json({ status: "error", message: "data required" });
        }
        const { code, status, message } = yield (0, events_1.createBulkEvent)(updatedData);
        return res.status(code).json({ status, message });
    }
    catch (e) {
        return res.status(500).json({ status: "error", message: e.message });
    }
}));
exports.EventRoutes.get("/get/active", [authMiddleware_1.validateToken, authMiddleware_1.isInstitute], (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const insID = req.userid;
        const { code, status, message } = yield (0, events_1.getActiveEvents)(insID);
        return res.status(code).json({
            status: status,
            message: message,
        });
    }
    catch (e) {
        return res.status(500).json({ status: "error", message: e.message });
    }
}));
exports.EventRoutes.get("/get/all", [authMiddleware_1.validateToken, authMiddleware_1.isInstitute], (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const insID = req.userid;
        const { code, status, message } = yield (0, events_1.getAllEvents)(insID);
        return res.status(code).json({
            status: status,
            message: message,
        });
    }
    catch (e) {
        return res.status(500).json({ status: "error", message: e.message });
    }
}));
exports.EventRoutes.get("/get/update/event", [authMiddleware_1.validateToken, authMiddleware_1.commonAccess], (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        //   let isInstitutes =
        const insID = req.userid;
        var date = req.query.date
            ? req.query.date
            : (0, moment_1.default)().format("yyyy-MM-DD");
        //   console.log(date);
        const { code, status, message } = yield (0, events_1.getUpdateevnets)(insID, date);
        return res.status(code).json({
            status: status,
            message: message,
        });
    }
    catch (e) {
        return res.status(500).json({ status: "error", message: e.message });
    }
}));
exports.EventRoutes.put("/update/:id", [authMiddleware_1.validateToken, authMiddleware_1.isInstitute], (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _b;
    try {
        const reqError = requestValidation_1.InstituteUpdateStatusSchema.validate({
            id: req.params.id,
            status: req.body.status,
        });
        if (reqError === null || reqError === void 0 ? void 0 : reqError.error) {
            return res
                .status(422)
                .json({ status: "error", message: (_b = reqError.error) === null || _b === void 0 ? void 0 : _b.message });
        }
        const { code, status, message } = yield (0, events_1.StatusUpdateEvent)(req.body.status, req.params.id);
        return res.status(200).json({ status, message });
    }
    catch (e) {
        return res.status(500).json({ status: "error", message: e.message });
    }
}));
exports.EventRoutes.delete("/delete/:id", [authMiddleware_1.validateToken, authMiddleware_1.isInstitute], (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _c;
    try {
        const reqError = requestValidation_1.InstituteDeleteSchema.validate(req.params);
        if (reqError === null || reqError === void 0 ? void 0 : reqError.error) {
            return res
                .status(422)
                .json({ status: "error", message: (_c = reqError.error) === null || _c === void 0 ? void 0 : _c.message });
        }
        const { code, status, message } = yield (0, events_1.deleteStatus)(req.params.id);
        return res.status(200).json({ status, message });
    }
    catch (e) {
        return res.status(500).json({ status: "error", message: e.message });
    }
}));
