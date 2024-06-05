const {getRecordsByKey} = require("../db/dynamodb");
const getCourseById = async (request) => {
    try {
        const {limit, include} = request?.queryString
        const id = request?.pathParams?.id
        return await getRecordsByKey('Courses', null, limit ? parseInt(limit) : null, "id", id, include ? include : null)
    } catch (error) {
        console.error(">>> Get CoursesById Error:", error)
        return []
    }
}

module.exports = {
    getCourseById
}