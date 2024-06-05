const {sendCustomHttpResponse} = require("../utils");
const {getOptedCourses} = require("./getOptedCourses");
const {getCourseByUserId} = require("./getCourseByUserId");

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
        default:
            break;
    }
}

module.exports = {
    OptedCourses
}