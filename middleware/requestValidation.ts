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