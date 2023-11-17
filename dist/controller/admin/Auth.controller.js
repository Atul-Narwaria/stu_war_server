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
exports.loginAdmin = exports.RegisterAdmin = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const admin_1 = require("../../model/admin/admin");
const RegisterAdmin = (name, email, phone, password) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let hashpassword = bcrypt_1.default.hashSync(password, 10);
        const { code, status, message } = yield (0, admin_1.CreateAdmin)(name, email, phone, hashpassword);
        return { code, status, message };
    }
    catch (e) {
        return { code: 500, status: "error", message: e.message };
    }
});
exports.RegisterAdmin = RegisterAdmin;
const loginAdmin = (email, password) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        let checkUser = yield (0, admin_1.getAdmin)(email);
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
        let createtoken = jsonwebtoken_1.default.sign({ userid: checkUser.message.id, role: "admin" }, key, { expiresIn: "7d" });
        return {
            code: 200,
            status: "success",
            message: "user logged in",
            token: createtoken,
        };
    }
    catch (e) {
        return { code: 500, status: "error", message: e.message };
    }
});
exports.loginAdmin = loginAdmin;
