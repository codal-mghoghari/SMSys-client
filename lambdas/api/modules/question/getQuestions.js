const {getAllRecords} = require("../db/dynamodb");
const {parseRequest, checkUserExists} = require("../utils");

const getQuestions = async (request) => {
    try {
        const {authorizer} = parseRequest(request)
        const validToken = await checkUserExists(authorizer)
        if (!validToken) {
            return []
        }
        const {limit, include} = request.queryString
        return await getAllRecords('Questions', null, limit ? parseInt(limit) : null, include ? include : null)
    } catch (error) {
        console.error(">>> GetQuestions Error:", error)
        return []
    }
}

module.exports = {
    getQuestions
}