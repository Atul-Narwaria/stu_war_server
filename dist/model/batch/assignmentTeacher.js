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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getBatchAssignmentsCount = exports.getBatchAssignmentsearch = exports.getBatchAssignments = exports.deletebatchAssignment = exports.createBatchAssignment = void 0;
const client_1 = require("@prisma/client");
const moment_1 = __importDefault(require("moment"));
const prisma = new client_1.PrismaClient();
const createBatchAssignment = (name, fk_teacher_id, fk_batch_id, contents, media, submission_date) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield prisma.batchAssignments.create({
            data: {
                name,
                fk_batch_id,
                fk_teacher_id,
                contents,
                media,
                submission_date: new Date(submission_date),
                assignment_date: new Date((0, moment_1.default)().format("YYYY-MM-DD")),
            },
        });
        return {
            code: 200,
            status: "success",
            message: ` assignemnt created successfully`,
        };
    }
    catch (e) {
        let split = e.message.split(".");
        split = split.slice(-2);
        return { code: 500, status: "error", message: e.message };
    }
});
exports.createBatchAssignment = createBatchAssignment;
const deletebatchAssignment = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield prisma.batchAssignments.delete({
            where: {
                id: id,
            },
        });
        return {
            code: 200,
            status: "success",
            message: `assignment deleted successfully`,
        };
    }
    catch (e) {
        let split = e.message.split(".");
        split = split.slice(-2);
        return { code: 500, status: "error", message: split[0] };
    }
});
exports.deletebatchAssignment = deletebatchAssignment;
const getBatchAssignments = (fk_batch_id, fk_teacher_id, page) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const skip = (page - 1) * 10;
        let totalPage = yield prisma.batchAssignments.count({
            where: {
                fk_batch_id,
                fk_teacher_id,
            },
        });
        let totalRow = totalPage;
        totalPage = Math.ceil(totalPage / 10);
        let data = yield prisma.batchAssignments.findMany({
            select: {
                id: true,
                contents: true,
                submission_date: true,
                assignment_date: true,
                media: true,
                name: true,
                batchStudentsAssignment: {
                    select: {
                        id: true,
                        fk_student_id: true,
                    },
                },
                batchMaster: {
                    select: {
                        batchLink: {
                            select: {
                                id: true,
                            },
                        },
                    },
                },
            },
            skip: skip,
            take: 10,
            orderBy: {
                createAt: "desc",
            },
            where: {
                fk_batch_id,
                fk_teacher_id,
            },
        });
        return {
            code: 200,
            status: "success",
            message: data,
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
exports.getBatchAssignments = getBatchAssignments;
const getBatchAssignmentsearch = (fk_batch_id, fk_teacher_id, page, query) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const skip = (page - 1) * 10;
        let totalPage = yield prisma.batchAssignments.count({
            where: {
                fk_batch_id,
                fk_teacher_id,
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
        let data = yield prisma.batchAssignments.findMany({
            select: {
                id: true,
                contents: true,
                submission_date: true,
                assignment_date: true,
                media: true,
                name: true,
                batchStudentsAssignment: {
                    select: {
                        id: true,
                        fk_student_id: true,
                    },
                },
                batchMaster: {
                    select: {
                        batchLink: {
                            select: {
                                id: true,
                            },
                        },
                    },
                },
            },
            skip: skip,
            take: 10,
            orderBy: {
                createAt: "desc",
            },
            where: {
                fk_batch_id,
                fk_teacher_id,
                OR: [
                    {
                        name: {
                            contains: query,
                        },
                    },
                ],
            },
        });
        return {
            code: 200,
            status: "success",
            message: data,
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
exports.getBatchAssignmentsearch = getBatchAssignmentsearch;
const getBatchAssignmentsCount = (fk_batch_id, fk_teacher_id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let totalPage = yield prisma.batchAssignments.count({
            where: {
                fk_batch_id,
                fk_teacher_id,
            },
        });
        return {
            code: 200,
            status: "success",
            message: totalPage,
        };
    }
    catch (e) {
        let split = e.message.split(".");
        split = split.slice(-2);
        return { code: 500, status: "error", message: split[0] };
    }
});
exports.getBatchAssignmentsCount = getBatchAssignmentsCount;
