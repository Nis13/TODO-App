import Joi from "joi";

export const GetUserQuerySchema = Joi.object({
    q: Joi.string().optional(),
    page: Joi.number()
    .min(1).optional().messages({
        "number.base":"Page must be a number",
        "number.min": "Size must be greater than or equal to 1",
    }).default(10),

    size:Joi.number().min(1).max(10).optional().messages({
        "number.base": "Size must be number",
        "number.min": "Size must be greater than or equal to 1",
        "number.max": "Size must be less than or equal to 10",
    }).default(10)
    .options({
        stripUnknown:true,
    }
    ),
});

export const createUserBodySchema = Joi.object({
    name: Joi.string().required().messages({
        'any.required':"Name is required",
    }),

    email: Joi.string().email().required().messages({
        "any.required": "Email is required",
        "string.email":"Email must be valid format"
    }),

    password: Joi.string().required().min(8).messages({
        'any.required':'Password is required',
        'string.min':"Password must be atleast 8 character long",
        'password.uppercase':'Password must have at least one uppercase character',
        'password.lowercase':'Password must have at least one lowercase character',
        'password.special':'Password must have at least one special character'
    }).custom((value,helpers)=>{
        if (!/[A-Z]/.test(value)){
            return helpers.error('password.uppercase')
        }
        if (!/[a-z]/.test(value)){
            return helpers.error('password.lowercase')
        }
        if (!/[!@#$%&]/.test(value)){
            return helpers.error('password.special')
        }

        return value;
    }),
}).options({
    stripUnknown:true,
})

export const updateUserBodySchema = Joi.object({
    name: Joi.string(),

    email: Joi.string().email().messages({
        "string.email":"Email must be valid format",
    }),

    password: Joi.string().min(8).messages({
        'string.min':"Password must be atleast 8 character long",
        'password.uppercase':'Password must have at least one uppercase character',
        'password.lowercase':'Password must have at least one lowercase character',
        'password.special':'Password must have at least one special character'
    }).custom((value,helpers)=>{
        if (!/[A-Z]/.test(value)){
            return helpers.error('password.uppercase')
        }
        if (!/[a-z]/.test(value)){
            return helpers.error('password.lowercase')
        }
        if (!/[!@#$%&]/.test(value)){
            return helpers.error('password.special')
        }

        return value;
    }),
}).options({
    stripUnknown:true,
})
