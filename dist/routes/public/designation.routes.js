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
exports.designationRoutes = void 0;
const express_1 = require("express");
const authMiddleware_1 = require("../../middleware/authMiddleware");
const requestValidation_1 = require("../../middleware/requestValidation");
const designation_1 = require("../../model/public/designation");
exports.designationRoutes = (0, express_1.Router)();
exports.designationRoutes.post('/create', authMiddleware_1.validateToken, authMiddleware_1.isAdmin, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { error, value } = requestValidation_1.DesignationCreateSchema.validate(req.body, {
            abortEarly: false
        });
        if (error) {
            return res.status(200).json({ status: "error", message: error.message });
        }
        const { name } = req.body;
        let create = yield (0, designation_1.createDesignation)(name);
        return res.status(200).json(create);
    }
    catch (e) {
        return res.status(200).json({ status: "error", message: e.message });
    }
}));
