const jwt = require("jsonwebtoken");
const joi = require('joi')
const Joi = require("joi");

const sendCustomHttpResponse = (body, headers, code, multiValueHeaders = null) => {
    return new global.apiBuilder.ApiResponse(body, headers, code, multiValueHeaders)
}

const notFoundDefault = async () => {
    return sendCustomHttpResponse(
        {
            message: 'Not Found.',
            http_code: 404,
        },
        {},
        400
    )
}

const badRequest = async (msg, errorMsg, code) => {
    return sendCustomHttpResponse(
        {
            message: msg,
            error: errorMsg ?? 'Error',
            http_code: code ?? 400,
        },
        {},
        code ?? 400
    )
}


const unAuthorized = async (msg) => {
    return sendCustomHttpResponse(
        {
            message: msg,
            error: 'Unauthorized',
            http_code: 401,
        },
        {},
        401
    )
}

const badRequestErrorDetails = async (msg, details) => {
    return sendCustomHttpResponse(
        {
            message: msg,
            error: details,
            http_code: 400,
        },
        {},
        400
    )
}

const notFoundResponse = async (msg, errorMsg) => {
    return sendCustomHttpResponse(
        {
            message: msg,
            error: errorMsg ?? 'Error',
            http_code: 404,
        },
        {},
        400
    )
}

const noRecordFound = async () => {
    return sendCustomHttpResponse(
        {
            message: 'No Records Found.',
        },
        {},
        204
    )
}

const successResponse = async (msg, data) => {
    return sendCustomHttpResponse(
        {
            message: msg,
            data: data,
        },
        {},
        200
    )
}

async function jwtValidation(token) {
    try {
        const secret = process.env.SECRETKEY;
        const tokenDecoded = jwt.verify(token, secret);
        if (process.env.NODE_ENV !== "test" && Date.now() >= tokenDecoded.exp * 1000) {
            return {status: 401, message: "Unauthorized"}
        }
        return tokenDecoded
    } catch (e) {
        return {status: 500, message: e}
    }
}


const parseRequest = async (request) => {
    const { proxyRequest = {}, body = {} } = request
    const { requestContext = {} } = proxyRequest
    let { authorizer = {} } = requestContext

    const localENV = process.env.NODE_ENV === 'dev'
    if (localENV) {
        try {
            const token = request?.headers?.Authorization.replace('Bearer ', '')
            if (token) {
                authorizer = await jwtValidation(token)
            }
        } catch (error) {
            console.error('>>>>>: error', error)
        }
    }
    return {
        authorizer,
        data: { ...body, ...request.queryString, ...body.data },
    }
}

const validateRegisterJoi = (request) => {
    const joiSchema = Joi.object({
        email: Joi
            .string()
            .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
            .required(),
        password: Joi
            .string()
            .min(6)
            .required()
    })
    const {error, value} = joiSchema.validate(request?.body)
    if(error){
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
    parseRequest,
    sendCustomHttpResponse,
    notFoundDefault,
    badRequest,
    noRecordFound,
    unAuthorized,
    badRequestErrorDetails,
    notFoundResponse,
    successResponse,
    validateRegisterJoi,
}