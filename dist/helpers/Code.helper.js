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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.instituteCode = void 0;
const moment_1 = __importDefault(require("moment"));
const institute_1 = require("../model/institute/institute");
const instituteCode = () => __awaiter(void 0, void 0, void 0, function* () {
    let year = (0, moment_1.default)().format("YY");
    let nextyear = (0, moment_1.default)().add(1, "y").format("YY");
    let fy = `FY${year}${nextyear}`;
    let getAllCodes = yield (0, institute_1.getAllCode)(fy);
    if ((getAllCodes === null || getAllCodes === void 0 ? void 0 : getAllCodes.message.length) === 0) {
        return `${fy}001`;
    }
    let allcode = getAllCodes.message;
    let codeNumber = [];
    allcode.map((e) => {
        codeNumber.push(parseInt(e.code.slice(6)));
    });
    let highestNum = Math.max(...codeNumber) + 1;
    highestNum = highestNum.toString();
    if (highestNum.length === 1) {
        return `${fy}00${highestNum}`;
    }
    else if (highestNum.length === 2) {
        return `${fy}0${highestNum}`;
    }
    else {
        return `${fy}${highestNum}`;
    }
});
exports.instituteCode = instituteCode;
