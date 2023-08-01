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
exports.isAdminPhoneUnique = exports.isAdminEmailUnique = exports.CheckAdminExistance = exports.getAdmin = exports.CreateAdmin = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const CreateAdmin = (name, email, phone, password) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let checkemail = yield (0, exports.isAdminEmailUnique)(email);
        if (checkemail == true) {
            return { code: 409, status: "error", message: "email already exists" };
        }
        let checkphone = yield (0, exports.isAdminPhoneUnique)(phone);
        if (checkphone == true) {
            return { code: 409, status: "error", message: "phone already exists" };
        }
        yield prisma.admin.create({
            data: {
                name: name,
                email: email,
                phone: phone,
                password: password,
                status: true
            }
        });
        return { code: 200, status: "success", message: "admin crated successfully" };
    }
    catch (e) {
        console.log(e);
        return { code: 500, status: "error", message: e.message };
    }
});
exports.CreateAdmin = CreateAdmin;
const getAdmin = (email) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const get = yield prisma.admin.findFirst({
            select: {
                id: true,
                name: true,
                email: true,
                password: true,
                phone: true
            },
            where: {
                email: email
            }
        });
        if (!get) {
            return { code: 500, status: "error", message: "no user found" };
        }
        return { code: 200, status: "success", message: get };
    }
    catch (e) {
        return { code: 500, status: "error", message: e.message };
    }
});
exports.getAdmin = getAdmin;
const CheckAdminExistance = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return yield prisma.admin.count({
            where: { id: id }
        });
    }
    catch (e) {
        return { code: 500, status: "error", message: e.message };
    }
});
exports.CheckAdminExistance = CheckAdminExistance;
const isAdminEmailUnique = (email) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let count = yield prisma.admin.count({
            where: { email: email }
        });
        if (count > 1) {
            return false;
        }
        return true;
    }
    catch (e) {
        return { code: 500, status: "error", message: e.message };
    }
});
exports.isAdminEmailUnique = isAdminEmailUnique;
const isAdminPhoneUnique = (phone) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let count = yield prisma.admin.count({
            where: { phone: phone }
        });
        if (count > 1) {
            return false;
        }
        return true;
    }
    catch (e) {
        return { code: 500, status: "error", message: e.message };
    }
});
exports.isAdminPhoneUnique = isAdminPhoneUnique;
