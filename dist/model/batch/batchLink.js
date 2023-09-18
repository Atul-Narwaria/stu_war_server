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
exports.deleteBatchLink = exports.createBatchBulkLink = exports.createBatchLink = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const createBatchLink = (data, fk_institute_id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield prisma.batchLink.create({
            data: {
                fk_institute_id: fk_institute_id,
                fk_student_id: data.fk_student_id,
                fk_bacth_id: data.fk_batch_id,
                status: true
            }
        });
        return { code: 200, status: "success", message: ` student linked successfully` };
    }
    catch (e) {
        return { code: 500, status: 'error', message: e.message };
    }
});
exports.createBatchLink = createBatchLink;
const createBatchBulkLink = (datas) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield prisma.batchLink.createMany({
            data: datas,
            skipDuplicates: true,
        });
        return { code: 200, status: "success", message: ` students linked successfully` };
    }
    catch (e) {
        return { code: 500, status: 'error', message: e.message };
    }
});
exports.createBatchBulkLink = createBatchBulkLink;
const deleteBatchLink = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield prisma.batchLink.delete({
            where: {
                id: id,
            }
        });
        return { code: 200, status: "success", message: `students linked deleted successfully` };
    }
    catch (e) {
        return { code: 500, status: 'error', message: e.message };
    }
});
exports.deleteBatchLink = deleteBatchLink;
// export const deleteManyBatchLink = async (data:any) => {
//     try{
//         await prisma.batchLink.deleteMany({
//             where: {
//                 id: data,
//             }
//         })
//         return { code: 200, status: "success", message: `students linked deleted successfully` }
//     }catch (e: any) {
//         return { code: 500, status: 'error', message: e.message }
//     } 
// }
