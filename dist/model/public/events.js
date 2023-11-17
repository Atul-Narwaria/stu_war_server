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
exports.deleteStatus = exports.StatusUpdateEvent = exports.getUpdateevnets = exports.getAllEvents = exports.getActiveEvents = exports.createBulkEvent = exports.createEvent = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const createEvent = (name, category, isleave, fk_institute_id, date) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield prisma.events.create({
            data: {
                name: name,
                category: category,
                isleave: isleave,
                fk_institute_id: fk_institute_id,
                status: true,
                date: new Date(date),
            },
        });
        return {
            code: 200,
            status: "success",
            message: "event " + name + " is created successfully",
        };
    }
    catch (e) {
        return { code: 500, status: "error", message: e.message };
    }
});
exports.createEvent = createEvent;
const createBulkEvent = (data) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield prisma.events.createMany({
            data: data,
            skipDuplicates: true,
        });
        return {
            code: 200,
            status: "success",
            message: "events created successfully",
        };
    }
    catch (e) {
        return { code: 500, status: "error", message: e.message };
    }
});
exports.createBulkEvent = createBulkEvent;
const getActiveEvents = (fk_institute_id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const get = yield prisma.events.findMany({
            select: {
                id: true,
                name: true,
                category: true,
                isleave: true,
                date: true,
            },
            where: {
                fk_institute_id: fk_institute_id,
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
        return { code: 500, status: "error", message: e.meta };
    }
});
exports.getActiveEvents = getActiveEvents;
const getAllEvents = (fk_institute_id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const get = yield prisma.events.findMany({
            select: {
                id: true,
                name: true,
                category: true,
                isleave: true,
                date: true,
                status: true,
            },
            where: {
                fk_institute_id: fk_institute_id,
            },
        });
        return {
            code: 200,
            status: "success",
            message: get,
        };
    }
    catch (e) {
        return { code: 500, status: "error", message: e.meta };
    }
});
exports.getAllEvents = getAllEvents;
const getUpdateevnets = (fk_institute_id, date) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const get = yield prisma.events.findMany({
            select: {
                id: true,
                name: true,
                category: true,
                isleave: true,
                date: true,
                status: true,
            },
            where: {
                fk_institute_id: fk_institute_id,
                date: {
                    gte: new Date(date),
                },
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
        return { code: 500, status: "error", message: e.message };
    }
});
exports.getUpdateevnets = getUpdateevnets;
const StatusUpdateEvent = (status, id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield prisma.events.update({
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
            message: "events status updated successfully",
        };
    }
    catch (e) {
        return { code: 500, status: "error", message: e.meta };
    }
});
exports.StatusUpdateEvent = StatusUpdateEvent;
const deleteStatus = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let check = yield prisma.events.count({
            where: {
                id: id,
            },
        });
        if (!check) {
            return { status: "error", message: `event not found` };
        }
        yield prisma.events.delete({
            where: {
                id: id,
            },
        });
        return {
            code: 200,
            status: "success",
            message: ` event  deleted successfully   `,
        };
    }
    catch (e) {
        return { code: 500, status: "error", message: e.meta };
    }
});
exports.deleteStatus = deleteStatus;
