const {getRecordsByKey} = require("../db/dynamodb");
const getQuestionById = async (request) => {
    try {
        const {limit} = request?.queryString
        const id = request?.pathParams?.id
        const {returnAttr} = request?.body
        return await getRecordsByKey('Questions', null, limit ? parseInt(limit) : null, "id", id, returnAttr ? returnAttr : null)
    } catch (error) {
        console.error(">>> GetQuestionById Error:", error)
        return []
    }
}

module.exports = {
    getQuestionById
}