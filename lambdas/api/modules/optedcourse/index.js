const {sendCustomHttpResponse} = require("../utils");
const {getOptedCourses} = require("./getOptedCourses");
const {getCourseByUserId} = require("./getCourseByUserId");
const {addOptedCourses} = require("./addOptedCourses");
const {deleteOptedCourses} = require("./deleteOptedCourses");

const OptedCourses = async (request) => {
    switch (request?.context?.method) {
        case "GET":
            if (request?.pathParams?.id) {
                // Fetch Opted courses by id
                let getOptByUIDData = await getCourseByUserId(request)
                if (getOptByUIDData.data && getOptByUIDData.data.length !== 0) {
                    return sendCustomHttpResponse(
                        {
                            status: 200,
                            message: "Record found!",
                            data: getOptByUIDData.data,
                            totalLength: getOptByUIDData.totalLength
                        },
                        {},
                        200
                    )
                }
                if (getOptByUIDData.data && getOptByUIDData.data.length === 0) {
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
                let getOptedData = await getOptedCourses(request)
                if (getOptedData.data && getOptedData.data.length !== 0) {
                    return sendCustomHttpResponse(
                        {
                            status: 200,
                            message: "All Opted Courses listed!",
                            data: getOptedData.data,
                            totalLength: getOptedData.totalLength
                        },
                        {},
                        200
                    )
                }
                if (getOptedData.data && getOptedData.data.length === 0) {
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
                let addOptedCoursesData = await addOptedCourses(request)
                if (addOptedCoursesData?.status) {
                    return sendCustomHttpResponse(
                        {
                            status: addOptedCoursesData.status,
                            message: addOptedCoursesData.message,
                            data: addOptedCoursesData.data
                        },
                        {},
                        addOptedCoursesData.status
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
                // Delete Opted Courses by id
                let delOptedCoursesData = await deleteOptedCourses(request)
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
    OptedCourses
}