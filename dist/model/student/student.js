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
exports.editInstituteStudent = exports.InstituteStudentSeach = exports.getInstituteStudents = exports.getstudentAddmissionIds = exports.studentDelete = exports.StudentStatusUpdate = exports.editStudentAddress = exports.editStudent = exports.getstundet = exports.createBulkStudent = exports.createStudentWithAddress = void 0;
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
                dob: new Date(data.dob),
                gender: data.gender,
                admissionId: data.admissionId,
                profileImg: data.profileImg,
                fk_institute_id: data.instituteId,
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
        return { code: 200, status: "success", message: "student created successfully" };
    }
    catch (prismaError) {
        return { code: 500, status: "error", message: prismaError.message };
    }
});
exports.createStudentWithAddress = createStudentWithAddress;
const createBulkStudent = (bulkData) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield prisma.studentMaster.createMany({
            data: bulkData,
            skipDuplicates: true,
        });
        return { code: 200, status: "success", message: "student created successfully" };
    }
    catch (prismaError) {
        return { code: 500, status: "error", message: prismaError.message };
    }
});
exports.createBulkStudent = createBulkStudent;
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
                    gender: true,
                    studentAddress: {
                        select: {
                            fkcityId: true,
                            fkcountryId: true,
                            fkstateId: true,
                            Address: true,
                            pin: true
                        }
                    }
                },
                where: {
                    id: id
                }
            })
        };
    }
    catch (prismaError) {
        return { code: 500, status: "error", message: prismaError.message };
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
        return { status: "success", message: ` student updated` };
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
    var _a, _b;
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
        return { code: 200, status: "success", message: `${(_a = user.message) === null || _a === void 0 ? void 0 : _a.firstName} ${(_b = user.message) === null || _b === void 0 ? void 0 : _b.lastName}   student status  updated` };
    }
    catch (prismaError) {
        return { code: 500, status: "error", message: prismaError.message };
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
        return { code: 200, status: "success", message: `${user.message.firstName} ${user.message.lastName}   student delete   ` };
    }
    catch (prismaError) {
        return { code: 500, status: "error", message: prismaError.message };
    }
});
exports.studentDelete = studentDelete;
const getstudentAddmissionIds = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return {
            code: 200, status: "success",
            message: yield prisma.studentMaster.findMany({
                select: {
                    admissionId: true
                },
                where: {
                    admissionId: {
                        contains: id
                    }
                }
            })
        };
    }
    catch (e) {
        return { code: 500, status: 'error', message: e.message };
    }
});
exports.getstudentAddmissionIds = getstudentAddmissionIds;
const getInstituteStudents = (page, insID) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const skip = (page - 1) * 10;
        let totalPage = yield prisma.studentMaster.count({
            where: {
                fk_institute_id: insID
            }
        });
        let totalRow = totalPage;
        totalPage = Math.ceil(totalPage / 10);
        return {
            code: 200, status: "success", message: yield prisma.studentMaster.findMany({
                select: {
                    id: true,
                    firstName: true,
                    lastName: true,
                    email: true,
                    phone: true,
                    gender: true,
                    dob: true,
                    admissionId: true,
                    status: true,
                    createAt: true,
                },
                skip: skip,
                take: 10,
                where: {
                    fk_institute_id: insID
                },
                orderBy: {
                    createAt: 'desc'
                }
            }),
            totalPage: totalPage,
            totalRow: totalRow
        };
    }
    catch (e) {
        return { code: 500, status: 'error', message: e.message };
    }
});
exports.getInstituteStudents = getInstituteStudents;
const InstituteStudentSeach = (page, query, insID) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const skip = (page - 1) * 10;
        let totalPage = yield prisma.studentMaster.count({
            where: {
                fk_institute_id: insID,
                OR: [
                    {
                        firstName: {
                            contains: query
                        }
                    },
                    {
                        lastName: {
                            contains: query
                        }
                    },
                    {
                        email: {
                            contains: query
                        }
                    },
                    {
                        phone: {
                            contains: query
                        }
                    },
                    {
                        gender: {
                            contains: query
                        }
                    }
                ],
            }
        });
        let totalRow = totalPage;
        totalPage = Math.ceil(totalPage / 10);
        return {
            code: 200, status: "success", message: yield prisma.studentMaster.findMany({
                select: {
                    id: true,
                    firstName: true,
                    lastName: true,
                    email: true,
                    phone: true,
                    gender: true,
                    dob: true,
                    admissionId: true,
                    status: true,
                    createAt: true,
                    updatedAt: true
                },
                skip: skip,
                take: 10,
                where: {
                    fk_institute_id: insID,
                    OR: [
                        {
                            firstName: {
                                contains: query
                            }
                        },
                        {
                            lastName: {
                                contains: query
                            }
                        },
                        {
                            email: {
                                contains: query
                            }
                        },
                        {
                            phone: {
                                contains: query
                            }
                        },
                        {
                            gender: {
                                contains: query
                            }
                        }
                    ],
                }
            }),
            totalPage: totalPage,
            totalRow: totalRow
        };
    }
    catch (e) {
        return { code: 500, status: 'error', message: e.message };
    }
});
exports.InstituteStudentSeach = InstituteStudentSeach;
const editInstituteStudent = (userid, data) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield prisma.studentMaster.update({
            data: {
                firstName: data.firstname,
                lastName: data.lastname,
                email: data.email,
                phone: data.phone,
                dob: new Date(data.dob),
                gender: data.gender,
                studentAddress: {}
            },
            where: {
                id: userid
            }
        });
        yield prisma.studentAddress.upsert({
            where: {
                fkStudentId: userid
            },
            update: {
                fkcountryId: data.country,
                fkstateId: data.state,
                fkcityId: data.city,
                Address: data.address,
                pin: data.pin
            },
            create: {
                fkcountryId: data.country,
                fkstateId: data.state,
                fkcityId: data.city,
                Address: data.address,
                pin: data.pin,
                fkStudentId: userid
            }
        });
        return { code: 200, status: "success", message: "student updated" };
    }
    catch (e) {
        return { code: 500, status: 'error', message: e.message };
    }
});
exports.editInstituteStudent = editInstituteStudent;
