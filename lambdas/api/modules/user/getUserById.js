const {getRecordsByKey} = require("../db/dynamodb");
const getUserById = async (request) => {
    try {
        const {limit, include} = request?.queryString
        const id = request?.pathParams?.id
        return await getRecordsByKey('Users', null, limit ? parseInt(limit) : null, "id", id, include ? include : null, false, false, true)
    } catch (error) {
        console.error(">>> Post UsersById Error:", error)
        return []
    }
}

module.exports = {
    getUserById
}