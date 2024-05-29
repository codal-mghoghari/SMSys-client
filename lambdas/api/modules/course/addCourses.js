const {insertData, getRecordsByKey} = require("../db/dynamodb");
const {validateAddCourseJoi} = require("../joi");
const addCourses = async (request) => {
    try {
        const validatedUserData = validateAddCourseJoi(request)
        const courseTableData = await getRecordsByKey('Courses', null,  null, 'course_name', validatedUserData?.course_name, "id, course_name, createdAt, updatedAt", true, true)
        if (courseTableData.data.length !== 0) {
            return {
                status: 400,
                message: "There is already a course with same name!",
                data: null,
            }
        }
        await insertData('Courses', validatedUserData, false, true)
        return {
            status: 200,
            message: "Course Added Successfully!",
            data: validatedUserData.course_name
        }
    } catch (error) {
        console.error(">>> AddCourse Error:", error)
        return []
    }
}

module.exports = {
    addCourses
}