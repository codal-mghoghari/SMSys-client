const {sendCustomHttpResponse, parseRequest, validateRegisterJoi} = require("./utils");
const {getRecordsByKey, insertData} = require("./db/dynamodb");
const jwt = require("jsonwebtoken");

const loginUser = async (request) => {
    try {
        console.log(">>> Login User - request.body: ", request?.body)
        const tableData = await getRecordsByKey('Users', null, 1, 'email', request?.body?.email, "id, email, password, createdAt, updatedAt, entryTest")
        if (tableData.data.length !== 0) {
            const data = Object.assign({}, ...tableData.data)
            if (request.body?.password === data.password) {
                delete data.password
                const token = jwt.sign(
                    {data},
                    process.env.SECRETKEY,
                    {expiresIn: "1d"} // 1 day it will expire
                );
                await insertData('UserAuth', {
                    userId: data.id,
                    token: token
                }, true, true)
                return sendCustomHttpResponse(
                    {
                        status: 200,
                        message: "Logged-in successfully!",
                        data: token
                    },
                    {},
                    200
                )
            }
            return sendCustomHttpResponse(
                {
                    status: 400,
                    message: "Incorrect Password!",
                },
                {},
                400
            )
        }
        return sendCustomHttpResponse(
            {
                status: 404,
                message: "User Not Found!",
            },
            {},
            404
        )

    } catch (error) {
        console.error(error)
    }
}


const registerUser = async (request) => {
    try {
        const validatedUserData = validateRegisterJoi(request)
        console.log(">>> Register User - validatedUserData: ", validatedUserData)
        const tableData = await getRecordsByKey('Users', null, 1, 'email', validatedUserData?.email, "id, email, password, createdAt, updatedAt, entry_test")
        const saveUserData = await insertData('Users', {
            ...validatedUserData,
            entryTest: 0,
            role: 1,
            is_deleted: 0,
        }, false, true)
        if (tableData.data.length !== 0) {
            return sendCustomHttpResponse(
                {
                    status: 400,
                    message: "Already registered user!",
                },
                {},
                400
            )
        }
        return sendCustomHttpResponse(
            {
                status: 200,
                message: "Registered user!",
            },
            {},
            200
        )

    } catch (error) {
        console.error(error)
    }
}

module.exports = {
    loginUser,
    registerUser
}