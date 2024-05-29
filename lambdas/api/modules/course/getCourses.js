const {getAllRecords} = require("../db/dynamodb");

const getCourses = async (request) => {
    try {
        const {limit} = request.queryString
        return await getAllRecords('Courses', null, limit ? parseInt(limit) : null, "id, course_name, createdAt, updatedAt")
    } catch (error) {
        console.error(">>> GetCourse Error:", error)
        return []

    }
}

module.exports = {
    getCourses
}