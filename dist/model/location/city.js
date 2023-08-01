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
exports.getCityWithStateCountry = exports.cityDelete = exports.updatecity = exports.getCitybyId = exports.getActiveCity = exports.getCity = exports.createCity = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const createCity = (countryId, stateId, city) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield prisma.city.create({
            data: {
                fkCountryId: countryId,
                fkstateId: stateId,
                cityName: city,
                status: true
            }
        });
        return { code: 200, status: "success", message: "city created successfully" };
    }
    catch (e) {
        return { code: 500, status: 'error', message: e.message };
    }
});
exports.createCity = createCity;
const getCity = (countryId, stateId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return {
            code: 200, status: "success",
            message: yield prisma.city.findMany({
                orderBy: {
                    createAt: "desc"
                },
                where: {
                    fkCountryId: countryId,
                    fkstateId: stateId
                }
            })
        };
    }
    catch (e) {
        return { code: 500, status: 'error', message: e.message };
    }
});
exports.getCity = getCity;
const getActiveCity = (countryId, stateId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return {
            code: 200, status: "success",
            message: yield prisma.city.findMany({
                orderBy: {
                    createAt: "desc"
                },
                where: {
                    fkCountryId: countryId,
                    fkstateId: stateId,
                    status: true
                }
            })
        };
    }
    catch (e) {
        return { code: 500, status: 'error', message: e.message };
    }
});
exports.getActiveCity = getActiveCity;
const getCitybyId = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return {
            code: 200, status: "success",
            message: yield prisma.city.findFirstOrThrow({
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
exports.getCitybyId = getCitybyId;
const updatecity = (id, status) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const get = yield (0, exports.getCitybyId)(id);
        yield prisma.city.update({
            data: {
                status: status
            },
            where: {
                id: id
            }
        });
        return {
            code: 200, status: "success",
            message: `${get.message.cityName} city status updated`
        };
    }
    catch (e) {
        return { code: 500, status: 'error', message: e.message };
    }
});
exports.updatecity = updatecity;
const cityDelete = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const get = yield (0, exports.getCitybyId)(id);
        yield prisma.city.delete({
            where: {
                id: id
            }
        });
        return {
            code: 200, status: "success",
            message: `${get.message.cityName} city deleted`
        };
    }
    catch (e) {
        return { code: 500, status: 'error', message: e.message };
    }
});
exports.cityDelete = cityDelete;
const getCityWithStateCountry = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return {
            code: 200, status: "success",
            message: yield prisma.city.findMany({
                select: {
                    id: true,
                    cityName: true,
                    status: true,
                    state: {
                        select: {
                            stateName: true,
                            country: {
                                select: {
                                    CounrtyName: true
                                }
                            }
                        },
                    }
                },
                orderBy: {
                    createAt: "desc"
                },
            })
        };
    }
    catch (e) {
        return { code: 500, status: 'error', message: e.message };
    }
});
exports.getCityWithStateCountry = getCityWithStateCountry;
