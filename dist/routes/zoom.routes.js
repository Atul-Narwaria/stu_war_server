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
exports.ZoomInstitueRoutes = void 0;
const express_1 = require("express");
const authMiddleware_1 = require("../middleware/authMiddleware");
const requestValidation_1 = require("../middleware/requestValidation");
const zoomController_1 = require("../controller/zoom/zoomController");
const jsrsasign_1 = require("jsrsasign");
exports.ZoomInstitueRoutes = (0, express_1.Router)();
exports.ZoomInstitueRoutes.post("/create", [authMiddleware_1.validateToken, authMiddleware_1.isInstitute], (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const reqError = requestValidation_1.ZoomMeetingCreateSchema.validate(req.body);
        if (reqError === null || reqError === void 0 ? void 0 : reqError.error) {
            return res
                .status(422)
                .json({ status: "error", message: (_a = reqError.error) === null || _a === void 0 ? void 0 : _a.message });
        }
        const { topic, start_time, duration, password } = req.body;
        let { code, status, message } = yield (0, zoomController_1.createZoomMeeting)(topic, start_time, duration, password);
        return res.status(code).json({ status, message });
    }
    catch (e) {
        return res.status(500).json({ status: "error", message: e.message });
    }
}));
exports.ZoomInstitueRoutes.post("/signature", [authMiddleware_1.validateToken], (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _b;
    try {
        console.log(req.body);
        const iat = Math.round(new Date().getTime() / 1000) - 30;
        const exp = iat + 60 * 60 * 2;
        const oHeader = { alg: "HS256", typ: "JWT" };
        console.log(oHeader);
        const oPayload = {
            sdkKey: "MjrUGJm9R72Wtqq1npLgZA",
            mn: req.body.meetingNumber,
            role: req.body.role,
            iat: iat,
            exp: exp,
            appKey: "MjrUGJm9R72Wtqq1npLgZA",
            tokenExp: iat + 60 * 60 * 2,
        };
        console.log(oPayload);
        const sHeader = JSON.stringify(oHeader);
        const sPayload = JSON.stringify(oPayload);
        const signature = (_b = jsrsasign_1.KJUR === null || jsrsasign_1.KJUR === void 0 ? void 0 : jsrsasign_1.KJUR.jws) === null || _b === void 0 ? void 0 : _b.JWS.sign("HS256", sHeader, sPayload, "AT1NNLz50oiKEJRjUeKgm6o6GyFseDjj");
        res.json({
            signature: signature,
        });
    }
    catch (e) {
        return res.status(500).json({ status: "error", message: e.message });
    }
}));
exports.ZoomInstitueRoutes.get("/get/meetings", [authMiddleware_1.validateToken], (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let get = yield (0, zoomController_1.getMeetingList)();
        return res.status(200).json(get);
    }
    catch (e) {
        return res.status(500).json({ status: "error", message: e.message });
    }
}));
// createBatchZoomClass
exports.ZoomInstitueRoutes.post("/create/batch/class", [authMiddleware_1.validateToken], (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!req.body.batchId) {
            return res
                .status(423)
                .json({ status: "error", message: "batch id required" });
        }
        let get = yield (0, zoomController_1.createBatchZoomClass)(req.body.batchId);
        return res.status(200).json(get);
    }
    catch (e) {
        return res.status(500).json({ status: "error", message: e.message });
    }
}));
exports.ZoomInstitueRoutes.post("/signature/test", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _c;
    try {
        console.log(req.body);
        const iat = Math.round(new Date().getTime() / 1000) - 30;
        const exp = iat + 60 * 60 * 2;
        const oHeader = { alg: "HS256", typ: "JWT" };
        // console.log(oHeader);
        const oPayload = {
            sdkKey: "MjrUGJm9R72Wtqq1npLgZA",
            mn: req.body.meetingNumber,
            role: req.body.role,
            iat: iat,
            exp: exp,
            appKey: "MjrUGJm9R72Wtqq1npLgZA",
            tokenExp: iat + 60 * 60 * 2,
        };
        console.log(oPayload);
        const sHeader = JSON.stringify(oHeader);
        const sPayload = JSON.stringify(oPayload);
        const signature = (_c = jsrsasign_1.KJUR === null || jsrsasign_1.KJUR === void 0 ? void 0 : jsrsasign_1.KJUR.jws) === null || _c === void 0 ? void 0 : _c.JWS.sign("HS256", sHeader, sPayload, "AT1NNLz50oiKEJRjUeKgm6o6GyFseDjj");
        res.json({
            signature: signature,
        });
    }
    catch (e) {
        return res.status(500).json({ status: "error", message: e.message });
    }
}));
