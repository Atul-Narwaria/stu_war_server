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
exports.CheckinstituteExistance = exports.getInstitutePassword = exports.getInstitute = exports.deleteInstitute = exports.updateInstituteStatus = exports.getInstituesById = exports.getInstitutes = exports.getAllCode = exports.createInstitue = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const createInstitue = (datas) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield prisma.instituteMaster.create({
            data: {
                name: datas.name,
                email: datas.email,
                phone: datas.phone,
                code: datas.code,
                status: true,
                onMaintaince: false,
                profileImg: datas.profileImg,
                instituteAddress: {
                    create: {
                        fkcountryId: datas.country,
                        fkstateId: datas.state,
                        fkcityId: datas.city,
                        Address: datas.address,
                        pin: datas.pin,
                        status: true
                    }
                },
                instituteLogin: {
                    create: {
                        password: datas.password,
                        maintaince_password: datas.maintancePassword,
                        status: true
                    }
                }
            }
        });
        return { code: 200, status: "success", message: "institute created successfully" };
    }
    catch (e) {
        let split = e.message.split(".");
        split = split.slice(-2);
        return { code: 500, status: "error", message: split[0] };
    }
});
exports.createInstitue = createInstitue;
const getAllCode = (fy) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return {
            code: 200, status: "success", message: yield prisma.instituteMaster.findMany({
                select: {
                    code: true
                },
                where: {
                    code: {
                        startsWith: fy
                    }
                }
            })
        };
    }
    catch (e) {
        let split = e.message.split(".");
        split = split.slice(-2);
        return { code: 500, status: "error", message: split[0] };
    }
});
exports.getAllCode = getAllCode;
const getInstitutes = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return {
            code: 200, status: "success", message: yield prisma.instituteMaster.findMany({
                select: {
                    id: true,
                    name: true,
                    email: true,
                    phone: true,
                    code: true,
                    status: true,
                    instituteAddress: {
                        select: {
                            id: true,
                            state: {
                                select: {
                                    stateName: true
                                }
                            },
                            city: {
                                select: {
                                    cityName: true
                                }
                            }
                        }
                    },
                },
                orderBy: {
                    createAt: "desc"
                }
            })
        };
    }
    catch (e) {
        let split = e.message.split(".");
        split = split.slice(-2);
        return { code: 500, status: "error", message: split[0] };
    }
});
exports.getInstitutes = getInstitutes;
const getInstituesById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return {
            code: 200, status: "success",
            message: yield prisma.instituteMaster.findFirst({
                where: {
                    id: id
                }
            })
        };
    }
    catch (e) {
        let split = e.message.split(".");
        split = split.slice(-2);
        return { code: 500, status: "error", message: split[0] };
    }
});
exports.getInstituesById = getInstituesById;
const updateInstituteStatus = (id, status) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let getname = yield prisma.instituteMaster.findFirst({
            select: {
                name: true
            },
            where: {
                id: id
            }
        });
        if (!getname) {
            return { code: 200, status: "error", message: "No institute found" };
        }
        yield prisma.instituteMaster.update({
            data: {
                status: status
            },
            where: {
                id: id
            }
        });
        return { code: 200, status: "success", message: `${getname.name}  status updated successfully` };
    }
    catch (e) {
        let split = e.message.split(".");
        split = split.slice(-2);
        return { code: 500, status: "error", message: split[0] };
    }
});
exports.updateInstituteStatus = updateInstituteStatus;
const deleteInstitute = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let getname = yield prisma.instituteMaster.findFirst({
            select: {
                name: true
            },
            where: {
                id: id
            }
        });
        if (!getname) {
            return { code: 200, status: "error", message: "No institute found" };
        }
        yield prisma.instituteLogin.deleteMany({
            where: {
                fk_institute_id: id
            }
        });
        yield prisma.instituteAddress.deleteMany({
            where: {
                fk_institute_id: id
            }
        });
        yield prisma.instituteMaster.delete({
            where: {
                id: id
            }
        });
        return { code: 200, status: "success", message: `${getname.name}  deleted successfully` };
    }
    catch (e) {
        return { code: 200, status: 'error', message: e.message };
    }
});
exports.deleteInstitute = deleteInstitute;
const getInstitute = (type, value) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (type === "id") {
            return {
                code: 200, status: "success",
                message: yield prisma.instituteMaster.findFirst({
                    where: {
                        id: value
                    }
                })
            };
        }
        if (type === "email") {
            return {
                code: 200, status: "success",
                message: yield prisma.instituteMaster.findFirst({
                    where: {
                        email: value
                    }
                })
            };
        }
        if (type === "code") {
            return {
                code: 200, status: "success",
                message: yield prisma.instituteMaster.findFirst({
                    where: {
                        code: value
                    }
                })
            };
        }
        return {
            code: 500, status: "error",
            message: "Server error"
        };
    }
    catch (e) {
        return { code: 200, status: 'error', message: e.message };
    }
});
exports.getInstitute = getInstitute;
const getInstitutePassword = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return {
            code: 200, status: "success",
            message: yield prisma.instituteLogin.findFirst({
                select: {
                    id: true,
                    password: true
                },
                where: {
                    fk_institute_id: id
                }
            })
        };
    }
    catch (e) {
        return { code: 200, status: 'error', message: e.message };
    }
});
exports.getInstitutePassword = getInstitutePassword;
const CheckinstituteExistance = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return yield prisma.instituteMaster.count({
            where: { id: id }
        });
    }
    catch (e) {
        return { code: 500, status: "error", message: e.message };
    }
});
exports.CheckinstituteExistance = CheckinstituteExistance;
