const {sendCustomHttpResponse, parseRequest, validateRegisterJoi} = require("./utils");
const {getRecordsByKey, insertData} = require("./db/dynamodb");
const jwt = require("jsonwebtoken");

const loginUser = async (request) => {
    try {
        console.log(">>> Login User - request.body: ", request?.body)
        const usersTableData = await getRecordsByKey('Users', null, 1, 'email', request?.body?.email, "id, email, password, createdAt, updatedAt, entryTest, user_role")
        const userData = Object.assign({}, ...usersTableData.data)
        if (usersTableData.data.length !== 0) {
            const userAuthTableData = await getRecordsByKey('UserAuth', null, 1, 'userId', userData.id, "userId, user_token, expiresAt", false)
            const userAuthData = Object.assign({}, ...userAuthTableData.data)
            if (request.body?.password === userData.password) {
                let isExpired = userAuthTableData.data.length !== 0 ? (Date.now() >= userAuthData.data?.expiresAt) : true
                if (isExpired && userAuthTableData.data.length === 0) {
                    delete userData.password
                    const token = jwt.sign(
                        {userData},
                        process.env.SECRETKEY,
                        {expiresIn: "1d"} // 1 day it will expire
                    );
                    await insertData('UserAuth', {
                        userId: userData.id,
                        user_token: token
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
                } else {
                    return sendCustomHttpResponse(
                        {
                            status: 200,
                            message: "Logged-in successfully!",
                            data: userAuthData?.user_token
                        },
                        {},
                        200
                    )
                }

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
        const tableData = await getRecordsByKey('Users', null, 1, 'email', validatedUserData?.email, "id, email, password, createdAt, updatedAt, entryTest")
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
        await insertData('Users', {
            ...validatedUserData,
            entryTest: 0,
            user_role: 1,
        }, false, true)
        return sendCustomHttpResponse(
            {
                status: 200,
                message: "User Registered successfully!",
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