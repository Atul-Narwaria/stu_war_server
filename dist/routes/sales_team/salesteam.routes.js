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
exports.salesTeamRoutes = void 0;
const express_1 = require("express");
const requestValidation_1 = require("../../middleware/requestValidation");
const salesteam_controller_1 = require("../../controller/sales_team/salesteam.controller");
exports.salesTeamRoutes = (0, express_1.Router)();
exports.salesTeamRoutes.post('/registration', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const { name, email, phone, password, dob, fkdesgination } = req.body;
        const reqError = requestValidation_1.SalesTeamRegistrationSchema.validate(req.body);
        if (reqError === null || reqError === void 0 ? void 0 : reqError.error) {
            return res.status(200).json({ status: "error", message: (_a = reqError.error) === null || _a === void 0 ? void 0 : _a.message });
        }
        return res.status(200).json(yield (0, salesteam_controller_1.RegisterSalesTeam)(name, email, phone, password, dob, fkdesgination));
    }
    catch (e) {
        return res.status(500).json({ "status": "error", message: e.message });
    }
}));
exports.salesTeamRoutes.post('/login', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        const { error, value } = requestValidation_1.SalesTeamLoginSchema.validate(req.body);
        if (error) {
            return res.status(200).json({ status: "error", message: error === null || error === void 0 ? void 0 : error.message });
        }
        let login = yield (0, salesteam_controller_1.loginSalesTeam)(email, password);
        return res.status(200).json(login);
    }
    catch (e) {
        return res.status(500).json({ "status": "error", message: e.message });
    }
}));
