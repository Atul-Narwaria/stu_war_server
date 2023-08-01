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
exports.isAdmin = exports.validateToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const admin_1 = require("../model/admin/admin");
const secret_key = process.env.APP_KEY;
const validateToken = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const token = req.headers.authorization;
    if (!token) {
        return res.status(401).json({ message: 'Authentication required' });
    }
    try {
        const decode = jsonwebtoken_1.default.verify(token, secret_key);
        req.userid = decode.userid;
        next();
    }
    catch (error) {
        return res.status(401).json({ message: 'Invalid token' });
    }
});
exports.validateToken = validateToken;
const isAdmin = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    let id = req.userid;
    console.log(req.userid);
    if (!id) {
        return res.status(401).json({ message: 'Invalid token' });
    }
    const check = yield (0, admin_1.CheckAdminExistance)(id);
    console.log(check);
    if (check == 0) {
        return res.status(401).json({ message: 'Admin role required' });
    }
    next();
});
exports.isAdmin = isAdmin;
