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
exports.studentDelete = exports.StudentStatusUpdate = exports.editStudentAddress = exports.editStudent = exports.getstundet = exports.createStudentWithAddress = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const createStudentWithAddress = (data) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield prisma.studentMaster.create({
            data: {
                firstName: data.firstname,
                lastName: data.lastname,
                email: data.email,
                phone: data.phone,
                password: data.password,
                dob: data.dob,
                admissionId: data.admissionId,
                rollNo: data.rollNo,
                profileImg: data.profileImg,
                studentAddress: {
                    create: {
                        fkcountryId: data.country,
                        fkstateId: data.state,
                        fkcityId: data.city,
                        Address: data.address,
                        pin: data.pin
                    }
                }
            }
        });
        return { status: "success", message: "student created successfully" };
    }
    catch (prismaError) {
        return { status: "error", message: prismaError.message };
    }
});
exports.createStudentWithAddress = createStudentWithAddress;
const getstundet = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return {
            code: 200, status: "success",
            message: yield prisma.studentMaster.findFirst({
                select: {
                    firstName: true,
                    lastName: true,
                    email: true,
                    phone: true,
                    dob: true,
                },
                where: {
                    id: id
                }
            })
        };
    }
    catch (prismaError) {
        return { status: "error", message: prismaError.message };
    }
});
exports.getstundet = getstundet;
const editStudent = (data) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield prisma.studentMaster.update({
            data: {
                firstName: data.firstname,
                lastName: data.lastname,
                email: data.email,
                phone: data.phone,
                dob: data.dob,
                profileImg: data.profileImg,
            },
            where: {
                id: data.id
            }
        });
        return { status: "success", message: `${data.firstname} ${data.lastname}   student updated` };
    }
    catch (prismaError) {
        return { status: "error", message: prismaError.message };
    }
});
exports.editStudent = editStudent;
const editStudentAddress = (data) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let user = yield (0, exports.getstundet)(data.studentId);
        if (!user) {
            return { status: "error", message: `student not found` };
        }
        yield prisma.studentAddress.update({
            data: {
                fkstateId: data.state,
                fkcityId: data.city,
                Address: data.address,
                pin: data.pin
            },
            where: {
                id: data.id
            }
        });
        return { status: "success", message: `${user.firstname} ${user.lastname}   student address updated` };
    }
    catch (prismaError) {
        return { status: "error", message: prismaError.message };
    }
});
exports.editStudentAddress = editStudentAddress;
const StudentStatusUpdate = (id, status) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let user = yield (0, exports.getstundet)(id);
        if (!user) {
            return { status: "error", message: `student not found` };
        }
        yield prisma.studentMaster.update({
            data: {
                status: status
            },
            where: {
                id: id
            }
        });
        return { status: "success", message: `${user.firstname} ${user.lastname}   student status  updated` };
    }
    catch (prismaError) {
        return { status: "error", message: prismaError.message };
    }
});
exports.StudentStatusUpdate = StudentStatusUpdate;
const studentDelete = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let user = yield (0, exports.getstundet)(id);
        if (!user) {
            return { status: "error", message: `student not found` };
        }
        yield prisma.studentMaster.delete({
            where: {
                id: id
            }
        });
        return { status: "success", message: `${user.firstname} ${user.lastname}   student delete   ` };
    }
    catch (prismaError) {
        return { status: "error", message: prismaError.message };
    }
});
exports.studentDelete = studentDelete;