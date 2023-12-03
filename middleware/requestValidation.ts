import Joi from "joi";

export const AdminRegistration = Joi.object({
  name: Joi.string().required().min(3),
  email: Joi.string().email().required(),
  phone: Joi.string().required().length(10),
  password: Joi.string().alphanum().required().min(8),
  confirmPassword: Joi.string()
    .valid(Joi.ref("password"))
    .alphanum()
    .required(),
});

export const AdminLogin = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().alphanum().required(),
});

export const countryCreateSchema = Joi.object({
  country: Joi.string().required(),
});

export const countryIdSchema = Joi.object({
  id: Joi.string().uuid().required(),
});
export const countryUpdateSchema = Joi.object({
  countryId: Joi.string().uuid().required(),
  status: Joi.boolean().required(),
});
export const stateCreateSchema = Joi.object({
  countryId: Joi.string().uuid().required(),
  state: Joi.string().required(),
});

export const stateGetSchema = Joi.object({
  countryId: Joi.string().uuid().required(),
});

export const stateUpdateSchema = Joi.object({
  stateId: Joi.string().uuid().required(),
  status: Joi.boolean().required(),
});
export const stateIdSchema = Joi.object({
  id: Joi.string().uuid().required(),
});
export const cityCreateSchema = Joi.object({
  countryId: Joi.string().uuid().required(),
  stateId: Joi.string().uuid().required(),
  city: Joi.string().required(),
});

export const cityGetSchema = Joi.object({
  countryId: Joi.string().uuid().required(),
  stateId: Joi.string().uuid().required(),
});
export const cityUpdateSchema = Joi.object({
  cityId: Joi.string().uuid().required(),
  status: Joi.boolean().required(),
});
export const cityIdSchema = Joi.object({
  id: Joi.string().uuid().required(),
});

export const InstituteCreateSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  phone: Joi.string().length(10).required(),
  password: Joi.string().required(),
  confirmPassword: Joi.string().valid(Joi.ref("password")).required(),
  country: Joi.string().uuid().required(),
  state: Joi.string().uuid().required(),
  city: Joi.string().uuid().required(),
  profileImg: Joi.string().optional(),
  address: Joi.string().required(),
  pin: Joi.string().length(6).required(),
});

export const InstituteUpdateStatusSchema = Joi.object({
  id: Joi.string().uuid().required(),
  status: Joi.boolean().required(),
});
export const InstituteDeleteSchema = Joi.object({
  id: Joi.string().uuid().required(),
});
export const instituteCreateStudentSchema = Joi.object({
  firstname: Joi.string().required(),
  lastname: Joi.string().required(),
  email: Joi.string().email().required(),
  phone: Joi.string().length(10).required(),
  dob: Joi.date().required(),
  gender: Joi.string().valid("male", "female", "other").required(),
  country: Joi.string().uuid().required(),
  state: Joi.string().uuid().required(),
  city: Joi.string().uuid().required(),
  profileImg: Joi.string().optional(),
  address: Joi.string().required(),
  pin: Joi.string().length(6).required(),
});

export const instituteCourseCreateSchema = Joi.object({
  name: Joi.string().required(),
  amount: Joi.number().required(),
  image: Joi.string().optional(),
  description: Joi.string().required(),
  durantion: Joi.number().required(),
});
export const instituteCourseStatusSchema = Joi.object({
  status: Joi.boolean().required(),
});
export const instituteSubCourseCreateSchema = Joi.object({
  name: Joi.string().required(),
  amount: Joi.number().required(),
  image: Joi.string().optional(),
  description: Joi.string().required(),
  durantion: Joi.number().required(),
});
export const instituteSubCourseStatusSchema = Joi.object({
  status: Joi.boolean().required(),
});
export const instituteBatchCreateSchema = Joi.object({
  fk_course_id: Joi.string().uuid().required(),
  name: Joi.string().required(),
  start_time: Joi.string()
    .regex(/^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/)
    .required(),
  end_time: Joi.string()
    .regex(/^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/)
    .required(),
  weekdays: Joi.string().required(),
});
export const instituteBatchStatusSchema = Joi.object({
  status: Joi.boolean().required(),
});
export const instituteBatchLinkCreateSchema = Joi.object({
  fk_student_id: Joi.string().uuid().required(),
  fk_batch_id: Joi.string().uuid().required(),
});
export const instituteCourselink = Joi.object({
  fk_course_id: Joi.string().uuid().required(),
  subCourse: Joi.required(),
});

export const instituteAssignmentMasterCreate = Joi.object({
  name: Joi.string().min(3).required(),
  end_date: Joi.string().required(),
  fk_assignment_type: Joi.string().uuid().required(),
});
export const instituteAssignmentTypeCreate = Joi.object({
  name: Joi.string().min(3).required(),
  status: Joi.boolean().required(),
});

export const instituteAssignmentMasterEdit = Joi.object({
  end_date: Joi.string().required(),
});

export const instituteAssignmentWotkCreate = Joi.object({
  fk_assignmentmaster_id: Joi.string().uuid().required(),
  fk_sub_course_id: Joi.string().uuid().required(),
  remarks: Joi.string().min(3).optional(),
  submissionDate: Joi.string().required(),
  work: Joi.string().uri().required(),
});

export const ZoomMeetingCreateSchema = Joi.object({
  topic: Joi.string().min(3).required(),
  start_time: Joi.string().required(),
  duration: Joi.number().required(),
  password: Joi.string().min(3).optional(),
});
export const instituteBatchTeacher = Joi.object({
  fkTeacherId: Joi.string().uuid().required(),
  fkBatchId: Joi.string().uuid().required(),
});

export const eventsCreateSchema = Joi.object({
  name: Joi.string().uuid().required(),
  category: Joi.string().min(2).required(),
  isleave: Joi.boolean().required(),
  date: Joi.date().required(),
});

export const createBatchAssignemntSchema = Joi.object({
  contents: Joi.optional(),
  fk_batch_id: Joi.string().uuid().required(),
  submission_date: Joi.date().required(),
  media: Joi.optional(),
  name: Joi.string().required(),
});

export const createStudentBatchAssignemntSchema = Joi.object({
  contents: Joi.optional(),
  fk_assignment_id: Joi.string().uuid().required(),
  media: Joi.optional(),
});
