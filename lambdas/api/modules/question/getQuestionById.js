const {getRecordsByKey} = require("../db/dynamodb");
const getQuestionById = async (request) => {
    try {
        const {limit, include} = request?.queryString
        const id = request?.pathParams?.id
        return await getRecordsByKey('Questions', null, limit ? parseInt(limit) : null, "id", id, include ? include : null)
    } catch (error) {
        console.error(">>> GetQuestionById Error:", error)
        return []
    }
}

module.exports = {
    getQuestionById
}