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
exports.deleteCourseLink = exports.createCourseLink = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const createCourseLink = (fk_course_id, fk_sub_course_id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield prisma.courselinks.create({
            data: {
                fk_course_id: fk_course_id,
                fk_sub_course_id: fk_sub_course_id
            }
        });
        return { code: 200, status: "success", message: `course linked successfully` };
    }
    catch (e) {
        return { code: 500, status: 'error', message: e.message };
    }
});
exports.createCourseLink = createCourseLink;
const deleteCourseLink = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield prisma.courselinks.delete({
            where: {
                id: id,
            }
        });
        return { code: 200, status: "success", message: `link deleted successfully` };
    }
    catch (e) {
        return { code: 500, status: 'error', message: e.message };
    }
});
exports.deleteCourseLink = deleteCourseLink;
