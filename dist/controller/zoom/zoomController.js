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
exports.createBatchZoomClass = exports.signature = exports.createbatchLiveClass = exports.getMeetingList = exports.createZoomMeeting = void 0;
const moment = require("moment-timezone");
const randomChar_1 = require("../../helper/randomChar");
const batch_1 = require("../../model/batch/batch");
const lodash_1 = __importDefault(require("lodash"));
const batchLiveClass_1 = require("../../model/batch/batchLiveClass");
const axios = require("axios");
const config = {
    method: "post",
    maxBodyLength: Infinity,
    url: "https://zoom.us/oauth/token?grant_type=account_credentials&account_id=" +
        process.env.ZOOM_ACCOUNT,
    headers: {
        Authorization: `Basic ${Buffer.from(`${process.env.ZOOM_CLIENT}:${process.env.ZOOM_SECRET}`).toString("base64")}`,
    },
};
const createZoomMeeting = (topic, start_time, duration, password) => __awaiter(void 0, void 0, void 0, function* () {
    // let authResponse: any = null;
    // await axios
    //   .request(config)
    //   .then((response: any) => {
    //     authResponse = response.data;
    //   })
    //   .catch((error: any) => {
    //     return { code: 500, status: "error", message: error.message };
    //   });
    // const access_token: string = authResponse.access_token;
    // const headers = {
    //   Authorization: `Bearer ${access_token}`,
    //   "Content-Type": "application/json",
    // };
    // let data: any = JSON.stringify({
    //   topic: topic,
    //   type: 2,
    //   start_time: start_time,
    //   duration: duration,
    //   password: password ? password : "Atul@1234",
    //   settings: {
    //     join_before_host: true,
    //     waiting_room: true,
    //   },
    // });
    // const meetingResponse: any = await axios.post(
    //   `${process.env.Zoom_BASE_URL}/users/me/meetings`,
    //   data,
    //   { headers }
    // );
    // if (meetingResponse.status !== 201) {
    //   return {
    //     code: 500,
    //     status: "error",
    //     message: "Unable to generate meeting link",
    //   };
    // }
    // const response_data = meetingResponse.data;
    // const content = {
    //   meeting_url: response_data.join_url,
    //   meeting_number: response_data.id,
    //   meetingTime: response_data.start_time,
    //   purpose: response_data.topic,
    //   duration: response_data.duration,
    //   password: response_data.password,
    //   status: 1,
    // };
    const content = {
        meeting_url: "https://lms.stellarflux.in/student/test-series",
        meeting_number: 876092322,
        meetingTime: "13:00",
        purpose: "MFW CLASS",
        duration: 30,
        password: "ewruwi",
        status: 1,
    };
    return {
        code: 200,
        status: "success",
        message: content,
    };
});
exports.createZoomMeeting = createZoomMeeting;
const getMeetingList = () => __awaiter(void 0, void 0, void 0, function* () {
    let authResponse = null;
    yield axios
        .request(config)
        .then((response) => {
        authResponse = response.data;
    })
        .catch((error) => {
        return { code: 500, status: "error", message: error.message };
    });
    const access_token = authResponse.access_token;
    const headers = {
        Authorization: `Bearer ${access_token}`,
        "Content-Type": "application/json",
    };
    const url = `${process.env.Zoom_BASE_URL}/users/me/meetings`;
    const options = {
        method: "get",
        url,
        headers,
    };
    let meetingInfo = axios(options)
        .then((response) => {
        return {
            code: 200,
            status: "success",
            message: response.data,
        };
    })
        .catch((error) => {
        return {
            code: 500,
            status: "error",
            message: error.message,
        };
    });
    return yield meetingInfo;
});
exports.getMeetingList = getMeetingList;
const createbatchLiveClass = () => __awaiter(void 0, void 0, void 0, function* () {
    var batches = yield (0, batch_1.getAllBatchWithliveClass)();
    if (batches.code === 200 && batches.status === "success") {
        if (batches.message.length > 0) {
            batches.message.map((item) => __awaiter(void 0, void 0, void 0, function* () {
                var startMoment = moment(item.start_time, "HH:mm:ss");
                var endMoment = moment(item.end_time, "HH:mm:ss");
                var duration = endMoment.diff(startMoment, "minutes");
                var minutes = duration;
                if (minutes > 30) {
                    minutes = 30;
                }
                const todayIST = moment.tz("Asia/Kolkata");
                const today = todayIST.format("yyyy-MM-DD");
                const dayNameIST = todayIST.format("dddd").toUpperCase();
                let startTime = today + "T" + item.start_time + ":00";
                const istTime = moment.tz(startTime, "Asia/Kolkata");
                // const utcTime = istTime.utc();
                let weeks = item.weekdays.split(",");
                let password = yield (0, randomChar_1.generateRandomString)(8);
                if (lodash_1.default.includes(weeks, dayNameIST)) {
                    let data = [item.name, startTime, minutes, password];
                    let checkMeeting = yield (0, batchLiveClass_1.getCheckMeeting)(item.id);
                    if (checkMeeting.message === 0) {
                        const createMeeting = yield (0, exports.createZoomMeeting)(item.name, startTime, minutes, password);
                        console.log(createMeeting);
                        if (createMeeting.status === "success") {
                            try {
                                let id = yield (0, batchLiveClass_1.createLiveClass)(createMeeting.message.purpose, createMeeting.message.meetingTime, createMeeting.message.duration, createMeeting.message.password, createMeeting.message.meeting_url, item.id, createMeeting.message.meeting_number.toString());
                            }
                            catch (e) {
                                console.log(e.message);
                            }
                        }
                    }
                }
            }));
        }
    }
});
exports.createbatchLiveClass = createbatchLiveClass;
const signature = (meetingNumber, role) => __awaiter(void 0, void 0, void 0, function* () {
    const iat = Math.round(new Date().getTime() / 1000) - 30;
    const exp = iat + 60 * 60 * 2;
    const oHeader = { alg: "HS256", typ: "JWT" };
    const oPayload = {
        sdkKey: process.env.ZOOM_MEETING_SDK_KEY,
        mn: meetingNumber,
        role: role,
        iat: iat,
        exp: exp,
        appKey: process.env.ZOOM_MEETING_SDK_KEY,
        tokenExp: iat + 60 * 60 * 2,
    };
});
exports.signature = signature;
const createBatchZoomClass = (batchId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const get = yield (0, batch_1.getBatchById)(batchId);
        if (get.status !== "success") {
            return { code: get.code, status: get.status, message: get.message };
        }
        var startMoment = moment(get.start_time, "HH:mm:ss");
        var endMoment = moment(get.end_time, "HH:mm:ss");
        var duration = endMoment.diff(startMoment, "minutes");
        var minutes = duration;
        if (minutes > 30) {
            minutes = 30;
        }
        const todayIST = moment.tz("Asia/Kolkata");
        const today = todayIST.format("yyyy-MM-DD");
        const dayNameIST = todayIST.format("dddd").toUpperCase();
        let startTime = today + "T" + get.start_time + ":00";
        let weeks = get.weekdays.split(",");
        let password = yield (0, randomChar_1.generateRandomString)(8);
        if (lodash_1.default.includes(weeks, dayNameIST)) {
            let checkMeeting = yield (0, batchLiveClass_1.getCheckMeeting)(get.id);
            if (checkMeeting.message === 0) {
                const createMeeting = yield (0, exports.createZoomMeeting)(get.name, startTime, minutes, password);
                console.log(createMeeting);
                if (createMeeting.status === "success") {
                    try {
                        let id = yield (0, batchLiveClass_1.createLiveClass)(createMeeting.message.purpose, createMeeting.message.meetingTime, createMeeting.message.duration, createMeeting.message.password, createMeeting.message.meeting_url, get.id, createMeeting.message.meeting_number.toString());
                    }
                    catch (e) {
                        console.log(e.message);
                    }
                }
            }
        }
    }
    catch (e) {
        return { code: 500, status: "error", message: e.message };
    }
});
exports.createBatchZoomClass = createBatchZoomClass;
