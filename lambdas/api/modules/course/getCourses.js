const {getAllRecords} = require("../db/dynamodb");

const getCourses = async (request) => {
    try {
        const {limit, include} = request.queryString
        return await getAllRecords('Courses', null, limit ? parseInt(limit) : null, include ? include : null)
    } catch (error) {
        console.error(">>> GetCourse Error:", error)
        return []

    }
}

module.exports = {
    getCourses
}