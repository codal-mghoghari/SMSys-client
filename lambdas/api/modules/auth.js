const {sendCustomHttpResponse, checkTokenExpired} = require("./utils");
const {getRecordsByKey, insertData, updateData} = require("./db/dynamodb");
const jwt = require("jsonwebtoken");
const {validateRegisterJoi} = require("./joi");

const loginUser = async (request) => {
    try {
        console.log(">>> Login User - request.body: ", request?.body)
        const userData = await getRecordsByKey('Users', null, null, 'email', request?.body?.email, "id, first_name, last_name, email, password, createdAt, updatedAt, entryTest, user_role")
        if (userData?.totalLength !== 0) {
            const userAuthData = await getRecordsByKey('UserAuth', null, 1, 'userId', userData?.data?.id, "id, userId, user_token, expiresAt", false)
            if (request.body?.password === userData?.data?.password) {
                delete userData?.data?.password
                const token = jwt.sign(
                    {...userData?.data},
                    process.env.SECRETKEY,
                    {expiresIn: "1d"} // After 1 day, it will expire
                );
                if (userAuthData.data && userAuthData.totalLength !== 0 && userAuthData?.data?.id) {
                    // If already existing data, just update the row
                    await updateData('UserAuth', "id", userAuthData?.data?.id, 'user_token', token)
                } else {
                    // If no data exist, create one
                    await insertData('UserAuth', {
                        userId: userData?.data?.id,
                        user_token: token
                    }, true, true)
                }
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
        console.error(">>> LoginUser Error:", error)
        return sendCustomHttpResponse(
            {
                status: 500,
                message: "Internal Server Error, please contact administrator!",
            },
            {},
            500
        )
    }
}


const registerUser = async (request) => {
    try {
        const validatedUserData = validateRegisterJoi(request)
        console.log(">>> Register User - validatedUserData: ", validatedUserData)
        const tableData = await getRecordsByKey('Users', null, 1, 'email', validatedUserData?.email, "id, first_name, last_name, email, password, createdAt, updatedAt, entryTest")
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
        console.error(">>> RegisterUser Error:", error)
        return sendCustomHttpResponse(
            {
                status: 500,
                message: "Internal Server Error, please contact administrator!",
            },
            {},
            500
        )
    }
}

module.exports = {
    loginUser,
    registerUser
}