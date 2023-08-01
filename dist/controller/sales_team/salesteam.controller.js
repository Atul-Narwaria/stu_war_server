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
exports.loginSalesTeam = exports.RegisterSalesTeam = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const salesTeam_1 = require("../../model/sales_team/salesTeam");
const RegisterSalesTeam = (name, email, phone, password, dob, fkdesgination) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let hashpassword = bcrypt_1.default.hashSync(password, 10);
        return yield (0, salesTeam_1.CreateSalesTeam)(name, email, phone, hashpassword, dob, fkdesgination);
    }
    catch (e) {
        return { status: "error", message: e.message };
    }
});
exports.RegisterSalesTeam = RegisterSalesTeam;
const loginSalesTeam = (email, password) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        let checkUser = yield (0, salesTeam_1.getSalesTeam)(email);
        if (checkUser.status == "error") {
            return { status: checkUser.status, message: checkUser.message };
        }
        let checkPassword = bcrypt_1.default.compareSync(password, (_a = checkUser.message) === null || _a === void 0 ? void 0 : _a.password);
        if (!checkPassword) {
            return { status: "error", message: "incorrect password" };
        }
        let key = process.env.APP_KEY;
        let createtoken = jsonwebtoken_1.default.sign({ userid: checkUser.message.id }, key, { expiresIn: "7d" });
        return { status: "success", message: "user logged in", token: createtoken };
    }
    catch (e) {
        return { status: "error", message: e.message };
    }
});
exports.loginSalesTeam = loginSalesTeam;
