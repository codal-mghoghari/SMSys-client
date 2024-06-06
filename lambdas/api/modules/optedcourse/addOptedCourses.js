const {insertData, getRecordsByKey} = require("../db/dynamodb");
const {validateAddCourseJoi} = require("../joi");
const addOptedCourses = async (request) => {
    try {
        const userId = request?.pathParams?.id;
        const validatedUserData = validateAddCourseJoi(request)
        const courseTableData = await getRecordsByKey('OptedCourses', null, null, 'userId', userId, "id, course_name, userId, createdAt, updatedAt", true, true)
        if (!Array.isArray(courseTableData?.data) && courseTableData.data.length !== 0) {
            return {
                status: 400,
                message: "There is already a opted course connected with that userId!",
                data: null,
            }
        }
        await insertData('OptedCourses', {
            userId: userId,
            ...validatedUserData
        }, false, true)
        return {
            status: 200,
            message: "Opted Course Added Successfully!",
            data: validatedUserData.course_name,
        }
    } catch (error) {
        console.error(">>> Post OptedCourses Error:", error)
        return []
    }
}

module.exports = {
    addOptedCourses
}