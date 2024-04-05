import Joi from "joi";

const productValidator = Joi.object({
    name: Joi.string().required(),
    category: Joi.string().required(),
    price: Joi.number().required().min(1),
    image: Joi.array().items(Joi.string()),
    gallery: Joi.array().items(Joi.string()),
    description: Joi.string(),
    discount: Joi.number(),
    inStock: Joi.number(),
    featured: Joi.boolean(),
    tags: Joi.array().items(Joi.string())
})

export default productValidator;