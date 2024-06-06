const {getRecordsByKey, deleteDataByPartitionKey} = require("../db/dynamodb");
const {validateAddCourseJoi} = require("../joi");
const deleteRecommCourses = async (request) => {
    try {
        const userId = request?.pathParams?.id;
        const validatedUserData = validateAddCourseJoi(request)
        const courseTableData = await getRecordsByKey('RecommCourses', null, null, 'userId', userId, "id, course_name, userId, createdAt, updatedAt", true, true, false, "userId = :value AND course_name = :course",
            {
                ':value': String(userId),
                ":course": String(validatedUserData.course_name)
            }
        )
        if (courseTableData?.data?.length === 0) {
            return {
                status: 404,
                message: "No records found!",
                data: null,
            }
        }
        await deleteDataByPartitionKey('RecommCourses', "id", courseTableData?.data?.id)
        return {
            status: 200,
            message: "Removed Recommended Course Successfully!",
            data: validatedUserData.course_name,
        }
    } catch (error) {
        console.error(">>> Delete RecommCourses Error:", error)
        return []
    }
}

module.exports = {
    deleteRecommCourses
}