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
exports.InstitueStudentRoutes = void 0;
const express_1 = require("express");
const authMiddleware_1 = require("../../middleware/authMiddleware");
const requestValidation_1 = require("../../middleware/requestValidation");
const studentController_1 = require("../../controller/institute/studentController");
exports.InstitueStudentRoutes = (0, express_1.Router)();
exports.InstitueStudentRoutes.post("/create", [authMiddleware_1.validateToken, authMiddleware_1.isInstitute], (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const reqError = requestValidation_1.instituteCreateStudentSchema.validate(req.body);
        if (reqError === null || reqError === void 0 ? void 0 : reqError.error) {
            return res.status(422).json({ status: "error", message: (_a = reqError.error) === null || _a === void 0 ? void 0 : _a.message });
        }
        let instituteCode = req.userid;
        let { code, status, message } = yield (0, studentController_1.institutecreateStudent)(req.body, instituteCode);
        return res.status(code).json({ status, message });
    }
    catch (e) {
        return res.status(500).json({ status: "error", message: e.message });
    }
}));
