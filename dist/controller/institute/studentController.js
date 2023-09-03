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
exports.institutecreateStudent = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const institute_1 = require("../../model/institute/institute");
const uniqueId_helper_1 = require("../../helper/uniqueId.helper");
const student_1 = require("../../model/student/student");
const institutecreateStudent = (data, insId) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    let inscode = yield (0, institute_1.getInstituesById)(insId);
    if (!inscode) {
        return {
            code: 403,
            status: "error",
            message: "Invalid Institute Id"
        };
    }
    let getAddmissionid = yield (0, uniqueId_helper_1.studentAddmissionId)(inscode.message.code);
    console.log(getAddmissionid.status);
    if (getAddmissionid.status != "success") {
        return {
            code: 400,
            status: "error",
            message: "internal error"
        };
    }
    let maintancepassword = ((_a = process === null || process === void 0 ? void 0 : process.env) === null || _a === void 0 ? void 0 : _a.MAINTANCE_PASSWORD) ? (_b = process === null || process === void 0 ? void 0 : process.env) === null || _b === void 0 ? void 0 : _b.MAINTANCE_PASSWORD : "12345678";
    let datas = {
        firstname: data.firstname,
        lastname: data.lastname,
        email: data.email,
        phone: data.phone,
        password: bcrypt_1.default.hashSync(maintancepassword, 10),
        dob: data.dob,
        gender: data.gender.toLowerCase(),
        admissionId: getAddmissionid.message,
        profileImg: null,
        country: data.country,
        state: data.state,
        city: data.city,
        address: data.address,
        pin: data.pin,
        instituteId: insId
    };
    const { code, status, message } = yield (0, student_1.createStudentWithAddress)(datas);
    return { code, status, message };
});
exports.institutecreateStudent = institutecreateStudent;
