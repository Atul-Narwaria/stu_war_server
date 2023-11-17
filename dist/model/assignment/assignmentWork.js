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
exports.deleteAssignmentWork = exports.getAllAssignmentWorkSearch = exports.getAllAssignmentWork = exports.createAssignmentWork = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const createAssignmentWork = (data) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield prisma.assignmentWork.create({
            data: {
                fk_assignmentmaster_id: data.fk_assignmentmaster_id,
                fk_sub_course_id: data.fk_sub_course_id,
                fk_stundet_id: data.fk_stundet_id,
                remarks: data.remarks,
                submissionDate: data.submissionDate,
                work: data.work
            }
        });
        return { code: 200, status: "success", message: `work uploaded successfully` };
    }
    catch (e) {
        let split = e.message.split(".");
        split = split.slice(-2);
        return { code: 500, status: "error", message: split[0] };
    }
});
exports.createAssignmentWork = createAssignmentWork;
const getAllAssignmentWork = (assignmentMaster, page) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const skip = (page - 1) * 10;
        let totalPage = yield prisma.assignmentWork.count({
            where: {
                fk_assignmentmaster_id: assignmentMaster,
            }
        });
        let totalRow = totalPage;
        totalPage = Math.ceil(totalPage / 10);
        return {
            code: 200, status: "success", message: yield prisma.assignmentWork.findMany({
                select: {
                    id: true,
                    remarks: true,
                    work: true,
                    submissionDate: true,
                    assignmentMaster: {
                        select: {
                            name: true,
                            id: true
                        }
                    },
                    subCourses: {
                        select: {
                            name: true,
                            id: true
                        }
                    },
                    stundetmaster: {
                        select: {
                            id: true,
                            firstName: true,
                            lastName: true,
                        }
                    }
                },
                where: {
                    fk_assignmentmaster_id: assignmentMaster,
                },
                skip: skip,
                take: 10,
                orderBy: {
                    updatedAt: "desc"
                }
            }),
            totalPage: totalPage,
            totalRow: totalRow
        };
    }
    catch (e) {
        let split = e.message.split(".");
        split = split.slice(-2);
        return { code: 500, status: "error", message: split[0] };
    }
});
exports.getAllAssignmentWork = getAllAssignmentWork;
const getAllAssignmentWorkSearch = (assignmentMaster, query, page) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const skip = (page - 1) * 10;
        let totalPage = yield prisma.assignmentWork.count({
            where: {
                fk_assignmentmaster_id: assignmentMaster,
                OR: [
                    {
                        submissionDate: query,
                    },
                    {
                        subCourses: {
                            OR: [
                                {
                                    name: {
                                        contains: query
                                    }
                                }
                            ]
                        },
                        stundetmaster: {
                            OR: [
                                {
                                    firstName: {
                                        contains: query
                                    },
                                    lastName: {
                                        contains: query
                                    },
                                    email: {
                                        contains: query
                                    },
                                    phone: {
                                        contains: query
                                    }
                                }
                            ]
                        }
                    }
                ]
            }
        });
        let totalRow = totalPage;
        totalPage = Math.ceil(totalPage / 10);
        return {
            code: 200, status: "success", message: yield prisma.assignmentWork.findMany({
                select: {
                    id: true,
                    remarks: true,
                    work: true,
                    submissionDate: true,
                    assignmentMaster: {
                        select: {
                            name: true,
                            id: true
                        }
                    },
                    subCourses: {
                        select: {
                            name: true,
                            id: true
                        }
                    },
                    stundetmaster: {
                        select: {
                            id: true,
                            firstName: true,
                            lastName: true,
                        }
                    }
                },
                where: {
                    fk_assignmentmaster_id: assignmentMaster,
                    OR: [
                        {
                            submissionDate: query,
                        },
                        {
                            subCourses: {
                                OR: [
                                    {
                                        name: {
                                            contains: query
                                        }
                                    }
                                ]
                            },
                            stundetmaster: {
                                OR: [
                                    {
                                        firstName: {
                                            contains: query
                                        },
                                        lastName: {
                                            contains: query
                                        },
                                        email: {
                                            contains: query
                                        },
                                        phone: {
                                            contains: query
                                        }
                                    }
                                ]
                            }
                        }
                    ]
                },
                skip: skip,
                take: 10,
                orderBy: {
                    updatedAt: "desc"
                }
            }),
            totalPage: totalPage,
            totalRow: totalRow
        };
    }
    catch (e) {
        let split = e.message.split(".");
        split = split.slice(-2);
        return { code: 500, status: "error", message: split[0] };
    }
});
exports.getAllAssignmentWorkSearch = getAllAssignmentWorkSearch;
const deleteAssignmentWork = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield prisma.assignmentWork.delete({
            where: {
                id: id,
            }
        });
        return { code: 200, status: "success", message: `assignment deleted successfully` };
    }
    catch (e) {
        let split = e.message.split(".");
        split = split.slice(-2);
        return { code: 500, status: "error", message: split[0] };
    }
});
exports.deleteAssignmentWork = deleteAssignmentWork;
