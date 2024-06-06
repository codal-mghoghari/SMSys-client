const {sendCustomHttpResponse} = require("../utils");
const {getRecommCourses} = require("./getRecommCourses");
const {getRecommCourseByUserId} = require("./getRecommCourseByUserId");
const {addRecommCourses} = require("./addRecommCourses");
const {deleteRecommCourses} = require("./deleteRecommCourses");

const RecommCourses = async (request) => {
    switch (request?.context?.method) {
        case "GET":
            if (request?.pathParams?.id) {
                // Fetch Opted Courses by id
                let getRecommCourseByUIdData = await getRecommCourseByUserId(request)
                if (getRecommCourseByUIdData.data && getRecommCourseByUIdData.data.length !== 0) {
                    return sendCustomHttpResponse(
                        {
                            status: 200,
                            message: "Record found!",
                            data: getRecommCourseByUIdData.data,
                            totalLength: getRecommCourseByUIdData.totalLength
                        },
                        {},
                        200
                    )
                }
                if (getRecommCourseByUIdData.data && getRecommCourseByUIdData.data.length === 0) {
                    return sendCustomHttpResponse(
                        {
                            status: 404,
                            message: "No records found!",
                            data: null,
                        },
                        {},
                        404
                    )
                }
            } else {
                // Fetch all Opted Courses
                let getRecommData = await getRecommCourses(request)
                if (getRecommData.data && getRecommData.data.length !== 0) {
                    return sendCustomHttpResponse(
                        {
                            status: 200,
                            message: "All Recommended Courses listed!",
                            data: getRecommData.data,
                            totalLength: getRecommData.totalLength
                        },
                        {},
                        200
                    )
                }
                if (getRecommData.data && getRecommData.data.length === 0) {
                    return sendCustomHttpResponse(
                        {
                            status: 404,
                            message: "No records found!",
                            data: null,
                        },
                        {},
                        404
                    )
                }
            }

            return sendCustomHttpResponse(
                {
                    status: 500,
                    message: "Internal Server Error, please contact administrator!",
                    data: null,
                },
                {},
                500
            )
        case "POST":
            if (request?.pathParams?.id) {
                // Fetch Opted Courses by id
                let addRecommCoursesData = await addRecommCourses(request)
                if (addRecommCoursesData?.status) {
                    return sendCustomHttpResponse(
                        {
                            status: addRecommCoursesData.status,
                            message: addRecommCoursesData.message,
                            data: addRecommCoursesData.data
                        },
                        {},
                        addRecommCoursesData.status
                    )
                }
            }
            return sendCustomHttpResponse(
                {
                    status: 500,
                    message: "Internal Server Error, please contact administrator!",
                    data: null,
                },
                {},
                500
            )
        case "DELETE":
            if (request?.pathParams?.id) {
                // Delete Recomm Courses by id
                let delOptedCoursesData = await deleteRecommCourses(request)
                if (delOptedCoursesData?.status) {
                    return sendCustomHttpResponse(
                        {
                            status: delOptedCoursesData.status,
                            message: delOptedCoursesData.message,
                            data: delOptedCoursesData.data
                        },
                        {},
                        delOptedCoursesData.status
                    )
                }
            }
            return sendCustomHttpResponse(
                {
                    status: 500,
                    message: "Internal Server Error, please contact administrator!",
                    data: null,
                },
                {},
                500
            )
        default:
            break;
    }
}

module.exports = {
    RecommCourses
}