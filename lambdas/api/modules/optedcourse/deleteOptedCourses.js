const {getRecordsByKey, deleteDataByPartitionKey} = require("../db/dynamodb");
const {validateAddCourseJoi} = require("../joi");
const deleteOptedCourses = async (request) => {
    try {
        const courseId = request?.pathParams?.id;
        const courseTableData = await getRecordsByKey('OptedCourses', null, null, 'courseId', courseId, "id, course_name, userId, createdAt, updatedAt", true, true, false, "courseId = :id",
            {
                ":id": String(courseId)
            }
        )
        if (courseTableData?.data?.length === 0) {
            return {
                status: 404,
                message: "No records found!",
                data: null,
            }
        }
        await deleteDataByPartitionKey('OptedCourses', "id", courseTableData?.data?.id)
        return {
            status: 200,
            message: "unOpted Course Successfully!",
            data: courseId,
        }
    } catch (error) {
        console.error(">>> Delete deleteOptedCourses Error:", error)
        return []
    }
}

module.exports = {
    deleteOptedCourses
}