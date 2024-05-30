const {getRecordsByKey} = require("../db/dynamodb");
const getCourseByUserId = async (request) => {
    try {
        const {limit} = request?.queryString
        const id = request?.pathParams?.id
        const {returnAttr} = request?.body
        return await getRecordsByKey('OptedCourses', null, limit ? parseInt(limit) : null, "userId", id, returnAttr ? returnAttr : null)
    } catch (error) {
        console.error(">>> Post OptedCourses Error:", error)
        return []
    }
}

module.exports = {
    getCourseByUserId
}