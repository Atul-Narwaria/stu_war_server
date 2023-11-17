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
exports.getTeacherInstituteId = exports.isTeacherExist = exports.getteacherById = exports.updateteacherPassword = exports.getTeachersAllActive = exports.getTeachersActive = exports.editInstituteTeache = exports.InstituteteacherSeach = exports.getInstituteTeacher = exports.teacherDelete = exports.TeacherStatusUpdate = exports.editTeacherAddress = exports.editTeachert = exports.getTeacher = exports.getTeacherPassword = exports.createBulkTeacher = exports.createTeacherWithAddress = void 0;
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
                        pin: data.pin,
                    },
                },
            },
        });
        return {
            code: 200,
            status: "success",
            message: "teacher created successfully",
        };
    }
    catch (prismaError) {
        return { code: 500, status: "error", message: prismaError.message };
    }
});
exports.createTeacherWithAddress = createTeacherWithAddress;
const createBulkTeacher = (bulkData) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield prisma.teacherMaster.createMany({
            data: bulkData,
            skipDuplicates: true,
        });
        return {
            code: 200,
            status: "success",
            message: "teacher created successfully",
        };
    }
    catch (prismaError) {
        return { code: 500, status: "error", message: prismaError.message };
    }
});
exports.createBulkTeacher = createBulkTeacher;
const getTeacherPassword = (email) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return {
            code: 200,
            status: "success",
            message: yield prisma.teacherMaster.findFirst({
                select: {
                    id: true,
                    firstName: true,
                    lastName: true,
                    password: true,
                    phone: true,
                    dob: true,
                    gender: true,
                },
                where: {
                    email: email,
                },
            }),
        };
    }
    catch (e) {
        let split = e.message.split(".");
        split = split.slice(-2);
        return { code: 500, status: "error", message: e.message };
    }
});
exports.getTeacherPassword = getTeacherPassword;
const getTeacher = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return {
            code: 200,
            status: "success",
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
                            pin: true,
                        },
                    },
                },
                where: {
                    email: id,
                },
            }),
        };
    }
    catch (e) {
        let split = e.message.split(".");
        split = split.slice(-2);
        return { code: 500, status: "error", message: e.message };
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
                id: data.id,
            },
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
                pin: data.pin,
            },
            where: {
                id: data.id,
            },
        });
        return {
            status: "success",
            message: `${user.firstname} ${user.lastname}   teacher address updated`,
        };
    }
    catch (prismaError) {
        return { status: "error", message: prismaError.message };
    }
});
exports.editTeacherAddress = editTeacherAddress;
const TeacherStatusUpdate = (id, status) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let user = yield (0, exports.getTeacher)(id);
        if (!user) {
            return { status: "error", message: `teacher not found` };
        }
        yield prisma.teacherMaster.update({
            data: {
                status: status,
            },
            where: {
                id: id,
            },
        });
        return {
            code: 200,
            status: "success",
            message: `   teacher status  updated`,
        };
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
                id: id,
            },
        });
        return {
            code: 200,
            status: "success",
            message: `${user.message.firstName} ${user.message.lastName}   teacher delete   `,
        };
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
                fk_institute_id: insID,
            },
        });
        let totalRow = totalPage;
        totalPage = Math.ceil(totalPage / 10);
        return {
            code: 200,
            status: "success",
            message: yield prisma.teacherMaster.findMany({
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
                    fk_institute_id: insID,
                },
                orderBy: {
                    updatedAt: "desc",
                },
            }),
            totalPage: totalPage,
            totalRow: totalRow,
        };
    }
    catch (e) {
        let split = e.message.split(".");
        split = split.slice(-2);
        return { code: 500, status: "error", message: split[0] };
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
                            contains: query,
                        },
                    },
                    {
                        lastName: {
                            contains: query,
                        },
                    },
                    {
                        email: {
                            contains: query,
                        },
                    },
                    {
                        phone: {
                            contains: query,
                        },
                    },
                    {
                        gender: {
                            contains: query,
                        },
                    },
                ],
            },
        });
        let totalRow = totalPage;
        totalPage = Math.ceil(totalPage / 10);
        return {
            code: 200,
            status: "success",
            message: yield prisma.teacherMaster.findMany({
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
                    updatedAt: true,
                },
                skip: skip,
                take: 10,
                where: {
                    fk_institute_id: insID,
                    OR: [
                        {
                            firstName: {
                                contains: query,
                            },
                        },
                        {
                            lastName: {
                                contains: query,
                            },
                        },
                        {
                            email: {
                                contains: query,
                            },
                        },
                        {
                            phone: {
                                contains: query,
                            },
                        },
                        {
                            gender: {
                                contains: query,
                            },
                        },
                    ],
                },
            }),
            totalPage: totalPage,
            totalRow: totalRow,
        };
    }
    catch (e) {
        let split = e.message.split(".");
        split = split.slice(-2);
        return { code: 500, status: "error", message: split[0] };
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
                id: userid,
            },
        });
        yield prisma.teacherAddress.upsert({
            where: {
                fkTeacherId: userid,
            },
            update: {
                fkcountryId: data.country,
                fkstateId: data.state,
                fkcityId: data.city,
                Address: data.address,
                pin: data.pin,
            },
            create: {
                fkcountryId: data.country,
                fkstateId: data.state,
                fkcityId: data.city,
                Address: data.address,
                pin: data.pin,
                fkTeacherId: userid,
            },
        });
        return { code: 200, status: "success", message: "teacher updated" };
    }
    catch (e) {
        let split = e.message.split(".");
        split = split.slice(-2);
        return { code: 500, status: "error", message: split[0] };
    }
});
exports.editInstituteTeache = editInstituteTeache;
const getTeachersActive = (page, insID) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const skip = (page - 1) * 10;
        let totalPage = yield prisma.teacherMaster.count({
            where: {
                fk_institute_id: insID,
                status: true,
            },
        });
        let totalRow = totalPage;
        totalPage = Math.ceil(totalPage / 10);
        return {
            code: 200,
            status: "success",
            message: yield prisma.teacherMaster.findMany({
                select: {
                    id: true,
                    firstName: true,
                    lastName: true,
                    email: true,
                    phone: true,
                    createAt: true,
                },
                skip: skip,
                take: 10,
                where: {
                    fk_institute_id: insID,
                    status: true,
                },
                orderBy: {
                    createAt: "desc",
                },
            }),
            totalPage: totalPage,
            totalRow: totalRow,
        };
    }
    catch (e) {
        let split = e.message.split(".");
        split = split.slice(-2);
        return { code: 500, status: "error", message: split[0] };
    }
});
exports.getTeachersActive = getTeachersActive;
const getTeachersAllActive = (insID) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return {
            code: 200,
            status: "success",
            message: yield prisma.teacherMaster.findMany({
                select: {
                    id: true,
                    firstName: true,
                    lastName: true,
                    email: true,
                    phone: true,
                    createAt: true,
                },
                where: {
                    fk_institute_id: insID,
                    status: true,
                },
                orderBy: {
                    createAt: "desc",
                },
            }),
        };
    }
    catch (e) {
        let split = e.message.split(".");
        split = split.slice(-2);
        return { code: 500, status: "error", message: split[0] };
    }
});
exports.getTeachersAllActive = getTeachersAllActive;
const updateteacherPassword = (id, passowrd) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield prisma.teacherMaster.update({
            data: {
                password: passowrd,
            },
            where: {
                id: id,
            },
        });
        return {
            code: 200,
            status: "success",
            message: "password updated successfully",
        };
    }
    catch (e) {
        let split = e.message.split(".");
        split = split.slice(-2);
        return { code: 500, status: "error", message: split[1] };
    }
});
exports.updateteacherPassword = updateteacherPassword;
const getteacherById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let check = yield prisma.teacherMaster.findFirst({
            select: {
                firstName: true,
                lastName: true,
                email: true,
                phone: true,
                dob: true,
                gender: true,
            },
            where: {
                id: id,
            },
        });
        if (!check) {
            return {
                code: 403,
                status: "error",
                message: "teacher not found",
            };
        }
        return {
            code: 200,
            status: "success",
            message: check,
        };
    }
    catch (e) {
        let split = e.message.split(".");
        split = split.slice(-2);
        return { code: 500, status: "error", message: split[1] };
    }
});
exports.getteacherById = getteacherById;
const isTeacherExist = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const find = yield prisma.teacherMaster.count({
            where: {
                OR: [
                    {
                        id: id,
                    },
                    {
                        email: id,
                    },
                ],
            },
        });
        return {
            code: 200,
            status: "success",
            message: find,
        };
    }
    catch (e) {
        let split = e.message.split(".");
        split = split.slice(-2);
        return { code: 500, status: "error", message: split[1] };
    }
});
exports.isTeacherExist = isTeacherExist;
const getTeacherInstituteId = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const get = yield prisma.teacherMaster.findFirst({
            select: {
                fk_institute_id: true,
            },
            where: {
                id: id,
                status: true,
            },
        });
        if (!get) {
            return { code: 403, status: "error", message: "invalid user" };
        }
        return { code: 200, status: "success", message: get.fk_institute_id };
    }
    catch (e) {
        let split = e.message.split(".");
        split = split.slice(-2);
        return { code: 500, status: "error", message: split[1] };
    }
});
exports.getTeacherInstituteId = getTeacherInstituteId;
