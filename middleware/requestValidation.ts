import Joi from "joi";

export const AdminRegistration = Joi.object({
    name: Joi.string().required().min(3),
    email: Joi.string().email().required(),
    phone: Joi.string().required().length(10),
    password: Joi.string().alphanum().required().min(8),
    confirmPassword: Joi.string().valid(Joi.ref('password')).alphanum().required()
})

export const AdminLogin = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().alphanum().required()
})

export const countryCreateSchema = Joi.object({
    country: Joi.string().required(),
})

export const countryIdSchema = Joi.object({
    id: Joi.string().uuid().required(),
})
export const countryUpdateSchema = Joi.object({
    countryId: Joi.string().uuid().required(),
    status: Joi.boolean().required()
})
export const stateCreateSchema = Joi.object({
    countryId: Joi.string().uuid().required(),
    state: Joi.string().required(),
})

export const stateGetSchema = Joi.object({
    countryId: Joi.string().uuid().required(),
})

export const stateUpdateSchema = Joi.object({
    stateId: Joi.string().uuid().required(),
    status: Joi.boolean().required()
})
export const stateIdSchema = Joi.object({
    id: Joi.string().uuid().required(),
})
export const cityCreateSchema = Joi.object({
    countryId: Joi.string().uuid().required(),
    stateId: Joi.string().uuid().required(),
    city: Joi.string().required(),
})

export const cityGetSchema = Joi.object({
    countryId: Joi.string().uuid().required(),
    stateId: Joi.string().uuid().required(),
})
export const cityUpdateSchema = Joi.object({
    cityId: Joi.string().uuid().required(),
    status: Joi.boolean().required()
})
export const cityIdSchema = Joi.object({
    id: Joi.string().uuid().required(),
})

export const InstituteCreateSchema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    phone: Joi.string().length(10).required(),
    password: Joi.string().required(),
    confirmPassword: Joi.string().valid(Joi.ref('password')).required(),
    country: Joi.string().uuid().required(),
    state: Joi.string().uuid().required(),
    city: Joi.string().uuid().required(),
    profileImg: Joi.string().optional(),
    address: Joi.string().required(),
    pin: Joi.string().length(6).required()
})

export const InstituteUpdateStatusSchema = Joi.object({
    id: Joi.string().uuid().required(),
    status: Joi.boolean().required()
})
export const InstituteDeleteSchema = Joi.object({
    id: Joi.string().uuid().required(),
})
export const instituteCreateStudentSchema = Joi.object({
    firstname: Joi.string().required(),
    lastname: Joi.string().required(),
    email: Joi.string().email().required(),
    phone: Joi.string().length(10).required(),
    dob: Joi.date().required(),
    gender: Joi.string().valid('male', 'female', 'other').required(),
    country: Joi.string().uuid().required(),
    state: Joi.string().uuid().required(),
    city: Joi.string().uuid().required(),
    profileImg: Joi.string().optional(),
    address: Joi.string().required(),
    pin: Joi.string().length(6).required()
})

export const instituteCourseCreateSchema = Joi.object({
    name:Joi.string().required(),
    amount:Joi.number().required(),
    image: Joi.string().optional(),
    description: Joi.string().required(),
    durantion: Joi.number().required(),
})
export const instituteCourseStatusSchema = Joi.object({
    status:Joi.boolean().required()
})
export const instituteSubCourseCreateSchema = Joi.object({
    name:Joi.string().required(),
    amount:Joi.number().required(),
    image: Joi.string().optional(),
    description: Joi.string().required(),
    durantion: Joi.number().required(),
})
export const instituteSubCourseStatusSchema = Joi.object({
    status:Joi.boolean().required()
})
export const instituteBatchCreateSchema = Joi.object({
    fk_course_id: Joi.string().uuid().required(),
    name:Joi.string().required(),
    start_time:Joi.string().regex(/^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/).required(),
    end_time:Joi.string().regex(/^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/).required(),
    weekdays:Joi.string().required(),
});
export const instituteBatchStatusSchema = Joi.object({
    status:Joi.boolean().required()
})
export const instituteBatchLinkCreateSchema = Joi.object({
    fk_student_id: Joi.string().uuid().required(),
    fk_batch_id:Joi.string().uuid().required(),
});
