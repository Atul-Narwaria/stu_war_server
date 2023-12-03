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
exports.createBatchStudentAsignment = exports.getAssignmentListStudentSearch = exports.getAssignmentListStudent = void 0;
const client_1 = require("@prisma/client");
const moment_1 = __importDefault(require("moment"));
const prisma = new client_1.PrismaClient();
const getAssignmentListStudent = (batchid, page, userid) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const skip = (page - 1) * 10;
        let totalPage = yield prisma.batchAssignments.count({
            where: {
                fk_batch_id: batchid,
            },
        });
        let totalRow = totalPage;
        totalPage = Math.ceil(totalPage / 10);
        const get = yield prisma.batchAssignments.findMany({
            select: {
                id: true,
                name: true,
                media: true,
                contents: true,
                submission_date: true,
                assignment_date: true,
                batchStudentsAssignment: {
                    select: {
                        id: true,
                        media: true,
                        contents: true,
                        submission_date: true,
                    },
                    where: {
                        fk_student_id: userid,
                    },
                },
            },
            skip: skip,
            take: 10,
            where: {
                fk_batch_id: batchid,
            },
        });
        return {
            code: 200,
            status: "success",
            message: get,
            totalPage: totalPage,
            totalRow: totalRow,
        };
    }
    catch (e) {
        let split = e.message.split(".");
        split = split.slice(-2);
        return { code: 500, status: "error", message: e.message };
    }
});
exports.getAssignmentListStudent = getAssignmentListStudent;
const getAssignmentListStudentSearch = (batchid, page, userid, query) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const skip = (page - 1) * 10;
        let totalPage = yield prisma.batchAssignments.count({
            where: {
                fk_batch_id: batchid,
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
        const get = yield prisma.batchAssignments.findMany({
            select: {
                id: true,
                name: true,
                media: true,
                contents: true,
                submission_date: true,
                assignment_date: true,
                batchStudentsAssignment: {
                    select: {
                        id: true,
                        media: true,
                        contents: true,
                        submission_date: true,
                    },
                    where: {
                        fk_student_id: userid,
                    },
                },
            },
            skip: skip,
            take: 10,
            where: {
                fk_batch_id: batchid,
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
            message: get,
            totalPage: totalPage,
            totalRow: totalRow,
        };
    }
    catch (e) {
        let split = e.message.split(".");
        split = split.slice(-2);
        return { code: 500, status: "error", message: e.message };
    }
});
exports.getAssignmentListStudentSearch = getAssignmentListStudentSearch;
const createBatchStudentAsignment = (fk_student_id, contents, media, fk_batch_assignment_id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield prisma.batchStudentsAssignment.create({
            data: {
                fk_student_id,
                contents,
                submission_date: new Date((0, moment_1.default)().format("YYYY-MM-DD")),
                media,
                fk_batch_assignment_id,
            },
        });
        return {
            code: 200,
            status: "success",
            message: "assignment uploaded successfully",
        };
    }
    catch (e) {
        let split = e.message.split(".");
        split = split.slice(-2);
        return { code: 500, status: "error", message: e.message };
    }
});
exports.createBatchStudentAsignment = createBatchStudentAsignment;
