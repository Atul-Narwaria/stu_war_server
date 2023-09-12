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
exports.createBulkTeacherController = exports.institutecreateTeacher = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const institute_1 = require("../../model/institute/institute");
const moment_1 = __importDefault(require("moment"));
const teacher_1 = require("../../model/teacher/teacher");
const institutecreateTeacher = (data, insId) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    let inscode = yield (0, institute_1.getInstituesById)(insId);
    if (!inscode) {
        return {
            code: 403,
            status: "error",
            message: "Invalid Institute Id"
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
        profileImg: null,
        country: data.country,
        state: data.state,
        city: data.city,
        address: data.address,
        pin: data.pin,
        instituteId: insId
    };
    const { code, status, message } = yield (0, teacher_1.createTeacherWithAddress)(datas);
    return { code, status, message };
});
exports.institutecreateTeacher = institutecreateTeacher;
const createBulkTeacherController = (data, instid) => __awaiter(void 0, void 0, void 0, function* () {
    var _c, _d;
    if (!data || data.length === 0) {
        return {
            code: 422,
            status: "error",
            message: "data not define"
        };
    }
    let inscode = yield (0, institute_1.getInstituesById)(instid);
    if (!inscode) {
        return {
            code: 403,
            status: "error",
            message: "Invalid Institute Id"
        };
    }
    let bulkData = [];
    let maintancepassword = ((_c = process === null || process === void 0 ? void 0 : process.env) === null || _c === void 0 ? void 0 : _c.MAINTANCE_PASSWORD) ? (_d = process === null || process === void 0 ? void 0 : process.env) === null || _d === void 0 ? void 0 : _d.MAINTANCE_PASSWORD : "12345678";
    let admissionId = 0;
    let prefix = `${inscode.message.code}FY${(0, moment_1.default)().format('YY')}-${(0, moment_1.default)().add(1, 'year').format('YY')}`;
    data.map((e) => __awaiter(void 0, void 0, void 0, function* () {
        bulkData.push({
            firstName: e.firstName,
            lastName: e.lastName,
            email: e.email,
            phone: e.phone.toString(),
            password: bcrypt_1.default.hashSync(maintancepassword, 10),
            dob: new Date(e.dob),
            gender: e.gender,
            fk_institute_id: instid,
        });
        admissionId++;
    }));
    const { code, status, message } = yield (0, teacher_1.createBulkTeacher)(bulkData);
    return { code, status, message };
});
exports.createBulkTeacherController = createBulkTeacherController;
