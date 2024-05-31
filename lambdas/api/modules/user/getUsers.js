const {getAllRecords} = require("../db/dynamodb");

const getUsers = async (request) => {
    try {
        const {limit, include} = request.queryString
        return await getAllRecords('Users', null, limit ? parseInt(limit) : null, include ? include : null, false, true)
    } catch (error) {
        console.error(">>> Get Users Error:", error)
        return []

    }
}

module.exports = {
    getUsers
}