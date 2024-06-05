const {getRecordsByKey} = require("../db/dynamodb");
const getRecommCourseByUserId = async (request) => {
    try {
        const {limit, include} = request?.queryString
        const id = request?.pathParams?.id
        return await getRecordsByKey('RecommCourses', null, limit ? parseInt(limit) : null, "userId", id, include ? include : null)
    } catch (error) {
        console.error(">>> Post RecommCourses Error:", error)
        return []
    }
}

module.exports = {
    getRecommCourseByUserId
}