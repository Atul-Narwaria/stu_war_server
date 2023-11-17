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
exports.getStudentCourses = exports.createStudentCourse = exports.deleteCourseLink = exports.createCourseLink = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const createCourseLink = (data) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield prisma.courselinks.createMany({
            data: data,
            skipDuplicates: true
        });
        return { code: 200, status: "success", message: `course linked successfully` };
    }
    catch (e) {
        let split = e.message.split(".");
        split = split.slice(-2);
        return { code: 500, status: "error", message: split[0] };
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
        let split = e.message.split(".");
        split = split.slice(-2);
        return { code: 500, status: "error", message: split[0] };
    }
});
exports.deleteCourseLink = deleteCourseLink;
const createStudentCourse = (data) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield prisma.studentCourse.createMany({
            data: data,
        });
        return { code: 200, status: "success", message: "students courses created successfully" };
    }
    catch (e) {
        let split = e.message.split(".");
        split = split.slice(-2);
        return { code: 500, status: "error", message: split[0] };
    }
});
exports.createStudentCourse = createStudentCourse;
const getStudentCourses = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const get = yield prisma.studentCourse.findMany({
            select: {
                id: true,
                courses: {
                    select: {
                        id: true,
                        name: true,
                        amount: true,
                        durantion: true,
                        image: true
                    }
                },
                subCourses: {
                    select: {
                        id: true,
                        name: true,
                        amount: true,
                        duration: true,
                        image: true
                    }
                }
            },
            where: {
                fk_stundet_id: id,
            }
        });
    }
    catch (e) {
        let split = e.message.split(".");
        split = split.slice(-2);
        return { code: 500, status: "error", message: split[0] };
    }
});
exports.getStudentCourses = getStudentCourses;
