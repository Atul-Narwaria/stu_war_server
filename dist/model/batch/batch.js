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
exports.deleteBatch = exports.getAllbatch = exports.getActiveBatch = exports.updateBatchStatus = exports.createBatch = void 0;
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
                status: true
            }
        });
        return { code: 200, status: "success", message: `${data.name} course created successfully` };
    }
    catch (e) {
        return { code: 500, status: 'error', message: e.message };
    }
});
exports.createBatch = createBatch;
const updateBatchStatus = (id, status) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield prisma.batchMaster.update({
            data: {
                status: status
            },
            where: {
                id: id,
            }
        });
        return { code: 200, status: "success", message: ` batch updated successfully` };
    }
    catch (e) {
        return { code: 500, status: 'error', message: e.message };
    }
});
exports.updateBatchStatus = updateBatchStatus;
const getActiveBatch = (instituteId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return {
            code: 200, status: "success", message: yield prisma.batchMaster.findMany({
                where: {
                    status: true,
                    fk_institute_id: instituteId
                }
            })
        };
    }
    catch (e) {
        return { code: 500, status: 'error', message: e.message };
    }
});
exports.getActiveBatch = getActiveBatch;
const getAllbatch = (instituteId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return {
            code: 200, status: "success", message: yield prisma.batchMaster.findMany({
                where: {
                    fk_institute_id: instituteId
                }
            })
        };
    }
    catch (e) {
        return { code: 500, status: 'error', message: e.message };
    }
});
exports.getAllbatch = getAllbatch;
const deleteBatch = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield prisma.batchMaster.delete({
            where: {
                id: id,
            }
        });
        return { code: 200, status: "success", message: `batch deleted successfully` };
    }
    catch (e) {
        return { code: 200, status: 'error', message: e.message };
    }
});
exports.deleteBatch = deleteBatch;
