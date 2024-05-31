const {parseRequest, checkUserExists} = require("../utils");
const {getAllRecords} = require("../db/dynamodb");
const getRecommCourses = async (request) => {
    try {
        const {authorizer} = parseRequest(request)
        const validToken = await checkUserExists(authorizer)
        if (!validToken) {
            return []
        }
        const {limit, include} = request.queryString
        return await getAllRecords('RecommCourses', null, limit ? parseInt(limit) : null, include ? include : null)
    } catch (error) {
        console.error(">>> Get RecommCourses Error:", error)
        return []
    }
}

module.exports = {
    getRecommCourses
}