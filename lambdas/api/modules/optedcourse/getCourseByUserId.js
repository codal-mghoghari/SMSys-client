const {getRecordsByKey} = require("../db/dynamodb");
const getCourseByUserId = async (request) => {
    try {
        const {limit, include} = request?.queryString
        const id = request?.pathParams?.id
        return await getRecordsByKey('OptedCourses', null, limit ? parseInt(limit) : null, "userId", id, include ? include : null)
    } catch (error) {
        console.error(">>> Post OptedCourses Error:", error)
        return []
    }
}

module.exports = {
    getCourseByUserId
}