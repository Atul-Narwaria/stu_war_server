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
exports.countryRoutes = void 0;
const express_1 = require("express");
const authMiddleware_1 = require("../../middleware/authMiddleware");
const requestValidation_1 = require("../../middleware/requestValidation");
const country_1 = require("../../model/location/country");
exports.countryRoutes = (0, express_1.Router)();
exports.countryRoutes.post("/create", [authMiddleware_1.validateToken, authMiddleware_1.isAdmin], (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const reqError = requestValidation_1.countryCreateSchema.validate(req.body);
        if (reqError === null || reqError === void 0 ? void 0 : reqError.error) {
            return res.status(200).json({ status: "error", message: (_a = reqError.error) === null || _a === void 0 ? void 0 : _a.message });
        }
        const { country } = req.body;
        let { code, status, message } = yield (0, country_1.createCountry)(country);
        return res.status(code).json({ status, message });
    }
    catch (e) {
        return res.status(500).json({ status: "error", message: e.message });
    }
}));
exports.countryRoutes.get("/get", [authMiddleware_1.validateToken, authMiddleware_1.isAdmin], (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let { code, status, message } = yield (0, country_1.getCountry)();
        return res.status(code).json({ status, message });
    }
    catch (e) {
        return res.status(500).json({ status: "error", message: e.message });
    }
}));
exports.countryRoutes.get("/get/active", [authMiddleware_1.validateToken], (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let { code, status, message } = yield (0, country_1.getActiveCountry)();
        return res.status(code).json({ status, message });
    }
    catch (e) {
        return res.status(500).json({ status: "error", message: e.message });
    }
}));
exports.countryRoutes.get("/get/state_city", [authMiddleware_1.validateToken, authMiddleware_1.isAdmin], (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let { code, status, message } = yield (0, country_1.getCountryStateCityAll)();
        return res.status(code).json({ status, message });
    }
    catch (e) {
        return res.status(500).json({ status: "error", message: e.message });
    }
}));
exports.countryRoutes.put("/update/status", [authMiddleware_1.validateToken, authMiddleware_1.isAdmin], (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _b;
    try {
        const reqError = requestValidation_1.countryUpdateSchema.validate(req.body);
        if (reqError === null || reqError === void 0 ? void 0 : reqError.error) {
            return res.status(200).json({ status: "error", message: (_b = reqError.error) === null || _b === void 0 ? void 0 : _b.message });
        }
        let { code, status, message } = yield (0, country_1.updateCountry)(req.body.countryId, req.body.status);
        return res.status(code).json({ status, message });
    }
    catch (e) {
        return res.status(500).json({ status: "error", message: e.message });
    }
}));
exports.countryRoutes.delete("/delete/:id", [authMiddleware_1.validateToken, authMiddleware_1.isAdmin], (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _c;
    try {
        const reqError = requestValidation_1.countryIdSchema.validate(req.params);
        if (reqError === null || reqError === void 0 ? void 0 : reqError.error) {
            return res.status(200).json({ status: "error", message: (_c = reqError.error) === null || _c === void 0 ? void 0 : _c.message });
        }
        let { code, status, message } = yield (0, country_1.countryDelete)(req.params.id);
        return res.status(code).json({ status, message });
    }
    catch (e) {
        return res.status(500).json({ status: "error", message: e.message });
    }
}));
