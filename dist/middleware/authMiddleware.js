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
exports.commonAccess = exports.isStudent = exports.isTeacher = exports.isInstitute = exports.isAdmin = exports.validateToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const admin_1 = require("../model/admin/admin");
const institute_1 = require("../model/institute/institute");
const Teacher_1 = require("../model/Teacher/Teacher");
const student_1 = require("../model/student/student");
const secret_key = process.env.APP_KEY;
const validateToken = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const token = req.headers.authorization;
    if (!token) {
        return res.status(401).json({ message: "Authentication required" });
    }
    try {
        const decode = jsonwebtoken_1.default.verify(token, secret_key);
        req.userid = decode.userid;
        req.role = decode.role;
        next();
    }
    catch (error) {
        return res.status(401).json({ message: error.message });
    }
});
exports.validateToken = validateToken;
const isAdmin = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    let id = req.userid;
    console.log(req.userid);
    if (!id) {
        return res.status(401).json({ message: "Invalid token" });
    }
    const check = yield (0, admin_1.CheckAdminExistance)(id);
    console.log(check);
    if (check == 0) {
        return res.status(401).json({ message: "Admin role required" });
    }
    next();
});
exports.isAdmin = isAdmin;
const isInstitute = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    let id = req.userid;
    if (!id) {
        return res.status(401).json({ message: "Invalid token" });
    }
    const check = yield (0, institute_1.CheckinstituteExistance)(id);
    console.log(check);
    if (check == 0) {
        return res.status(401).json({ message: "institute role required" });
    }
    next();
});
exports.isInstitute = isInstitute;
const isTeacher = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    let id = req.userid;
    console.log(req.userid);
    if (!id) {
        return res.status(401).json({ message: "Invalid token" });
    }
    const check = yield (0, Teacher_1.isTeacherExist)(id);
    if (check.message == 0) {
        return res.status(401).json({ message: "teacher role required" });
    }
    next();
});
exports.isTeacher = isTeacher;
const isStudent = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    let id = req.userid;
    console.log(req.userid);
    if (!id) {
        return res.status(401).json({ message: "Invalid token" });
    }
    const check = yield (0, student_1.isStudentExist)(id);
    if (check.message == 0) {
        return res.status(401).json({ message: "teacher role required" });
    }
    next();
});
exports.isStudent = isStudent;
const commonAccess = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    let role = req.role;
    if (role === "institute") {
        req.userid = req.userid;
    }
    else if (role === "teacher") {
        let id = yield (0, Teacher_1.getTeacherInstituteId)(req.userid);
        req.userid = id.message;
    }
    else if (role === "student") {
        let id = yield (0, student_1.getStudentInstituteId)(req.userid);
        req.userid = id.message;
    }
    next();
});
exports.commonAccess = commonAccess;
