const Joi = require("joi");
const {sendCustomHttpResponse} = require("./utils");
const validateRegisterJoi = (request) => {
    const joiSchema = Joi.object({
        first_name: Joi
            .string()
            .required(),
        last_name: Joi
            .string()
            .required(),
        email: Joi
            .string()
            .email({minDomainSegments: 2, tlds: {allow: ['com', 'net']}})
            .required(),
        password: Joi
            .string()
            .min(6)
            .required()
    })
    const {error, value} = joiSchema.validate(request?.body)
    if (error) {
        const validationErrorMessages = error.details.map((err, i) => {
            let regex = new RegExp(err.context.label)
            let pathOfVariable = err.path.join('.')
            err.message = err.message.replace(regex, pathOfVariable)
            return err.message.replace(/"/g, "'")
        })
        return sendCustomHttpResponse(
            {
                status: 400,
                message: "Validation Error",
                validationErrors: validationErrorMessages
            },
            {},
            400
        )
    }
    return value
}

const validateAddCourseJoi = (request) => {
    const joiSchema = Joi.object({
        id: Joi
            .string()
            .required(),
    })
    const {error, value} = joiSchema.validate(request?.body)
    if (error) {
        const validationErrorMessages = error.details.map((err, i) => {
            let regex = new RegExp(err.context.label)
            let pathOfVariable = err.path.join('.')
            err.message = err.message.replace(regex, pathOfVariable)
            return err.message.replace(/"/g, "'")
        })
        return sendCustomHttpResponse(
            {
                status: 400,
                message: "Validation Error",
                validationErrors: validationErrorMessages
            },
            {},
            400
        )
    }
    return value
}

module.exports = {
    validateAddCourseJoi,
    validateRegisterJoi
}