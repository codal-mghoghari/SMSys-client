const {parseRequest, checkUserExists} = require("../utils");
const {getAllRecords} = require("../db/dynamodb");
const getOptedCourses = async (request) => {
    try {
        const {authorizer} = parseRequest(request)
        const validToken = await checkUserExists(authorizer)
        if (!validToken) {
            return []
        }
        const {returnAttr} = request?.body
        const {limit} = request.queryString
        return await getAllRecords('OptedCourses', null, limit ? parseInt(limit) : null, returnAttr ? returnAttr : null)
    } catch (error) {
        console.error(">>> Get OptedCourses Error:", error)
        return []
    }
}

module.exports = {
    getOptedCourses
}