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
exports.test = exports.createInstitute = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const institute_1 = require("../../model/institute/institute");
const Code_helper_1 = require("../../helpers/Code.helper");
const createInstitute = (data) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    try {
        let maintancepassword = ((_a = process === null || process === void 0 ? void 0 : process.env) === null || _a === void 0 ? void 0 : _a.MAINTANCE_PASSWORD) ? (_b = process === null || process === void 0 ? void 0 : process.env) === null || _b === void 0 ? void 0 : _b.MAINTANCE_PASSWORD : "Atul@1234";
        let hashpassword = bcrypt_1.default.hashSync(data.password, 10);
        let datas = {
            name: data.name,
            email: data.email,
            phone: data.phone,
            password: hashpassword,
            country: data.country,
            state: data.state,
            city: data.city,
            profileImg: data.city,
            address: data.address,
            pin: data.pin,
            maintancePassword: bcrypt_1.default.hashSync(maintancepassword, 10),
            code: yield (0, Code_helper_1.instituteCode)()
        };
        const { code, status, message } = yield (0, institute_1.createInstitue)(datas);
        return { code, status, message };
    }
    catch (e) {
        return { code: 500, status: "error", message: e.message };
    }
});
exports.createInstitute = createInstitute;
const test = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield (0, Code_helper_1.instituteCode)();
});
exports.test = test;
