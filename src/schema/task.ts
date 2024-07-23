import Joi from "joi";

export const GetTaskQuerySchema = Joi.object({
    q: Joi.string().optional()
    .options({
        stripUnknown:true,
    }
    ),
});

export const createTaskBodySchema = Joi.object({
    title: Joi.string().required().messages({
        'any.required':"Title is required",
}).options({
    stripUnknown:true,
}),
})

export const updateTaskBodySchema = Joi.object({
    title: Joi.string().messages({
        'any.required':"Title is required",
    }),
    completed: Joi.boolean()
}).options({
    stripUnknown:true,
})
