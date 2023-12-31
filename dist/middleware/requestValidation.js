"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createStudentBatchAssignemntSchema = exports.createBatchAssignemntSchema = exports.eventsCreateSchema = exports.instituteBatchTeacher = exports.ZoomMeetingCreateSchema = exports.instituteAssignmentWotkCreate = exports.instituteAssignmentMasterEdit = exports.instituteAssignmentTypeCreate = exports.instituteAssignmentMasterCreate = exports.instituteCourselink = exports.instituteBatchLinkCreateSchema = exports.instituteBatchStatusSchema = exports.instituteBatchCreateSchema = exports.instituteSubCourseStatusSchema = exports.instituteSubCourseCreateSchema = exports.instituteCourseStatusSchema = exports.instituteCourseCreateSchema = exports.instituteCreateStudentSchema = exports.InstituteDeleteSchema = exports.InstituteUpdateStatusSchema = exports.InstituteCreateSchema = exports.cityIdSchema = exports.cityUpdateSchema = exports.cityGetSchema = exports.cityCreateSchema = exports.stateIdSchema = exports.stateUpdateSchema = exports.stateGetSchema = exports.stateCreateSchema = exports.countryUpdateSchema = exports.countryIdSchema = exports.countryCreateSchema = exports.AdminLogin = exports.AdminRegistration = void 0;
const joi_1 = __importDefault(require("joi"));
exports.AdminRegistration = joi_1.default.object({
    name: joi_1.default.string().required().min(3),
    email: joi_1.default.string().email().required(),
    phone: joi_1.default.string().required().length(10),
    password: joi_1.default.string().alphanum().required().min(8),
    confirmPassword: joi_1.default.string()
        .valid(joi_1.default.ref("password"))
        .alphanum()
        .required(),
});
exports.AdminLogin = joi_1.default.object({
    email: joi_1.default.string().email().required(),
    password: joi_1.default.string().alphanum().required(),
});
exports.countryCreateSchema = joi_1.default.object({
    country: joi_1.default.string().required(),
});
exports.countryIdSchema = joi_1.default.object({
    id: joi_1.default.string().uuid().required(),
});
exports.countryUpdateSchema = joi_1.default.object({
    countryId: joi_1.default.string().uuid().required(),
    status: joi_1.default.boolean().required(),
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
    status: joi_1.default.boolean().required(),
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
    status: joi_1.default.boolean().required(),
});
exports.cityIdSchema = joi_1.default.object({
    id: joi_1.default.string().uuid().required(),
});
exports.InstituteCreateSchema = joi_1.default.object({
    name: joi_1.default.string().required(),
    email: joi_1.default.string().email().required(),
    phone: joi_1.default.string().length(10).required(),
    password: joi_1.default.string().required(),
    confirmPassword: joi_1.default.string().valid(joi_1.default.ref("password")).required(),
    country: joi_1.default.string().uuid().required(),
    state: joi_1.default.string().uuid().required(),
    city: joi_1.default.string().uuid().required(),
    profileImg: joi_1.default.string().optional(),
    address: joi_1.default.string().required(),
    pin: joi_1.default.string().length(6).required(),
});
exports.InstituteUpdateStatusSchema = joi_1.default.object({
    id: joi_1.default.string().uuid().required(),
    status: joi_1.default.boolean().required(),
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
    gender: joi_1.default.string().valid("male", "female", "other").required(),
    country: joi_1.default.string().uuid().required(),
    state: joi_1.default.string().uuid().required(),
    city: joi_1.default.string().uuid().required(),
    profileImg: joi_1.default.string().optional(),
    address: joi_1.default.string().required(),
    pin: joi_1.default.string().length(6).required(),
});
exports.instituteCourseCreateSchema = joi_1.default.object({
    name: joi_1.default.string().required(),
    amount: joi_1.default.number().required(),
    image: joi_1.default.string().optional(),
    description: joi_1.default.string().required(),
    durantion: joi_1.default.number().required(),
});
exports.instituteCourseStatusSchema = joi_1.default.object({
    status: joi_1.default.boolean().required(),
});
exports.instituteSubCourseCreateSchema = joi_1.default.object({
    name: joi_1.default.string().required(),
    amount: joi_1.default.number().required(),
    image: joi_1.default.string().optional(),
    description: joi_1.default.string().required(),
    durantion: joi_1.default.number().required(),
});
exports.instituteSubCourseStatusSchema = joi_1.default.object({
    status: joi_1.default.boolean().required(),
});
exports.instituteBatchCreateSchema = joi_1.default.object({
    fk_course_id: joi_1.default.string().uuid().required(),
    name: joi_1.default.string().required(),
    start_time: joi_1.default.string()
        .regex(/^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/)
        .required(),
    end_time: joi_1.default.string()
        .regex(/^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/)
        .required(),
    weekdays: joi_1.default.string().required(),
});
exports.instituteBatchStatusSchema = joi_1.default.object({
    status: joi_1.default.boolean().required(),
});
exports.instituteBatchLinkCreateSchema = joi_1.default.object({
    fk_student_id: joi_1.default.string().uuid().required(),
    fk_batch_id: joi_1.default.string().uuid().required(),
});
exports.instituteCourselink = joi_1.default.object({
    fk_course_id: joi_1.default.string().uuid().required(),
    subCourse: joi_1.default.required(),
});
exports.instituteAssignmentMasterCreate = joi_1.default.object({
    name: joi_1.default.string().min(3).required(),
    end_date: joi_1.default.string().required(),
    fk_assignment_type: joi_1.default.string().uuid().required(),
});
exports.instituteAssignmentTypeCreate = joi_1.default.object({
    name: joi_1.default.string().min(3).required(),
    status: joi_1.default.boolean().required(),
});
exports.instituteAssignmentMasterEdit = joi_1.default.object({
    end_date: joi_1.default.string().required(),
});
exports.instituteAssignmentWotkCreate = joi_1.default.object({
    fk_assignmentmaster_id: joi_1.default.string().uuid().required(),
    fk_sub_course_id: joi_1.default.string().uuid().required(),
    remarks: joi_1.default.string().min(3).optional(),
    submissionDate: joi_1.default.string().required(),
    work: joi_1.default.string().uri().required(),
});
exports.ZoomMeetingCreateSchema = joi_1.default.object({
    topic: joi_1.default.string().min(3).required(),
    start_time: joi_1.default.string().required(),
    duration: joi_1.default.number().required(),
    password: joi_1.default.string().min(3).optional(),
});
exports.instituteBatchTeacher = joi_1.default.object({
    fkTeacherId: joi_1.default.string().uuid().required(),
    fkBatchId: joi_1.default.string().uuid().required(),
});
exports.eventsCreateSchema = joi_1.default.object({
    name: joi_1.default.string().uuid().required(),
    category: joi_1.default.string().min(2).required(),
    isleave: joi_1.default.boolean().required(),
    date: joi_1.default.date().required(),
});
exports.createBatchAssignemntSchema = joi_1.default.object({
    contents: joi_1.default.optional(),
    fk_batch_id: joi_1.default.string().uuid().required(),
    submission_date: joi_1.default.date().required(),
    media: joi_1.default.optional(),
    name: joi_1.default.string().required(),
});
exports.createStudentBatchAssignemntSchema = joi_1.default.object({
    contents: joi_1.default.optional(),
    fk_assignment_id: joi_1.default.string().uuid().required(),
    media: joi_1.default.optional(),
});
