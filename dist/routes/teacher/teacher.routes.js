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
exports.teacherRoutes = void 0;
const express_1 = require("express");
const requestValidation_1 = require("../../middleware/requestValidation");
const Teacher_controller_1 = require("../../controller/teacher/Teacher.controller");
const authMiddleware_1 = require("../../middleware/authMiddleware");
const Teacher_1 = require("../../model/Teacher/Teacher");
exports.teacherRoutes = (0, express_1.Router)();
exports.teacherRoutes.post("/registration", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, email, phone, password, dob, fkdesgination } = req.body;
        //   const reqError = SalesTeamRegistrationSchema.validate(req.body);
        //   if(reqError?.error){
        //     return res.status(200).json({status:"error", message:reqError.error?.message});
        //   }
        //   return res.status(200).json(await RegisterSalesTeam(name,email,phone,password,dob,fkdesgination))
    }
    catch (e) {
        return res.status(500).json({ status: "error", message: e.message });
    }
}));
exports.teacherRoutes.post("/login", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        const { error, value } = requestValidation_1.AdminLogin.validate(req.body);
        if (error) {
            return res.status(200).json({ status: "error", message: error === null || error === void 0 ? void 0 : error.message });
        }
        let { code, status, message, token } = yield (0, Teacher_controller_1.loginTeacher)(email, password);
        return res.status(code).json({ status, message, token, role: "teacher" });
    }
    catch (e) {
        return res.status(500).json({ status: "error", message: e.message });
    }
}));
exports.teacherRoutes.get("/get/Active", [authMiddleware_1.validateToken, authMiddleware_1.isInstitute], (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const page = req.query.page || 1;
        const insID = req.userid;
        const { code, status, message, totalPage, totalRow } = yield (0, Teacher_1.getTeachersActive)(page, insID);
        return res.status(code).json({
            status: status,
            message: message,
            totalPage: totalPage,
            totalRow,
        });
    }
    catch (e) {
        return res.status(500).json({ status: "error", message: e.message });
    }
}));
exports.teacherRoutes.get("/get", [authMiddleware_1.validateToken, authMiddleware_1.isInstitute], (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const page = req.query.page || 1;
        const insID = req.userid;
        const { code, status, message, totalPage, totalRow } = yield (0, Teacher_1.getInstituteTeacher)(page, insID);
        return res.status(code).json({
            status: status,
            message: message,
            totalPage: totalPage,
            totalRow,
        });
    }
    catch (e) {
        return res.status(500).json({ status: "error", message: e.message });
    }
}));
