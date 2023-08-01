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
exports.createDesignation = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const createDesignation = (name) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield prisma.designation.create({
            data: {
                roles: name,
                status: true
            }
        });
        return { status: "success", message: "designation " + name + " is created successfully" };
    }
    catch (prismaError) {
        return { status: "error", message: prismaError.message };
    }
});
exports.createDesignation = createDesignation;
