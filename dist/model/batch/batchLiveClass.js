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
exports.updateStatusBatchLiveClass = exports.getCheckMeeting = exports.deleteBatchLiveClass = exports.createLiveClass = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const createLiveClass = (topic, start_time, duration, password, meeting_url, fk_batch_id, meeting_number) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield prisma.batchLiveClass.create({
            data: {
                topic: topic,
                start_time: start_time,
                duration: duration.toString(),
                password: password,
                meeting_url: meeting_url,
                fk_batch_id: fk_batch_id,
                meeting_number: meeting_number,
            },
        });
        return {
            code: 200,
            status: "success",
            message: ` meeting created successfully`,
        };
    }
    catch (e) {
        let split = e.message.split(".");
        split = split.slice(-2);
        return { code: 500, status: "error", message: e.message };
    }
});
exports.createLiveClass = createLiveClass;
const deleteBatchLiveClass = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield prisma.batchLiveClass.delete({
            where: {
                id: id,
            },
        });
        return {
            code: 200,
            status: "success",
            message: ` meeting deleted successfully`,
        };
    }
    catch (e) {
        let split = e.message.split(".");
        split = split.slice(-2);
        return { code: 500, status: "error", message: split[0] };
    }
});
exports.deleteBatchLiveClass = deleteBatchLiveClass;
const getCheckMeeting = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let check = yield prisma.batchLiveClass.count({
            where: {
                fk_batch_id: id,
            },
        });
        return {
            code: 200,
            status: "success",
            message: check,
        };
    }
    catch (e) {
        let split = e.message.split(".");
        split = split.slice(-2);
        return { code: 500, status: "error", message: split[0] };
    }
});
exports.getCheckMeeting = getCheckMeeting;
const updateStatusBatchLiveClass = (id, status) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let update = yield prisma.batchMaster.update({
            data: {
                haveLiveClass: status,
            },
            where: {
                id: id,
            },
        });
        if (!update) {
            return {
                code: 500,
                status: "error",
                message: "]server error",
            };
        }
        return {
            code: 200,
            status: "success",
            message: "live class status updated",
        };
    }
    catch (e) {
        let split = e.message.split(".");
        split = split.slice(-2);
        return { code: 500, status: "error", message: split[0] };
    }
});
exports.updateStatusBatchLiveClass = updateStatusBatchLiveClass;
