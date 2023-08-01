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
exports.AllState = exports.stateDelete = exports.updateState = exports.getStatebyId = exports.getActiveStateCityByCountry = exports.getStateCityByCountry = exports.getActiveStateByCountry = exports.getStateByCountry = exports.createState = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const createState = (countryId, state) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield prisma.state.create({
            data: {
                fkCountryId: countryId,
                stateName: state,
                status: true
            }
        });
        return { code: 200, status: "success", message: "state created successfully" };
    }
    catch (e) {
        return { code: 500, status: 'error', message: e.message };
    }
});
exports.createState = createState;
const getStateByCountry = (countryId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return {
            code: 200, status: "success",
            message: yield prisma.state.findMany({
                select: {
                    id: true,
                    stateName: true,
                    status: true
                },
                orderBy: {
                    createAt: "desc"
                },
                where: {
                    fkCountryId: countryId
                }
            })
        };
    }
    catch (e) {
        return { code: 500, status: 'error', message: e.message };
    }
});
exports.getStateByCountry = getStateByCountry;
const getActiveStateByCountry = (countryId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return {
            code: 200, status: "success",
            message: yield prisma.state.findMany({
                select: {
                    id: true,
                    stateName: true
                },
                orderBy: {
                    createAt: "desc"
                },
                where: {
                    status: true,
                    fkCountryId: countryId
                }
            })
        };
    }
    catch (e) {
        return { code: 500, status: 'error', message: e.message };
    }
});
exports.getActiveStateByCountry = getActiveStateByCountry;
const getStateCityByCountry = (countryId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return {
            code: 200, status: "success",
            message: yield prisma.state.findMany({
                select: {
                    id: true,
                    stateName: true,
                    status: true,
                    city: {
                        select: {
                            id: true,
                            cityName: true
                        }
                    }
                },
                orderBy: {
                    createAt: "desc"
                },
                where: {
                    fkCountryId: countryId
                }
            })
        };
    }
    catch (e) {
        return { code: 500, status: 'error', message: e.message };
    }
});
exports.getStateCityByCountry = getStateCityByCountry;
const getActiveStateCityByCountry = (countryId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return {
            code: 200, status: "success",
            message: yield prisma.state.findMany({
                select: {
                    id: true,
                    stateName: true,
                    status: true,
                    city: {
                        select: {
                            id: true,
                            cityName: true
                        }
                    }
                },
                orderBy: {
                    createAt: "desc"
                },
                where: {
                    status: true,
                    fkCountryId: countryId
                }
            })
        };
    }
    catch (e) {
        return { code: 500, status: 'error', message: e.message };
    }
});
exports.getActiveStateCityByCountry = getActiveStateCityByCountry;
const getStatebyId = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return {
            code: 200, status: "success",
            message: yield prisma.state.findFirstOrThrow({
                where: {
                    id: id
                }
            })
        };
    }
    catch (e) {
        return { code: 500, status: 'error', message: e.message };
    }
});
exports.getStatebyId = getStatebyId;
const updateState = (id, status) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const get = yield (0, exports.getStatebyId)(id);
        yield prisma.state.update({
            data: {
                status: status
            },
            where: {
                id: id
            }
        });
        return {
            code: 200, status: "success",
            message: `${get.message.stateName} state status updated`
        };
    }
    catch (e) {
        return { code: 500, status: 'error', message: e.message };
    }
});
exports.updateState = updateState;
const stateDelete = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const get = yield (0, exports.getStatebyId)(id);
        yield prisma.state.delete({
            where: {
                id: id
            }
        });
        return {
            code: 200, status: "success",
            message: `${get.message.stateName} state deleted`
        };
    }
    catch (e) {
        return { code: 500, status: 'error', message: e.message };
    }
});
exports.stateDelete = stateDelete;
const AllState = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return {
            code: 200, status: "success",
            message: yield prisma.state.findMany({
                select: {
                    id: true,
                    stateName: true,
                    status: true,
                    country: {
                        select: {
                            id: true,
                            CounrtyName: true
                        }
                    }
                },
                orderBy: {
                    createAt: 'desc'
                }
            })
        };
    }
    catch (e) {
        return { code: 500, status: 'error', message: e.message };
    }
});
exports.AllState = AllState;
