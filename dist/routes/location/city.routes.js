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
exports.cityRoutes = void 0;
const express_1 = require("express");
const authMiddleware_1 = require("../../middleware/authMiddleware");
const requestValidation_1 = require("../../middleware/requestValidation");
const city_1 = require("../../model/location/city");
exports.cityRoutes = (0, express_1.Router)();
exports.cityRoutes.post("/create", [authMiddleware_1.validateToken, authMiddleware_1.isAdmin], (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        console.log(req.body);
        const reqError = requestValidation_1.cityCreateSchema.validate(req.body);
        if (reqError === null || reqError === void 0 ? void 0 : reqError.error) {
            return res.status(200).json({ status: "error", message: (_a = reqError.error) === null || _a === void 0 ? void 0 : _a.message });
        }
        const { countryId, stateId, city } = req.body;
        let { code, status, message } = yield (0, city_1.createCity)(countryId, stateId, city);
        return res.status(code).json({ status, message });
    }
    catch (e) {
        return res.status(500).json({ status: "error", message: e.message });
    }
}));
exports.cityRoutes.get("/get", [authMiddleware_1.validateToken, authMiddleware_1.isAdmin], (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _b;
    try {
        const reqError = requestValidation_1.cityGetSchema.validate(req.body);
        if (reqError === null || reqError === void 0 ? void 0 : reqError.error) {
            return res.status(200).json({ status: "error", message: (_b = reqError.error) === null || _b === void 0 ? void 0 : _b.message });
        }
        const { countryId, stateId, city } = req.body;
        let { code, status, message } = yield (0, city_1.getCity)(countryId, stateId);
        return res.status(code).json({ status, message });
    }
    catch (e) {
        return res.status(500).json({ status: "error", message: e.message });
    }
}));
exports.cityRoutes.get("/get/All", [authMiddleware_1.validateToken, authMiddleware_1.isAdmin], (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let { code, status, message } = yield (0, city_1.getCityWithStateCountry)();
        return res.status(code).json({ status, message });
    }
    catch (e) {
        return res.status(500).json({ status: "error", message: e.message });
    }
}));
exports.cityRoutes.get("/get/active", [authMiddleware_1.validateToken], (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _c;
    try {
        const reqError = requestValidation_1.cityGetSchema.validate(req.body);
        if (reqError === null || reqError === void 0 ? void 0 : reqError.error) {
            return res.status(200).json({ status: "error", message: (_c = reqError.error) === null || _c === void 0 ? void 0 : _c.message });
        }
        const { countryId, stateId, city } = req.body;
        let { code, status, message } = yield (0, city_1.getActiveCity)(countryId, stateId);
        return res.status(code).json({ status, message });
    }
    catch (e) {
        return res.status(500).json({ status: "error", message: e.message });
    }
}));
exports.cityRoutes.put("/update/status", [authMiddleware_1.validateToken, authMiddleware_1.isAdmin], (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _d;
    try {
        const reqError = requestValidation_1.cityUpdateSchema.validate(req.body);
        if (reqError === null || reqError === void 0 ? void 0 : reqError.error) {
            return res.status(200).json({ status: "error", message: (_d = reqError.error) === null || _d === void 0 ? void 0 : _d.message });
        }
        let { code, status, message } = yield (0, city_1.updatecity)(req.body.cityId, req.body.status);
        return res.status(code).json({ status, message });
    }
    catch (e) {
        return res.status(500).json({ status: "error", message: e.message });
    }
}));
exports.cityRoutes.delete("/delete/:id", [authMiddleware_1.validateToken, authMiddleware_1.isAdmin], (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _e;
    try {
        const reqError = requestValidation_1.cityIdSchema.validate(req.params);
        if (reqError === null || reqError === void 0 ? void 0 : reqError.error) {
            return res.status(200).json({ status: "error", message: (_e = reqError.error) === null || _e === void 0 ? void 0 : _e.message });
        }
        let { code, status, message } = yield (0, city_1.cityDelete)(req.params.id);
        return res.status(code).json({ status, message });
    }
    catch (e) {
        return res.status(500).json({ status: "error", message: e.message });
    }
}));
