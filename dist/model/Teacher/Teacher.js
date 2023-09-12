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
exports.editInstituteTeache = exports.InstituteteacherSeach = exports.getInstituteTeacher = exports.teacherDelete = exports.TeacherStatusUpdate = exports.editTeacherAddress = exports.editTeachert = exports.getTeacher = exports.createBulkTeacher = exports.createTeacherWithAddress = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const createTeacherWithAddress = (data) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield prisma.teacherMaster.create({
            data: {
                firstName: data.firstname,
                lastName: data.lastname,
                email: data.email,
                phone: data.phone,
                password: data.password,
                dob: new Date(data.dob),
                gender: data.gender,
                profileImg: data.profileImg,
                fk_institute_id: data.instituteId,
                teacherAddress: {
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
        return { code: 200, status: "success", message: "teacher created successfully" };
    }
    catch (prismaError) {
        return { code: 500, status: "error", message: prismaError.message };
    }
});
exports.createTeacherWithAddress = createTeacherWithAddress;
const createBulkTeacher = (bulkData) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log(bulkData);
        yield prisma.teacherMaster.createMany({
            data: bulkData,
            skipDuplicates: true,
        });
        return { code: 200, status: "success", message: "teacher created successfully" };
    }
    catch (prismaError) {
        return { code: 500, status: "error", message: prismaError.message };
    }
});
exports.createBulkTeacher = createBulkTeacher;
const getTeacher = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return {
            code: 200, status: "success",
            message: yield prisma.teacherMaster.findFirst({
                select: {
                    firstName: true,
                    lastName: true,
                    email: true,
                    phone: true,
                    dob: true,
                    gender: true,
                    teacherAddress: {
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
exports.getTeacher = getTeacher;
const editTeachert = (data) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield prisma.teacherMaster.update({
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
        return { status: "success", message: ` teacher updated` };
    }
    catch (prismaError) {
        return { status: "error", message: prismaError.message };
    }
});
exports.editTeachert = editTeachert;
const editTeacherAddress = (data) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let user = yield (0, exports.getTeacher)(data.studentId);
        if (!user) {
            return { status: "error", message: `student not found` };
        }
        yield prisma.teacherAddress.update({
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
        return { status: "success", message: `${user.firstname} ${user.lastname}   teacher address updated` };
    }
    catch (prismaError) {
        return { status: "error", message: prismaError.message };
    }
});
exports.editTeacherAddress = editTeacherAddress;
const TeacherStatusUpdate = (id, status) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    try {
        let user = yield (0, exports.getTeacher)(id);
        if (!user) {
            return { status: "error", message: `teacher not found` };
        }
        yield prisma.teacherMaster.update({
            data: {
                status: status
            },
            where: {
                id: id
            }
        });
        return { code: 200, status: "success", message: `${(_a = user.message) === null || _a === void 0 ? void 0 : _a.firstName} ${(_b = user.message) === null || _b === void 0 ? void 0 : _b.lastName}   teacher status  updated` };
    }
    catch (prismaError) {
        return { code: 500, status: "error", message: prismaError.message };
    }
});
exports.TeacherStatusUpdate = TeacherStatusUpdate;
const teacherDelete = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let user = yield (0, exports.getTeacher)(id);
        if (!user) {
            return { status: "error", message: `teacher not found` };
        }
        yield prisma.teacherMaster.delete({
            where: {
                id: id
            }
        });
        return { code: 200, status: "success", message: `${user.message.firstName} ${user.message.lastName}   teacher delete   ` };
    }
    catch (prismaError) {
        return { code: 500, status: "error", message: prismaError.message };
    }
});
exports.teacherDelete = teacherDelete;
const getInstituteTeacher = (page, insID) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const skip = (page - 1) * 10;
        let totalPage = yield prisma.teacherMaster.count({
            where: {
                fk_institute_id: insID
            }
        });
        let totalRow = totalPage;
        totalPage = Math.ceil(totalPage / 10);
        return {
            code: 200, status: "success", message: yield prisma.teacherMaster.findMany({
                select: {
                    id: true,
                    firstName: true,
                    lastName: true,
                    email: true,
                    phone: true,
                    gender: true,
                    dob: true,
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
exports.getInstituteTeacher = getInstituteTeacher;
const InstituteteacherSeach = (page, query, insID) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const skip = (page - 1) * 10;
        let totalPage = yield prisma.teacherMaster.count({
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
            code: 200, status: "success", message: yield prisma.teacherMaster.findMany({
                select: {
                    id: true,
                    firstName: true,
                    lastName: true,
                    email: true,
                    phone: true,
                    gender: true,
                    dob: true,
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
exports.InstituteteacherSeach = InstituteteacherSeach;
const editInstituteTeache = (userid, data) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield prisma.teacherMaster.update({
            data: {
                firstName: data.firstname,
                lastName: data.lastname,
                email: data.email,
                phone: data.phone,
                dob: new Date(data.dob),
                gender: data.gender,
            },
            where: {
                id: userid
            }
        });
        yield prisma.teacherAddress.upsert({
            where: {
                fkTeacherId: userid
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
                fkTeacherId: userid
            }
        });
        return { code: 200, status: "success", message: "student updated" };
    }
    catch (e) {
        return { code: 500, status: 'error', message: e.message };
    }
});
exports.editInstituteTeache = editInstituteTeache;
