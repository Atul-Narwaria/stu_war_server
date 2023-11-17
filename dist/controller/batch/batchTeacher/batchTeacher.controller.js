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
exports.BatchListDashboard = exports.TodayRemainingBatch = void 0;
// import moment from "moment";
const batchTeacherLink_1 = require("../../../model/batch/batchTeacherLink");
const lodash_1 = __importDefault(require("lodash"));
const moment_timezone_1 = __importDefault(require("moment-timezone"));
const desiredTimezone = "Asia/Kolkata";
const TodayRemainingBatch = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let getBatch = yield (0, batchTeacherLink_1.checkTodayRemainingBatch)(id);
        if (getBatch.message.length < 0) {
            return { code: 200, status: "success", message: [] };
        }
        const today = (0, moment_timezone_1.default)();
        console.log(today);
        const todayWeekDay = today.format("dddd").toUpperCase();
        var remaining = 0;
        var total = 0;
        getBatch.message.map((e) => {
            let getbatchweeksdays = e.batchId.weekdays;
            let startTime = moment_timezone_1.default.tz(e.batchId.start_time, "HH:mm", desiredTimezone);
            getbatchweeksdays = getbatchweeksdays.split(",");
            if (lodash_1.default.includes(getbatchweeksdays, todayWeekDay)) {
                total = total + 1;
                if (today.isBefore(startTime)) {
                    remaining = 1 + remaining;
                }
            }
        });
        return { code: 200, status: "success", message: { remaining, total } };
    }
    catch (e) {
        return { code: 500, status: "error", message: e.message };
    }
});
exports.TodayRemainingBatch = TodayRemainingBatch;
const BatchListDashboard = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let getBatch = yield (0, batchTeacherLink_1.checkTodayRemainingBatch)(id);
        if (getBatch.message.length < 0) {
            return { code: 200, status: "success", message: [] };
        }
        var batchlist = [];
        const today = (0, moment_timezone_1.default)();
        const todayWeekDay = today.format("dddd").toUpperCase();
        getBatch.message.map((e) => {
            var _a, _b;
            let getbatchweeksdays = e.batchId.weekdays;
            let startTime = moment_timezone_1.default.tz(e.batchId.start_time, "HH:mm", desiredTimezone);
            let endTime = moment_timezone_1.default.tz(e.batchId.end_time, "HH:mm", desiredTimezone);
            getbatchweeksdays = getbatchweeksdays.split(",");
            let timstatus = false;
            if (today.isBefore(startTime)) {
                timstatus = false;
            }
            else if (today.isAfter(endTime)) {
                timstatus = false;
            }
            else {
                timstatus = true;
            }
            if (lodash_1.default.includes(getbatchweeksdays, todayWeekDay)) {
                //
                batchlist.push({
                    id: e.batchId.id,
                    name: e.batchId.name,
                    start_time: e.batchId.start_time,
                    end_time: e.batchId.end_time,
                    course: (_b = (_a = e.batchId) === null || _a === void 0 ? void 0 : _a.subCourses) === null || _b === void 0 ? void 0 : _b.name,
                    timeStatus: timstatus,
                    liveClass: e.batchId.haveLiveClass,
                    liveClassData: e.batchId.batchLiveClass,
                });
            }
        });
        return { code: 200, status: "success", message: batchlist };
    }
    catch (e) {
        return { code: 500, status: "error", message: e.message };
    }
});
exports.BatchListDashboard = BatchListDashboard;
