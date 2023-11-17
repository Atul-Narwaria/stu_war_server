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
exports.getActiveStudentWithCourse = exports.deleteStudentCourse = exports.getSubCourseStudents = exports.getCourseStudents = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const getCourseStudents = (courseId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const get = yield prisma.studentCourse.findMany({
            select: {
                id: true,
                stundetmaster: {
                    select: {
                        id: true,
                        firstName: true,
                        lastName: true,
                        email: true,
                        phone: true
                    }
                },
            },
            orderBy: {
                createAt: "desc"
            },
            where: {
                fk_course_id: courseId
            }
        });
        return { code: 200, status: "success", message: get };
    }
    catch (e) {
        let split = e.message.split(".");
        split = split.slice(-2);
        return { code: 500, status: "error", message: split[0] };
    }
});
exports.getCourseStudents = getCourseStudents;
const getSubCourseStudents = (courseId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const get = yield prisma.studentCourse.findMany({
            select: {
                id: true,
                stundetmaster: {
                    select: {
                        id: true,
                        firstName: true,
                        lastName: true,
                        email: true,
                        phone: true
                    }
                },
            },
            orderBy: {
                createAt: "desc"
            },
            where: {
                fk_sub_course_id: courseId
            }
        });
        return { code: 200, status: "success", message: get };
    }
    catch (e) {
        let split = e.message.split(".");
        split = split.slice(-2);
        return { code: 500, status: "error", message: split[0] };
    }
});
exports.getSubCourseStudents = getSubCourseStudents;
const deleteStudentCourse = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield prisma.studentCourse.delete({
            where: {
                id: id
            }
        });
        return { code: 200, status: "success", message: "sub-course  deleted successfully" };
    }
    catch (e) {
        let split = e.message.split(".");
        split = split.slice(-2);
        return { code: 500, status: "error", message: split[0] };
    }
});
exports.deleteStudentCourse = deleteStudentCourse;
const getActiveStudentWithCourse = (page, insID) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const skip = (page - 1) * 10;
        let totalPage = yield prisma.studentMaster.count({
            where: {
                fk_institute_id: insID
            }
        });
        let totalRow = totalPage;
        totalPage = Math.ceil(totalPage / 10);
        const get = yield prisma.studentMaster.findMany({
            select: {
                id: true,
                firstName: true,
                lastName: true,
                email: true,
                phone: true,
                StudentCourse: {
                    select: {
                        subCourses: {
                            select: {
                                id: true,
                                name: true
                            }
                        },
                        courses: {
                            select: {
                                id: true,
                                name: true
                            }
                        }
                    }
                }
            },
            orderBy: {
                createAt: "desc",
            },
            skip: skip,
            take: 10,
            where: {
                fk_institute_id: insID,
                status: true
            },
        });
        return { code: 200, status: "success", message: get, totalPage: totalPage,
            totalRow: totalRow };
    }
    catch (e) {
        let split = e.message.split(".");
        split = split.slice(-2);
        return { code: 500, status: "error", message: split[0] };
    }
});
exports.getActiveStudentWithCourse = getActiveStudentWithCourse;
