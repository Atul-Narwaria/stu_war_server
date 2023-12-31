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
exports.InstituteSubCourseSeach = exports.deleteSubCourse = exports.editSubCourse = exports.getSubCourseById = exports.getAllSubCourseWithCourse = exports.getAllSubCourse = exports.getActiveSubCourse = exports.updateSubCourseStatus = exports.createSubCourse = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const createSubCourse = (data, fk_institute_id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const check = yield prisma.subCourses.findFirst({
            where: {
                name: data.name,
            }
        });
        if (check) {
            return { code: 422, status: "error", message: `${data.name} is already created` };
        }
        yield prisma.subCourses.create({
            data: {
                fk_institute_id: fk_institute_id,
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
        let split = e.message.split(".");
        split = split.slice(-2);
        return { code: 500, status: "error", message: split[0] };
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
        let split = e.message.split(".");
        split = split.slice(-2);
        return { code: 500, status: "error", message: split[0] };
    }
});
exports.updateSubCourseStatus = updateSubCourseStatus;
const getActiveSubCourse = (fk_institute_id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return {
            code: 200, status: "success", message: yield prisma.subCourses.findMany({
                where: {
                    status: true,
                    fk_institute_id: fk_institute_id
                }
            })
        };
    }
    catch (e) {
        let split = e.message.split(".");
        split = split.slice(-2);
        return { code: 500, status: "error", message: split[0] };
    }
});
exports.getActiveSubCourse = getActiveSubCourse;
const getAllSubCourse = (page, fk_institute_id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const skip = (page - 1) * 10;
        let totalPage = yield prisma.subCourses.count({
            where: {
                fk_institute_id: fk_institute_id
            }
        });
        let totalRow = totalPage;
        totalPage = Math.ceil(totalPage / 10);
        return {
            code: 200, status: "success", message: yield prisma.subCourses.findMany({
                where: {
                    fk_institute_id: fk_institute_id
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
        let split = e.message.split(".");
        split = split.slice(-2);
        return { code: 500, status: "error", message: split[0] };
    }
});
exports.getAllSubCourse = getAllSubCourse;
const getAllSubCourseWithCourse = (page, fk_institute_id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const skip = (page - 1) * 10;
        let totalPage = yield prisma.subCourses.count({
            where: {
                fk_institute_id: fk_institute_id
            }
        });
        let totalRow = totalPage;
        totalPage = Math.ceil(totalPage / 10);
        return {
            code: 200, status: "success", message: yield prisma.subCourses.findMany({
                select: {
                    id: true,
                    name: true,
                    duration: true,
                    amount: true,
                    status: true,
                },
                where: {
                    fk_institute_id: fk_institute_id
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
        let split = e.message.split(".");
        split = split.slice(-2);
        return { code: 500, status: "error", message: split[0] };
    }
});
exports.getAllSubCourseWithCourse = getAllSubCourseWithCourse;
const getSubCourseById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return {
            code: 200, status: "success", message: yield prisma.subCourses.findFirst({
                where: {
                    id: id
                }
            })
        };
    }
    catch (e) {
        let split = e.message.split(".");
        split = split.slice(-2);
        return { code: 500, status: "error", message: split[0] };
    }
});
exports.getSubCourseById = getSubCourseById;
const editSubCourse = (data, subCourseId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield prisma.subCourses.update({
            data: {
                name: data.name,
                amount: parseInt(data.amount),
                image: data.image,
                description: data.description,
                duration: parseInt(data.durantion),
                status: true
            },
            where: {
                id: subCourseId
            }
        });
        return { code: 200, status: "success", message: ` course updated successfully` };
    }
    catch (e) {
        let split = e.message.split(".");
        split = split.slice(-2);
        return { code: 500, status: "error", message: split[0] };
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
const InstituteSubCourseSeach = (page, query, insID) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const skip = (page - 1) * 10;
        let totalPage = yield prisma.subCourses.count({
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
            code: 200, status: "success", message: yield prisma.subCourses.findMany({
                select: {
                    id: true,
                    name: true,
                    amount: true,
                    duration: true,
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
        let split = e.message.split(".");
        split = split.slice(-2);
        return { code: 500, status: "error", message: split[0] };
    }
});
exports.InstituteSubCourseSeach = InstituteSubCourseSeach;
