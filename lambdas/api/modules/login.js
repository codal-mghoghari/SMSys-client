const {sendCustomHttpResponse, parseRequest} = require("./utils");
const {getRecordsByKey, insertData} = require("./db/dynamodb");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const loginUser = async (request) => {
    try {
        const {authorizer} = await parseRequest(request)
        console.log(">>> Login User - tokenDecoded: ", authorizer)
        const tableData = await getRecordsByKey('Users', null, 1, 'email', authorizer?.email, "id, email, password, createdAt, updatedAt, entry_test")
        if (tableData.data.length !== 0) {
            const data = Object.assign({}, ...tableData.data)
            if (bcrypt.compareSync(request.body?.password, data.password)) {
                delete data.password
                const token = jwt.sign(
                    {data},
                    process.env.SECRETKEY,
                    {expiresIn: "1d"} // 1 day it will expire
                );
                await insertData('UserAuth', {
                    userId: data.id,
                    token: token
                })
                return sendCustomHttpResponse(
                    {
                        message: "ok",
                        data: token
                    },
                    {},
                    200
                )
            }
            return sendCustomHttpResponse(
                {
                    message: "Incorrect Password!",
                },
                {},
                400
            )
        }
        return sendCustomHttpResponse(
            {
                message: "User Not Found!",
            },
            {},
            404
        )

    } catch (error) {
        console.error(error)
    }

}

module.exports = {
    loginUser
}