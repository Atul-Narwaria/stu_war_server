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
exports.StudentheckTodayRemainingBatch = exports.getBatchDetailByStudent = exports.BatchStudentsSearch = exports.getBatchStudents = exports.deleteBatchLink = exports.createBatchBulkLink = exports.createBatchLink = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const createBatchLink = (data, fk_institute_id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield prisma.batchLink.create({
            data: {
                fk_institute_id: fk_institute_id,
                fk_student_id: data.fk_student_id,
                fk_bacth_id: data.fk_batch_id,
                status: true,
            },
        });
        return {
            code: 200,
            status: "success",
            message: ` student linked successfully`,
        };
    }
    catch (e) {
        let split = e.message.split(".");
        split = split.slice(-2);
        return { code: 500, status: "error", message: split[0] };
    }
});
exports.createBatchLink = createBatchLink;
const createBatchBulkLink = (datas) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield prisma.batchLink.createMany({
            data: datas,
            skipDuplicates: true,
        });
        return {
            code: 200,
            status: "success",
            message: ` students linked successfully`,
        };
    }
    catch (e) {
        let split = e.message.split(".");
        split = split.slice(-2);
        return { code: 500, status: "error", message: split[0] };
    }
});
exports.createBatchBulkLink = createBatchBulkLink;
const deleteBatchLink = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield prisma.batchLink.delete({
            where: {
                id: id,
            },
        });
        return {
            code: 200,
            status: "success",
            message: `students linked deleted successfully`,
        };
    }
    catch (e) {
        let split = e.message.split(".");
        split = split.slice(-2);
        return { code: 500, status: "error", message: split[0] };
    }
});
exports.deleteBatchLink = deleteBatchLink;
const getBatchStudents = (page, batchId, insID) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const skip = (page - 1) * 10;
        let totalPage = yield prisma.batchLink.count({
            where: {
                fk_institute_id: insID,
                fk_bacth_id: batchId,
            },
        });
        let totalRow = totalPage;
        totalPage = Math.ceil(totalPage / 10);
        return {
            code: 200,
            status: "success",
            message: yield prisma.batchLink.findMany({
                select: {
                    id: true,
                    fk_student_id: true,
                    fk_bacth_id: true,
                    status: true,
                    stundetmaster: {
                        select: {
                            id: true,
                            firstName: true,
                            lastName: true,
                            email: true,
                            phone: true,
                        },
                    },
                },
                where: {
                    fk_institute_id: insID,
                    fk_bacth_id: batchId,
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
exports.getBatchStudents = getBatchStudents;
const BatchStudentsSearch = (page, query, batchId, insID) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const skip = (page - 1) * 10;
        let totalPage = yield prisma.batchLink.count({
            where: {
                fk_institute_id: insID,
                fk_bacth_id: batchId,
                OR: [
                    {
                        stundetmaster: {
                            OR: [
                                {
                                    firstName: {
                                        contains: query,
                                    },
                                },
                                {
                                    lastName: {
                                        contains: query,
                                    },
                                },
                                {
                                    email: {
                                        contains: query,
                                    },
                                },
                                {
                                    phone: {
                                        contains: query,
                                    },
                                },
                            ],
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
            message: yield prisma.batchLink.findMany({
                select: {
                    id: true,
                    fk_student_id: true,
                    fk_bacth_id: true,
                    status: true,
                    stundetmaster: {
                        select: {
                            id: true,
                            firstName: true,
                            lastName: true,
                            email: true,
                            phone: true,
                        },
                    },
                },
                skip: skip,
                take: 10,
                where: {
                    fk_institute_id: insID,
                    fk_bacth_id: batchId,
                    OR: [
                        {
                            stundetmaster: {
                                OR: [
                                    {
                                        firstName: {
                                            contains: query,
                                        },
                                    },
                                    {
                                        lastName: {
                                            contains: query,
                                        },
                                    },
                                    {
                                        email: {
                                            contains: query,
                                        },
                                    },
                                    {
                                        phone: {
                                            contains: query,
                                        },
                                    },
                                ],
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
exports.BatchStudentsSearch = BatchStudentsSearch;
const getBatchDetailByStudent = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const get = yield prisma.batchLink.findMany({
            select: {
                id: true,
                bactch: {
                    select: {
                        name: true,
                        end_time: true,
                        start_time: true,
                        weekdays: true,
                    },
                },
            },
            where: {
                fk_student_id: id,
            },
        });
    }
    catch (e) {
        let split = e.message.split(".");
        split = split.slice(-2);
        return { code: 500, status: "error", message: split[0] };
    }
});
exports.getBatchDetailByStudent = getBatchDetailByStudent;
const StudentheckTodayRemainingBatch = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let check = yield prisma.batchLink.findMany({
            select: {
                id: true,
                bactch: {
                    select: {
                        id: true,
                        name: true,
                        start_time: true,
                        end_time: true,
                        weekdays: true,
                        haveLiveClass: true,
                        batchLiveClass: {
                            select: {
                                id: true,
                                meeting_url: true,
                                meeting_number: true,
                                password: true,
                            },
                        },
                        subCourses: {
                            select: {
                                id: true,
                                name: true,
                            },
                        },
                    },
                },
            },
            where: {
                fk_student_id: id,
            },
        });
        return { code: 200, status: "success", message: check };
    }
    catch (e) {
        let split = e.message.split(".");
        split = split.slice(-2);
        return { code: 500, status: "error", message: split[0] };
    }
});
exports.StudentheckTodayRemainingBatch = StudentheckTodayRemainingBatch;
