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
exports.AuthRoutes = void 0;
const express_1 = require("express");
const requestValidation_1 = require("../middleware/requestValidation");
const Auth_controller_1 = require("../controller/admin/Auth.controller");
exports.AuthRoutes = (0, express_1.Router)();
exports.AuthRoutes.post('/admin/registration', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const { name, email, phone, password } = req.body;
        const reqError = requestValidation_1.AdminRegistration.validate(req.body);
        if (reqError === null || reqError === void 0 ? void 0 : reqError.error) {
            return res.status(200).json({ status: "error", message: (_a = reqError.error) === null || _a === void 0 ? void 0 : _a.message });
        }
        let { code, status, message } = yield (0, Auth_controller_1.RegisterAdmin)(name, email, phone, password);
        return res.status(code).json({ status, message });
    }
    catch (e) {
        return res.status(500).json({ "status": "error", message: e.message });
    }
}));
exports.AuthRoutes.post('/admin/login', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        const { error, value } = requestValidation_1.AdminLogin.validate(req.body);
        if (error) {
            return res.status(200).json({ status: "error", message: error === null || error === void 0 ? void 0 : error.message });
        }
        let { code, status, message, token } = yield (0, Auth_controller_1.loginAdmin)(email, password);
        return res.status(code).json({ status, message, token, role: 'admin' });
    }
    catch (e) {
        return res.status(500).json({ "status": "error", message: e.message });
    }
}));
