const {insertData, getRecordsByKey} = require("../db/dynamodb");
const {validateAddCourseJoi} = require("../joi");
const addOptedCourses = async (request) => {
    try {
        const userId = request?.pathParams?.id;
        const validatedUserData = validateAddCourseJoi(request)
        const optedCourseTableData = await getRecordsByKey('OptedCourses', null, null, 'courseId', validatedUserData.id, "id, course_name, userId, createdAt, updatedAt", true, true)
        if (!Array.isArray(optedCourseTableData?.data) && optedCourseTableData.data.length !== 0) {
            return {
                status: 400,
                message: "There is already a opted course connected with that courseId!",
                data: null,
            }
        }

        const courseTableData = await getRecordsByKey('Courses', null, null, 'id', validatedUserData.id, "id, course_name", true, true)
        if (courseTableData.data.length === 0) {
            return {
                status: 400,
                message: "Record with that Course ID not found!",
                data: null,
            }
        }

        let courseData = {
            userId: userId,
            courseId: validatedUserData?.id,
        }

        await insertData('OptedCourses', courseData, false, true)
        return {
            status: 200,
            message: "Opted Course Added Successfully!",
            data: validatedUserData.id,
        }
    } catch (error) {
        console.error(">>> Post OptedCourses Error:", error)
        return []
    }
}

module.exports = {
    addOptedCourses
}