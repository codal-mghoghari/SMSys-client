const {sendCustomHttpResponse} = require("../utils");
const {getUsers} = require("./getUsers");
const {getUserById} = require("./getUserById");
const {updateUser} = require("./updateUser");

const Users = async (request) => {
    switch (request?.context?.method) {
        case "GET":
            if (request?.pathParams?.id) {
                // Fetch User by id
                let getUserByIdData = await getUserById(request)
                if (getUserByIdData.data && getUserByIdData.data.length !== 0) {
                    return sendCustomHttpResponse(
                        {
                            status: 200,
                            message: "Record found!",
                            data: getUserByIdData.data,
                            totalLength: getUserByIdData.totalLength
                        },
                        {},
                        200
                    )
                }
                if (getUserByIdData.data && getUserByIdData.data.length === 0) {
                    return sendCustomHttpResponse(
                        {
                            status: 404,
                            message: "No records found!",
                            data: null,
                        },
                        {},
                        404
                    )
                }
            } else {
                // Fetch all users
                let getUserData = await getUsers(request)
                if (getUserData.data && getUserData.data.length !== 0) {
                    return sendCustomHttpResponse(
                        {
                            status: 200,
                            message: "All Users  listed!",
                            data: getUserData.data,
                            totalLength: getUserData.totalLength
                        },
                        {},
                        200
                    )
                }
                if (getUserData.data && getUserData.data.length === 0) {
                    return sendCustomHttpResponse(
                        {
                            status: 404,
                            message: "No records found!",
                            data: null,
                        },
                        {},
                        404
                    )
                }
            }
            return sendCustomHttpResponse(
                {
                    status: 500,
                    message: "Internal Server Error, please contact administrator!",
                    data: getUserData || null,
                },
                {},
                500
            )
        case "POST":
            // Update user field
            let updatedUserField = await updateUser(request)
            if (updatedUserField.data && updatedUserField.data.length !== 0) {
                return sendCustomHttpResponse(
                    {
                        status: 200,
                        message: "Record updated!",
                        data: updatedUserField.data,
                        totalLength: updatedUserField.totalLength
                    },
                    {},
                    200
                )
            }
            if (updatedUserField.data && updatedUserField.data.length === 0) {
                return sendCustomHttpResponse(
                    {
                        status: 404,
                        message: "No records found to update!",
                        data: null,
                    },
                    {},
                    404
                )
            }
            return sendCustomHttpResponse(
                {
                    status: 500,
                    message: "Internal Server Error, please contact administrator!",
                    data: updatedUserField || null,
                },
                {},
                500
            )
        default:
            break;
    }
}

module.exports = {
    Users
}