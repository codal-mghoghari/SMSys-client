const {insertData, getRecordsByKey} = require("../db/dynamodb");
const {validateAddCourseJoi} = require("../joi");
const addRecommCourses = async (request) => {
    try {
        const userId = request?.pathParams?.id;
        const validatedUserData = validateAddCourseJoi(request)
        const courseTableData = await getRecordsByKey('RecommCourses', null, null, 'userId', userId, "id, course_name, userId, createdAt, updatedAt", true, true)
        if (!Array.isArray(courseTableData?.data) && courseTableData.totalLength !== 0) {
            return {
                status: 400,
                message: "There is already a recommended course connected with that userId!",
                data: null,
            }
        }
        await insertData('RecommCourses', {
            userId: userId,
            ...validatedUserData
        }, false, true)
        return {
            status: 200,
            message: "Recommended Course Added Successfully!",
            data: validatedUserData.course_name,
        }
    } catch (error) {
        console.error(">>> Post RecommCourse Error:", error)
        return []
    }
}

module.exports = {
    addRecommCourses
}