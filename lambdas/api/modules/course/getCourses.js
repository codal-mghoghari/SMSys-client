const {getAllRecords} = require("../db/dynamodb");

const getCourses = async (request) => {
    try {
        const {limit} = request.queryString
        const {returnAttr} = request?.body
        return await getAllRecords('Courses', null, limit ? parseInt(limit) : null, returnAttr ? returnAttr : null)
    } catch (error) {
        console.error(">>> GetCourse Error:", error)
        return []

    }
}

module.exports = {
    getCourses
}