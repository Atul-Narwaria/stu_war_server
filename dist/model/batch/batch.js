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
exports.getAllBatchWithliveClass = exports.getBatchById = exports.InstituteBatchSeach = exports.editBatch = exports.deleteBatch = exports.getAllbatch = exports.getActiveBatch = exports.updateBatchStatus = exports.createBatch = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const createBatch = (data, fk_institute_id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield prisma.batchMaster.create({
            data: {
                fk_sub_course_id: data.fk_course_id,
                fk_institute_id: fk_institute_id,
                name: data.name,
                start_time: data.start_time,
                end_time: data.end_time,
                weekdays: data.weekdays,
                status: true,
            },
        });
        return {
            code: 200,
            status: "success",
            message: `${data.name} course created successfully`,
        };
    }
    catch (e) {
        let split = e.message.split(".");
        split = split.slice(-2);
        return { code: 500, status: "error", message: split[0] };
    }
});
exports.createBatch = createBatch;
const updateBatchStatus = (id, status) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield prisma.batchMaster.update({
            data: {
                status: status,
            },
            where: {
                id: id,
            },
        });
        return {
            code: 200,
            status: "success",
            message: ` batch updated successfully`,
        };
    }
    catch (e) {
        let split = e.message.split(".");
        split = split.slice(-2);
        return { code: 500, status: "error", message: split[0] };
    }
});
exports.updateBatchStatus = updateBatchStatus;
const getActiveBatch = (instituteId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return {
            code: 200,
            status: "success",
            message: yield prisma.batchMaster.findMany({
                where: {
                    status: true,
                    fk_institute_id: instituteId,
                },
            }),
        };
    }
    catch (e) {
        let split = e.message.split(".");
        split = split.slice(-2);
        return { code: 500, status: "error", message: split[0] };
    }
});
exports.getActiveBatch = getActiveBatch;
const getAllbatch = (page, instituteId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const skip = (page - 1) * 10;
        let totalPage = yield prisma.batchMaster.count({
            where: {
                fk_institute_id: instituteId,
            },
        });
        let totalRow = totalPage;
        totalPage = Math.ceil(totalPage / 10);
        return {
            code: 200,
            status: "success",
            message: yield prisma.batchMaster.findMany({
                select: {
                    id: true,
                    name: true,
                    start_time: true,
                    end_time: true,
                    haveLiveClass: true,
                    weekdays: true,
                    status: true,
                    subCourses: {
                        select: {
                            id: true,
                            name: true,
                        },
                    },
                },
                where: {
                    fk_institute_id: instituteId,
                },
                skip: skip,
                take: 10,
                orderBy: {
                    updatedAt: "desc",
                },
            }),
            totalPage: totalPage,
            totalRow: totalRow,
        };
    }
    catch (e) {
        let split = e.message.split(".");
        split = split.slice(-2);
        return { code: 500, status: "error", message: split[0] };
    }
});
exports.getAllbatch = getAllbatch;
const deleteBatch = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield prisma.batchMaster.delete({
            where: {
                id: id,
            },
        });
        return {
            code: 200,
            status: "success",
            message: `batch deleted successfully`,
        };
    }
    catch (e) {
        return { code: 200, status: "error", message: e.message };
    }
});
exports.deleteBatch = deleteBatch;
const editBatch = (data, batch_id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield prisma.batchMaster.update({
            data: {
                fk_sub_course_id: data.fk_course_id,
                name: data.name,
                start_time: data.start_time,
                end_time: data.end_time,
                weekdays: data.weekdays,
            },
            where: {
                id: batch_id,
            },
        });
        return {
            code: 200,
            status: "success",
            message: ` Batch updated successfully`,
        };
    }
    catch (e) {
        let split = e.message.split(".");
        split = split.slice(-2);
        return { code: 500, status: "error", message: split[0] };
    }
});
exports.editBatch = editBatch;
const InstituteBatchSeach = (page, query, insID) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const skip = (page - 1) * 10;
        let totalPage = yield prisma.batchMaster.count({
            where: {
                fk_institute_id: insID,
                OR: [
                    {
                        name: {
                            contains: query,
                        },
                    },
                ],
            },
        });
        let totalRow = totalPage;
        totalPage = Math.ceil(totalPage / 10);
        return {
            code: 200,
            status: "success",
            message: yield prisma.batchMaster.findMany({
                select: {
                    id: true,
                    name: true,
                    start_time: true,
                    end_time: true,
                    haveLiveClass: true,
                    status: true,
                    weekdays: true,
                    subCourses: {
                        select: {
                            id: true,
                            name: true,
                        },
                    },
                },
                skip: skip,
                take: 10,
                where: {
                    fk_institute_id: insID,
                    OR: [
                        {
                            name: {
                                contains: query,
                            },
                        },
                    ],
                },
            }),
            totalPage: totalPage,
            totalRow: totalRow,
        };
    }
    catch (e) {
        let split = e.message.split(".");
        split = split.slice(-2);
        return { code: 500, status: "error", message: split[0] };
    }
});
exports.InstituteBatchSeach = InstituteBatchSeach;
const getBatchById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return {
            code: 200,
            status: "success",
            message: yield prisma.batchMaster.findFirst({
                where: {
                    id: id,
                },
            }),
        };
    }
    catch (e) {
        let split = e.message.split(".");
        split = split.slice(-2);
        return { code: 500, status: "error", message: split[0] };
    }
});
exports.getBatchById = getBatchById;
const getAllBatchWithliveClass = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let get = yield prisma.batchMaster.findMany({
            select: {
                id: true,
                name: true,
                start_time: true,
                haveLiveClass: true,
                end_time: true,
                weekdays: true,
            },
            where: {
                haveLiveClass: true,
                status: true,
            },
        });
        return {
            code: 200,
            status: "success",
            message: get,
        };
    }
    catch (e) {
        let split = e.message.split(".");
        split = split.slice(-2);
        return { code: 500, status: "error", message: split[0] };
    }
});
exports.getAllBatchWithliveClass = getAllBatchWithliveClass;
