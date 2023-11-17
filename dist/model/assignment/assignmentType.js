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
exports.deleteAssignmentType = exports.getAssignmentType = exports.getActiveAssignmentType = exports.AssignmentTypeStatusUpdate = exports.createAssignmentType = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const createAssignmentType = (name, status) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield prisma.assignmentType.create({
            data: {
                name: name,
                status: status
            }
        });
        return { code: 200, status: "success", message: `assignment type created successfully` };
    }
    catch (e) {
        let split = e.message.split(".");
        split = split.slice(-2);
        return { code: 500, status: "error", message: split[0] };
    }
});
exports.createAssignmentType = createAssignmentType;
const AssignmentTypeStatusUpdate = (id, status) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield prisma.assignmentType.update({
            data: {
                status: status,
            },
            where: {
                id: id
            }
        });
        return { code: 200, status: "success", message: `Assignment type  updated successfully` };
    }
    catch (e) {
        let split = e.message.split(".");
        split = split.slice(-2);
        return { code: 500, status: "error", message: split[0] };
    }
});
exports.AssignmentTypeStatusUpdate = AssignmentTypeStatusUpdate;
const getActiveAssignmentType = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return {
            code: 200, status: "success", message: yield prisma.assignmentType.findMany({
                where: {
                    status: true
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
exports.getActiveAssignmentType = getActiveAssignmentType;
const getAssignmentType = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return {
            code: 200, status: "success", message: yield prisma.assignmentType.findMany()
        };
    }
    catch (e) {
        let split = e.message.split(".");
        split = split.slice(-2);
        return { code: 500, status: "error", message: split[0] };
    }
});
exports.getAssignmentType = getAssignmentType;
const deleteAssignmentType = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield prisma.assignmentType.delete({
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
exports.deleteAssignmentType = deleteAssignmentType;
