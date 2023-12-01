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
exports.getBatchAllStudent = exports.getAllTeacherBatches = exports.getAllStudentCount = exports.checkTodayRemainingBatch = exports.getTotalteacherBatchCount = exports.getTeacherFromBatch = exports.deleteBatchTeacherLink = exports.createBatchTeacherLink = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const createBatchTeacherLink = (fkTeacherId, fkBatchId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let check = yield prisma.batchTeacherLink.findFirst({
            where: {
                fk_batch_id: fkBatchId,
            },
        });
        if (!check) {
            yield prisma.batchTeacherLink.create({
                data: {
                    fk_batch_id: fkBatchId,
                    fk_teacher_id: fkTeacherId,
                },
            });
        }
        else {
            yield prisma.batchTeacherLink.updateMany({
                data: {
                    fk_teacher_id: fkTeacherId,
                },
                where: {
                    fk_batch_id: fkBatchId,
                },
            });
        }
        return {
            code: 200,
            status: "success",
            message: `teacher linked  successfully`,
        };
    }
    catch (e) {
        let split = e.message.split(".");
        split = split.slice(-2);
        return { code: 500, status: "error", message: split[0] };
    }
});
exports.createBatchTeacherLink = createBatchTeacherLink;
const deleteBatchTeacherLink = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield prisma.batchTeacherLink.delete({
            where: {
                id: id,
            },
        });
        return {
            code: 200,
            status: "success",
            message: `teacher linked deleted  successfully`,
        };
    }
    catch (e) {
        let split = e.message.split(".");
        split = split.slice(-2);
        return { code: 500, status: "error", message: split[0] };
    }
});
exports.deleteBatchTeacherLink = deleteBatchTeacherLink;
const getTeacherFromBatch = (batchId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return {
            code: 200,
            status: "success",
            message: yield prisma.batchTeacherLink.findMany({
                select: {
                    id: true,
                    fk_teacher_id: true,
                    teacherId: {
                        select: {
                            firstName: true,
                            lastName: true,
                        },
                    },
                },
                where: {
                    fk_batch_id: batchId,
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
exports.getTeacherFromBatch = getTeacherFromBatch;
const getTotalteacherBatchCount = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let check = yield prisma.batchTeacherLink.count({
            where: {
                fk_teacher_id: id,
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
exports.getTotalteacherBatchCount = getTotalteacherBatchCount;
const checkTodayRemainingBatch = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let check = yield prisma.batchTeacherLink.findMany({
            select: {
                id: true,
                batchId: {
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
                fk_teacher_id: id,
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
exports.checkTodayRemainingBatch = checkTodayRemainingBatch;
const getAllStudentCount = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // const
        const get = yield prisma.batchTeacherLink.findMany({
            select: {
                id: true,
                batchId: {
                    select: {
                        batchLink: {
                            select: {
                                stundetmaster: {
                                    select: {
                                        id: true,
                                    },
                                },
                            },
                        },
                    },
                },
            },
            where: {
                fk_teacher_id: id,
            },
        });
        let count = 0;
        if (get.length <= 0) {
            return { code: 200, status: "success", message: 0 };
        }
        get.map((e) => {
            var _a;
            if ((_a = e === null || e === void 0 ? void 0 : e.batchId) === null || _a === void 0 ? void 0 : _a.batchLink) {
                let batchLinkcount = e.batchId.batchLink.length;
                count = count + batchLinkcount;
            }
        });
        return { code: 200, status: "success", message: count };
    }
    catch (e) {
        let split = e.message.split(".");
        split = split.slice(-2);
        return { code: 500, status: "error", message: split[0] };
    }
});
exports.getAllStudentCount = getAllStudentCount;
const getAllTeacherBatches = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const get = yield prisma.batchTeacherLink.findMany({
            select: {
                id: true,
                batchId: {
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
                fk_teacher_id: id,
            },
        });
        return { code: 200, status: "success", message: get };
    }
    catch (e) {
        let split = e.message.split(".");
        split = split.slice(-2);
        return { code: 500, status: "error", message: split[0] };
    }
});
exports.getAllTeacherBatches = getAllTeacherBatches;
const getBatchAllStudent = (id, batchid) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // const
        const get = yield prisma.batchTeacherLink.findMany({
            select: {
                id: true,
                batchId: {
                    select: {
                        batchLink: {
                            select: {
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
                        },
                    },
                },
            },
            where: {
                fk_teacher_id: id,
                fk_batch_id: batchid,
            },
        });
        return { code: 200, status: "success", message: get };
    }
    catch (e) {
        let split = e.message.split(".");
        split = split.slice(-2);
        return { code: 500, status: "error", message: split[0] };
    }
});
exports.getBatchAllStudent = getBatchAllStudent;
