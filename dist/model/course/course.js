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
exports.InstituteCourseSeach = exports.deleteCourse = exports.editCourse = exports.getCourseById = exports.getAllCourse = exports.getActiveCourse = exports.updateCourseStatus = exports.createCourse = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const createCourse = (data, instituteId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const check = yield prisma.courses.count({
            where: {
                name: data.name,
            }
        });
        if (check != 0) {
            return { code: 422, status: "error", message: `${data.name} is already created` };
        }
        yield prisma.courses.create({
            data: {
                fk_institute_id: instituteId,
                name: data.name,
                amount: parseInt(data.amount),
                image: data.image,
                description: data.description,
                durantion: parseInt(data.durantion),
                status: true
            }
        });
        return { code: 200, status: "success", message: `${data.name} course created successfully` };
    }
    catch (e) {
        return { code: 500, status: 'error', message: e.message };
    }
});
exports.createCourse = createCourse;
const updateCourseStatus = (courseId, status) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield prisma.courses.update({
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
exports.updateCourseStatus = updateCourseStatus;
const getActiveCourse = (InstituteId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return {
            code: 200, status: "success", message: yield prisma.courses.findMany({
                where: {
                    status: true,
                    fk_institute_id: InstituteId
                }
            })
        };
    }
    catch (e) {
        return { code: 500, status: 'error', message: e.message };
    }
});
exports.getActiveCourse = getActiveCourse;
const getAllCourse = (page, insID) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const skip = (page - 1) * 10;
        let totalPage = yield prisma.courses.count({
            where: {
                fk_institute_id: insID
            }
        });
        let totalRow = totalPage;
        totalPage = Math.ceil(totalPage / 10);
        return {
            code: 200, status: "success", message: yield prisma.courses.findMany({
                where: {
                    fk_institute_id: insID
                },
                orderBy: {
                    updatedAt: "desc"
                }
            }),
            totalPage: totalPage,
            totalRow: totalRow
        };
    }
    catch (e) {
        return { code: 500, status: 'error', message: e.message };
    }
});
exports.getAllCourse = getAllCourse;
const getCourseById = (courseId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return {
            code: 200, status: "success", message: yield prisma.courses.findFirst({
                where: {
                    id: courseId,
                }
            })
        };
    }
    catch (e) {
        return { code: 500, status: 'error', message: e.message };
    }
});
exports.getCourseById = getCourseById;
const editCourse = (data, courseId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield prisma.courses.update({
            data: {
                name: data.name,
                amount: data.amount,
                image: data.image,
                description: data.description,
                durantion: data.durantion,
                status: data.status,
            },
            where: {
                id: courseId
            }
        });
        return { code: 200, status: "success", message: ` course updated successfully` };
    }
    catch (e) {
        return { code: 500, status: 'error', message: e.message };
    }
});
exports.editCourse = editCourse;
const deleteCourse = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield prisma.courses.delete({
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
exports.deleteCourse = deleteCourse;
const InstituteCourseSeach = (page, query, insID) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const skip = (page - 1) * 10;
        let totalPage = yield prisma.courses.count({
            where: {
                fk_institute_id: insID,
                OR: [
                    {
                        name: {
                            contains: query
                        }
                    },
                ],
            }
        });
        let totalRow = totalPage;
        totalPage = Math.ceil(totalPage / 10);
        return {
            code: 200, status: "success", message: yield prisma.courses.findMany({
                select: {
                    id: true,
                    name: true,
                    amount: true,
                    durantion: true,
                    image: true,
                    status: true,
                },
                skip: skip,
                take: 10,
                where: {
                    fk_institute_id: insID,
                    OR: [
                        {
                            name: {
                                contains: query
                            }
                        },
                    ],
                }
            }),
            totalPage: totalPage,
            totalRow: totalRow
        };
    }
    catch (e) {
        return { code: 500, status: 'error', message: e.message };
    }
});
exports.InstituteCourseSeach = InstituteCourseSeach;
