const {insertData, getRecordsByKey} = require("../db/dynamodb");
const {validateAddCourseJoi} = require("../joi");
const addRecommCourses = async (request) => {
    try {
        const userId = request?.pathParams?.id;
        const validatedUserData = validateAddCourseJoi(request)
        const recommCourseTableData = await getRecordsByKey('RecommCourses', null, null, 'courseId', validatedUserData.id, "id, course_name, userId, createdAt, updatedAt", true, true)
        if (!Array.isArray(recommCourseTableData?.data) && recommCourseTableData.data.length !== 0) {
            return {
                status: 400,
                message: "There is already a Recommended course connected with that CourseId!",
                data: null,
            }
        }

        const courseTableData = await getRecordsByKey('Courses', null, null, 'id', validatedUserData.id, "id, course_name", true, true)
        if (courseTableData.data.length === 0) {
            return {
                status: 400,
                message: "Record with that Recommended Course ID not found!",
                data: null,
            }
        }

        let courseData = {
            userId: userId,
            courseId: validatedUserData?.id,
        }

        await insertData('RecommCourses', courseData, false, true)
        return {
            status: 200,
            message: "Recommended Course Added Successfully!",
            data: validatedUserData.id,
        }
    } catch (error) {
        console.error(">>> Post RecommCourses Error:", error)
        return []
    }
}

module.exports = {
    addRecommCourses
}