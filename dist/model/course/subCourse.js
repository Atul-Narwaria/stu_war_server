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
exports.deleteSubCourse = exports.editSubCourse = exports.getSubCourseById = exports.getAllSubCourse = exports.getActiveSubCourse = exports.updateSubCourseStatus = exports.createSubCourse = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const createSubCourse = (data) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const check = yield prisma.subCourses.count({
            where: {
                fk_course_id: data.courseId,
                name: data.name,
            }
        });
        if (check != 0) {
            return { code: 422, status: "success", message: `${data.name} is already created` };
        }
        yield prisma.subCourses.create({
            data: {
                fk_course_id: data.courseId,
                name: data.name,
                amount: parseInt(data.amount),
                image: data.image,
                description: data.description,
                duration: parseInt(data.durantion),
                status: true
            }
        });
        return { code: 200, status: "success", message: `${data.name}   course created successfully` };
    }
    catch (e) {
        return { code: 500, status: 'error', message: e.message };
    }
});
exports.createSubCourse = createSubCourse;
const updateSubCourseStatus = (courseId, status) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield prisma.subCourses.update({
            data: {
                status: status
            },
            where: {
                id: courseId,
            }
        });
        return { code: 200, status: "success", message: ` course updated successfully` };
    }
    catch (e) {
        return { code: 500, status: 'error', message: e.message };
    }
});
exports.updateSubCourseStatus = updateSubCourseStatus;
const getActiveSubCourse = (CourseId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return {
            code: 200, status: "success", message: yield prisma.subCourses.findMany({
                where: {
                    status: true,
                    fk_course_id: CourseId
                }
            })
        };
    }
    catch (e) {
        return { code: 500, status: 'error', message: e.message };
    }
});
exports.getActiveSubCourse = getActiveSubCourse;
const getAllSubCourse = (courseId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return {
            code: 200, status: "success", message: yield prisma.subCourses.findMany({
                where: {
                    fk_course_id: courseId
                }
            })
        };
    }
    catch (e) {
        return { code: 500, status: 'error', message: e.message };
    }
});
exports.getAllSubCourse = getAllSubCourse;
const getSubCourseById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return {
            code: 200, status: "success", message: yield prisma.subCourses.findMany({
                where: {
                    id: id
                }
            })
        };
    }
    catch (e) {
        return { code: 500, status: 'error', message: e.message };
    }
});
exports.getSubCourseById = getSubCourseById;
const editSubCourse = (data, subCourseId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield prisma.subCourses.update({
            data: {
                fk_course_id: data.courseId,
                name: data.name,
                amount: data.amount,
                image: data.image,
                description: data.description,
                duration: data.durantion,
                status: data.status,
            },
            where: {
                id: subCourseId
            }
        });
        return { code: 200, status: "success", message: ` course updated successfully` };
    }
    catch (e) {
        return { code: 500, status: 'error', message: e.message };
    }
});
exports.editSubCourse = editSubCourse;
const deleteSubCourse = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield prisma.subCourses.delete({
            where: {
                id: id,
            }
        });
        return { code: 200, status: "success", message: `Course deleted successfully` };
    }
    catch (e) {
        return { code: 200, status: 'error', message: e.message };
    }
});
exports.deleteSubCourse = deleteSubCourse;
