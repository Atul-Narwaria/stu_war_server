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
exports.resetPassword = exports.loginTeacher = void 0;
const Teacher_1 = require("../../model/Teacher/Teacher");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const loginTeacher = (email, password) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        let checkUser = yield (0, Teacher_1.getTeacherPassword)(email);
        if (checkUser.status == "error") {
            return {
                code: checkUser.code,
                status: checkUser.status,
                message: checkUser.message,
            };
        }
        let checkPassword = bcrypt_1.default.compareSync(password, (_a = checkUser.message) === null || _a === void 0 ? void 0 : _a.password);
        if (!checkPassword) {
            return { code: 401, status: "error", message: "incorrect password" };
        }
        let key = process.env.APP_KEY;
        let createtoken = jsonwebtoken_1.default.sign({ userid: checkUser.message.id, role: "teacher" }, key, {
            expiresIn: "7d",
        });
        return {
            code: 200,
            status: "success",
            message: "teacher logged in",
            token: createtoken,
        };
    }
    catch (e) {
        let split = e.message.split(".");
        split = split.slice(-2);
        return { code: 500, status: "error", message: split[0] };
    }
});
exports.loginTeacher = loginTeacher;
const resetPassword = (id) => __awaiter(void 0, void 0, void 0, function* () {
    var _b, _c;
    try {
        const { code, status, message } = yield (0, Teacher_1.getteacherById)(id);
        if (status === "error") {
            return { code, status, message };
        }
        let maintancepassword = ((_b = process === null || process === void 0 ? void 0 : process.env) === null || _b === void 0 ? void 0 : _b.MAINTANCE_PASSWORD)
            ? (_c = process === null || process === void 0 ? void 0 : process.env) === null || _c === void 0 ? void 0 : _c.MAINTANCE_PASSWORD
            : "12345678";
        const update = yield (0, Teacher_1.updateteacherPassword)(id, bcrypt_1.default.hashSync(maintancepassword, 10));
        return {
            code: update.code,
            status: update.status,
            message: update.message,
        };
    }
    catch (e) {
        return { code: 500, status: "error", message: e.message };
    }
});
exports.resetPassword = resetPassword;
