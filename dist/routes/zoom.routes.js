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
exports.ZoomInstitueRoutes.get("/get/meetings", [authMiddleware_1.validateToken, authMiddleware_1.isInstitute], (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let get = yield (0, zoomController_1.getMeetingList)();
        return res.status(200).json(get);
    }
    catch (e) {
        return res.status(500).json({ status: "error", message: e.message });
    }
}));
exports.ZoomInstitueRoutes.post("/signature", [authMiddleware_1.validateToken], (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let get = yield (0, zoomController_1.getMeetingList)();
        return res.status(200).json(get);
    }
    catch (e) {
        return res.status(500).json({ status: "error", message: e.message });
    }
}));
