"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.instituteBatchLinkCreateSchema = exports.instituteBatchStatusSchema = exports.instituteBatchCreateSchema = exports.instituteSubCourseStatusSchema = exports.instituteSubCourseCreateSchema = exports.instituteCourseStatusSchema = exports.instituteCourseCreateSchema = exports.instituteCreateStudentSchema = exports.InstituteDeleteSchema = exports.InstituteUpdateStatusSchema = exports.InstituteCreateSchema = exports.cityIdSchema = exports.cityUpdateSchema = exports.cityGetSchema = exports.cityCreateSchema = exports.stateIdSchema = exports.stateUpdateSchema = exports.stateGetSchema = exports.stateCreateSchema = exports.countryUpdateSchema = exports.countryIdSchema = exports.countryCreateSchema = exports.AdminLogin = exports.AdminRegistration = void 0;
const joi_1 = __importDefault(require("joi"));
exports.AdminRegistration = joi_1.default.object({
    name: joi_1.default.string().required().min(3),
    email: joi_1.default.string().email().required(),
    phone: joi_1.default.string().required().length(10),
    password: joi_1.default.string().alphanum().required().min(8),
    confirmPassword: joi_1.default.string().valid(joi_1.default.ref('password')).alphanum().required()
});
exports.AdminLogin = joi_1.default.object({
    email: joi_1.default.string().email().required(),
    password: joi_1.default.string().alphanum().required()
});
exports.countryCreateSchema = joi_1.default.object({
    country: joi_1.default.string().required(),
});
exports.countryIdSchema = joi_1.default.object({
    id: joi_1.default.string().uuid().required(),
});
exports.countryUpdateSchema = joi_1.default.object({
    countryId: joi_1.default.string().uuid().required(),
    status: joi_1.default.boolean().required()
});
exports.stateCreateSchema = joi_1.default.object({
    countryId: joi_1.default.string().uuid().required(),
    state: joi_1.default.string().required(),
});
exports.stateGetSchema = joi_1.default.object({
    countryId: joi_1.default.string().uuid().required(),
});
exports.stateUpdateSchema = joi_1.default.object({
    stateId: joi_1.default.string().uuid().required(),
    status: joi_1.default.boolean().required()
});
exports.stateIdSchema = joi_1.default.object({
    id: joi_1.default.string().uuid().required(),
});
exports.cityCreateSchema = joi_1.default.object({
    countryId: joi_1.default.string().uuid().required(),
    stateId: joi_1.default.string().uuid().required(),
    city: joi_1.default.string().required(),
});
exports.cityGetSchema = joi_1.default.object({
    countryId: joi_1.default.string().uuid().required(),
    stateId: joi_1.default.string().uuid().required(),
});
exports.cityUpdateSchema = joi_1.default.object({
    cityId: joi_1.default.string().uuid().required(),
    status: joi_1.default.boolean().required()
});
exports.cityIdSchema = joi_1.default.object({
    id: joi_1.default.string().uuid().required(),
});
exports.InstituteCreateSchema = joi_1.default.object({
    name: joi_1.default.string().required(),
    email: joi_1.default.string().email().required(),
    phone: joi_1.default.string().length(10).required(),
    password: joi_1.default.string().required(),
    confirmPassword: joi_1.default.string().valid(joi_1.default.ref('password')).required(),
    country: joi_1.default.string().uuid().required(),
    state: joi_1.default.string().uuid().required(),
    city: joi_1.default.string().uuid().required(),
    profileImg: joi_1.default.string().optional(),
    address: joi_1.default.string().required(),
    pin: joi_1.default.string().length(6).required()
});
exports.InstituteUpdateStatusSchema = joi_1.default.object({
    id: joi_1.default.string().uuid().required(),
    status: joi_1.default.boolean().required()
});
exports.InstituteDeleteSchema = joi_1.default.object({
    id: joi_1.default.string().uuid().required(),
});
exports.instituteCreateStudentSchema = joi_1.default.object({
    firstname: joi_1.default.string().required(),
    lastname: joi_1.default.string().required(),
    email: joi_1.default.string().email().required(),
    phone: joi_1.default.string().length(10).required(),
    dob: joi_1.default.date().required(),
    gender: joi_1.default.string().valid('male', 'female', 'other').required(),
    country: joi_1.default.string().uuid().required(),
    state: joi_1.default.string().uuid().required(),
    city: joi_1.default.string().uuid().required(),
    profileImg: joi_1.default.string().optional(),
    address: joi_1.default.string().required(),
    pin: joi_1.default.string().length(6).required()
});
exports.instituteCourseCreateSchema = joi_1.default.object({
    name: joi_1.default.string().required(),
    amount: joi_1.default.number().required(),
    image: joi_1.default.string().optional(),
    description: joi_1.default.string().required(),
    durantion: joi_1.default.number().required(),
});
exports.instituteCourseStatusSchema = joi_1.default.object({
    status: joi_1.default.boolean().required()
});
exports.instituteSubCourseCreateSchema = joi_1.default.object({
    name: joi_1.default.string().required(),
    courseId: joi_1.default.string().uuid().required(),
    amount: joi_1.default.number().required(),
    image: joi_1.default.string().optional(),
    description: joi_1.default.string().required(),
    durantion: joi_1.default.number().required(),
});
exports.instituteSubCourseStatusSchema = joi_1.default.object({
    status: joi_1.default.boolean().required()
});
exports.instituteBatchCreateSchema = joi_1.default.object({
    fk_course_id: joi_1.default.string().uuid().required(),
    name: joi_1.default.string().required(),
});
exports.instituteBatchStatusSchema = joi_1.default.object({
    status: joi_1.default.boolean().required()
});
exports.instituteBatchLinkCreateSchema = joi_1.default.object({
    fk_student_id: joi_1.default.string().uuid().required(),
    fk_batch_id: joi_1.default.string().uuid().required(),
});
