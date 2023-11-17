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
exports.countryDelete = exports.updateCountry = exports.getCountrybyId = exports.getCountryStateCityAll = exports.createCountry = exports.getActiveCountry = exports.getCountry = exports.checkCountryName = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const checkCountryName = (name) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const get = yield prisma.country.findFirst({
            where: {
                CounrtyName: name
            }
        });
        if (!get) {
            return { code: 200, status: 'error', message: "No Country Name found" };
        }
        return { code: 200, status: 'success', message: get };
    }
    catch (e) {
        let split = e.message.split(".");
        split = split.slice(-2);
        return { code: 500, status: "error", message: split[0] };
    }
});
exports.checkCountryName = checkCountryName;
const getCountry = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return {
            code: 200, status: "success",
            message: yield prisma.country.findMany({
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
exports.getCountry = getCountry;
const getActiveCountry = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return {
            code: 200, status: "success",
            message: yield prisma.country.findMany({
                orderBy: {
                    createAt: "desc"
                },
                where: {
                    status: true
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
exports.getActiveCountry = getActiveCountry;
const createCountry = (name) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let { status } = yield (0, exports.checkCountryName)(name);
        if (status == "success") {
            return { code: 200, status: "error", message: "country name existed" };
        }
        yield prisma.country.create({
            data: {
                CounrtyName: name,
                status: true
            }
        });
        return { code: 200, status: "success", message: "country created successfully" };
    }
    catch (e) {
        let split = e.message.split(".");
        split = split.slice(-2);
        return { code: 500, status: "error", message: split[0] };
    }
});
exports.createCountry = createCountry;
const getCountryStateCityAll = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return {
            code: 200, status: "success",
            message: yield prisma.country.findMany({
                select: {
                    id: true,
                    CounrtyName: true,
                    state: {
                        select: {
                            id: true,
                            stateName: true,
                        }
                    },
                    city: {
                        select: {
                            id: true,
                            cityName: true,
                        }
                    }
                },
                orderBy: {
                    createAt: "desc"
                },
            })
        };
    }
    catch (e) {
        let split = e.message.split(".");
        split = split.slice(-2);
        return { code: 500, status: "error", message: split[0] };
    }
});
exports.getCountryStateCityAll = getCountryStateCityAll;
const getCountrybyId = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        return {
            code: 200, status: "success",
            message: yield prisma.country.findFirstOrThrow({
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
exports.getCountrybyId = getCountrybyId;
const updateCountry = (id, status) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const get = yield (0, exports.getCountrybyId)(id);
        yield prisma.country.update({
            data: {
                status: status
            },
            where: {
                id: id
            }
        });
        return {
            code: 200, status: "success",
            message: `${get.message.CounrtyName} country status updated`
        };
    }
    catch (e) {
        let split = e.message.split(".");
        split = split.slice(-2);
        return { code: 500, status: "error", message: split[0] };
    }
});
exports.updateCountry = updateCountry;
const countryDelete = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const get = yield (0, exports.getCountrybyId)(id);
        yield prisma.country.delete({
            where: {
                id: id
            }
        });
        return {
            code: 200, status: "success",
            message: `${get.message.CounrtyName} country deleted`
        };
    }
    catch (e) {
        let split = e.message.split(".");
        split = split.slice(-2);
        return { code: 500, status: "error", message: split[0] };
    }
});
exports.countryDelete = countryDelete;
