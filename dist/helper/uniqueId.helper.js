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
exports.studentAddmissionId = void 0;
const moment_1 = __importDefault(require("moment"));
const student_1 = require("../model/student/student");
const _ = require('lodash');
const studentAddmissionId = (code) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    try {
        let prefix = `${code}FY${(0, moment_1.default)().format('YY')}-${(0, moment_1.default)().add(1, 'year').format('YY')}`;
        const getIds = yield (0, student_1.getstudentAddmissionIds)(prefix);
        let maxnum = 0;
        if (getIds) {
            if (((_a = getIds === null || getIds === void 0 ? void 0 : getIds.message) === null || _a === void 0 ? void 0 : _a.length) != 0) {
                let allids = [];
                (_b = getIds === null || getIds === void 0 ? void 0 : getIds.message) === null || _b === void 0 ? void 0 : _b.map((e) => {
                    allids.push(parseInt(removePrefix(e.admissionId, prefix)));
                });
                maxnum = parseInt(_.max(allids)) + 1;
                console.log(allids);
            }
        }
        else {
            maxnum = 0;
        }
        return { status: "success", message: `${prefix}${maxnum}` };
    }
    catch (e) {
        return { status: "error", message: e.message };
    }
});
exports.studentAddmissionId = studentAddmissionId;
function removePrefix(inputString, prefix) {
    if (inputString.startsWith(prefix)) {
        return inputString.slice(prefix.length);
    }
    return inputString;
}
