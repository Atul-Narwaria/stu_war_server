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
exports.deleteAssignmentMaster = exports.getAssignmentMaster = exports.getActiveAssignmentMaster = exports.updateStatusAssignmentMaster = exports.editAssignmentMaster = exports.createAssignmentMaster = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const createAssignmentMaster = (data, instId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield prisma.assignmentMaster.create({
            data: {
                name: data.name,
                fk_assignment_type: data.fk_assignment_type,
                fk_institute_id: instId,
                end_date: data.end_date,
                repeat: false,
                status: true
            }
        });
        return { code: 200, status: "success", message: `${data.name} Assignment Created successfully` };
    }
    catch (e) {
        console.log(e);
        return { code: 500, status: 'error', message: e.message };
    }
});
exports.createAssignmentMaster = createAssignmentMaster;
const editAssignmentMaster = (data, id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield prisma.assignmentMaster.update({
            data: {
                end_date: data.endDate,
            },
            where: {
                id: id
            }
        });
        return { code: 200, status: "success", message: `Assignment  updated successfully` };
    }
    catch (e) {
        let split = e.message.split(".");
        split = split.slice(-2);
        return { code: 500, status: "error", message: split[0] };
    }
});
exports.editAssignmentMaster = editAssignmentMaster;
const updateStatusAssignmentMaster = (id, status) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield prisma.assignmentMaster.update({
            data: {
                status: status,
            },
            where: {
                id: id
            }
        });
        return { code: 200, status: "success", message: `Assignment  updated successfully` };
    }
    catch (e) {
        let split = e.message.split(".");
        split = split.slice(-2);
        return { code: 500, status: "error", message: split[0] };
    }
});
exports.updateStatusAssignmentMaster = updateStatusAssignmentMaster;
const getActiveAssignmentMaster = (instId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return {
            code: 200, status: "success", message: yield prisma.assignmentMaster.findMany({
                where: {
                    status: true,
                    fk_institute_id: instId
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
exports.getActiveAssignmentMaster = getActiveAssignmentMaster;
const getAssignmentMaster = (instId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return {
            code: 200, status: "success", message: yield prisma.assignmentMaster.findMany({
                where: {
                    fk_institute_id: instId
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
exports.getAssignmentMaster = getAssignmentMaster;
const deleteAssignmentMaster = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield prisma.assignmentMaster.delete({
            where: {
                id: id,
            }
        });
        return { code: 200, status: "success", message: `assignment deleted successfully` };
    }
    catch (e) {
        let split = e.message.split(".");
        split = split.slice(-2);
        return { code: 500, status: "error", message: split[0] };
    }
});
exports.deleteAssignmentMaster = deleteAssignmentMaster;
