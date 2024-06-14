const jwt = require("jsonwebtoken");
const {getRecordsByKey} = require("./db/dynamodb");

const sendCustomHttpResponse = (body, headers, code, multiValueHeaders = null) => {
    let minimalHeaders = {
        "Access-Control-Allow-Origin": "*",
    }
    return new global.apiBuilder.ApiResponse(body, minimalHeaders, code, multiValueHeaders)
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
    const {proxyRequest = {}, body = {}} = request
    const {requestContext = {}} = proxyRequest
    let {authorizer = {}} = requestContext

    const localENV = process.env.NODE_ENV === 'dev'
    if (localENV) {
        try {
            const token = request?.headers?.Authorization.replace('Bearer ', '')
            if (token) {
                authorizer = await jwtValidation(token)
            }
        } catch (error) {
            console.error('>>>>>: Auth Error', error)
        }
    }
    console.log(">>>> Authorizer: ", {
        authorizer,
    })
    return {
        authorizer,
        data: {...body, ...request.queryString, ...body.data},
    }
}

const checkUserExists = async (data) => {
    if (data === (null | undefined) || data?.length === 0) return false
    const tableData = await getRecordsByKey('Users', null, 1, 'email', data?.email, "id, first_name, last_name, email, password, createdAt, updatedAt, entryTest")
    return tableData?.data.length === 0;
}

const checkTokenExpired = (token) => {
    if (token === (null | undefined) || token?.length === 0) return false
    try {
        const tokenDecoded = jwt.verify(token, process.env.SECRETKEY);
        return (Date.now() >= tokenDecoded?.exp * 1000);
    } catch (err) {
        if (err instanceof jwt.TokenExpiredError) return true
        console.error(">>> checkTokenExpired error:", err)
        return err
    }
}

module.exports = {
    parseRequest,
    checkUserExists,
    checkTokenExpired,
    sendCustomHttpResponse,
    notFoundDefault,
    badRequest,
    noRecordFound,
    unAuthorized,
    badRequestErrorDetails,
    notFoundResponse,
    successResponse,
}