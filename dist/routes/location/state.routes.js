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
exports.StateRoutes = void 0;
const express_1 = require("express");
const authMiddleware_1 = require("../../middleware/authMiddleware");
const requestValidation_1 = require("../../middleware/requestValidation");
const state_1 = require("../../model/location/state");
exports.StateRoutes = (0, express_1.Router)();
exports.StateRoutes.post("/create", [authMiddleware_1.validateToken, authMiddleware_1.isAdmin], (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const reqError = requestValidation_1.stateCreateSchema.validate(req.body);
        if (reqError === null || reqError === void 0 ? void 0 : reqError.error) {
            return res.status(200).json({ status: "error", message: (_a = reqError.error) === null || _a === void 0 ? void 0 : _a.message });
        }
        const { countryId, state } = req.body;
        let { code, status, message } = yield (0, state_1.createState)(countryId, state);
        return res.status(code).json({ status, message });
    }
    catch (e) {
        return res.status(500).json({ status: "error", message: e.message });
    }
}));
exports.StateRoutes.get("/get", [authMiddleware_1.validateToken, authMiddleware_1.isAdmin], (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _b;
    try {
        const reqError = requestValidation_1.stateGetSchema.validate(req.body);
        if (reqError === null || reqError === void 0 ? void 0 : reqError.error) {
            return res.status(200).json({ status: "error", message: (_b = reqError.error) === null || _b === void 0 ? void 0 : _b.message });
        }
        const { countryId } = req.body;
        let { code, status, message } = yield (0, state_1.getStateByCountry)(countryId);
        return res.status(code).json({ status, message });
    }
    catch (e) {
        return res.status(500).json({ status: "error", message: e.message });
    }
}));
exports.StateRoutes.get("/get/all", [authMiddleware_1.validateToken, authMiddleware_1.isAdmin], (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let { code, status, message } = yield (0, state_1.AllState)();
        return res.status(code).json({ status, message });
    }
    catch (e) {
        return res.status(500).json({ status: "error", message: e.message });
    }
}));
exports.StateRoutes.get("/get/active/:countryId", [authMiddleware_1.validateToken], (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _c;
    try {
        const reqError = requestValidation_1.stateGetSchema.validate(req.params);
        if (reqError === null || reqError === void 0 ? void 0 : reqError.error) {
            return res.status(200).json({ status: "error", message: (_c = reqError.error) === null || _c === void 0 ? void 0 : _c.message });
        }
        const { countryId } = req.params;
        let { code, status, message } = yield (0, state_1.getStateByCountry)(countryId);
        return res.status(code).json({ status, message });
    }
    catch (e) {
        return res.status(500).json({ status: "error", message: e.message });
    }
}));
exports.StateRoutes.get("/get/city", [authMiddleware_1.validateToken, authMiddleware_1.isAdmin], (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _d;
    try {
        const reqError = requestValidation_1.stateGetSchema.validate(req.body);
        if (reqError === null || reqError === void 0 ? void 0 : reqError.error) {
            return res.status(200).json({ status: "error", message: (_d = reqError.error) === null || _d === void 0 ? void 0 : _d.message });
        }
        const { countryId } = req.body;
        let { code, status, message } = yield (0, state_1.getStateCityByCountry)(countryId);
        return res.status(code).json({ status, message });
    }
    catch (e) {
        return res.status(500).json({ status: "error", message: e.message });
    }
}));
exports.StateRoutes.get("/get/city/active", [authMiddleware_1.validateToken], (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _e;
    try {
        const reqError = requestValidation_1.stateGetSchema.validate(req.body);
        if (reqError === null || reqError === void 0 ? void 0 : reqError.error) {
            return res.status(200).json({ status: "error", message: (_e = reqError.error) === null || _e === void 0 ? void 0 : _e.message });
        }
        const { countryId } = req.body;
        let { code, status, message } = yield (0, state_1.getActiveStateCityByCountry)(countryId);
        return res.status(code).json({ status, message });
    }
    catch (e) {
        return res.status(500).json({ status: "error", message: e.message });
    }
}));
exports.StateRoutes.put("/update/status", [authMiddleware_1.validateToken, authMiddleware_1.isAdmin], (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _f;
    try {
        const reqError = requestValidation_1.stateUpdateSchema.validate(req.body);
        if (reqError === null || reqError === void 0 ? void 0 : reqError.error) {
            return res.status(200).json({ status: "error", message: (_f = reqError.error) === null || _f === void 0 ? void 0 : _f.message });
        }
        let { code, status, message } = yield (0, state_1.updateState)(req.body.stateId, req.body.status);
        return res.status(code).json({ status, message });
    }
    catch (e) {
        return res.status(500).json({ status: "error", message: e.message });
    }
}));
exports.StateRoutes.delete("/delete/:id", [authMiddleware_1.validateToken, authMiddleware_1.isAdmin], (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _g;
    try {
        const reqError = requestValidation_1.stateIdSchema.validate(req.params);
        if (reqError === null || reqError === void 0 ? void 0 : reqError.error) {
            return res.status(200).json({ status: "error", message: (_g = reqError.error) === null || _g === void 0 ? void 0 : _g.message });
        }
        let { code, status, message } = yield (0, state_1.stateDelete)(req.params.id);
        return res.status(code).json({ status, message });
    }
    catch (e) {
        return res.status(500).json({ status: "error", message: e.message });
    }
}));
exports.StateRoutes.get("/get/active/country/:id", [authMiddleware_1.validateToken], (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _h;
    try {
        const reqError = requestValidation_1.stateIdSchema.validate(req.params);
        if (reqError === null || reqError === void 0 ? void 0 : reqError.error) {
            return res.status(200).json({ status: "error", message: (_h = reqError.error) === null || _h === void 0 ? void 0 : _h.message });
        }
        let { code, status, message } = yield (0, state_1.getActiveStateByCountry)(req.params.id);
        return res.status(code).json({ status, message });
    }
    catch (e) {
        return res.status(500).json({ status: "error", message: e.message });
    }
}));
