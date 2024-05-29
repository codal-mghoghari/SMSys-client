const {getCourses} = require("./getCourses");
const {addCourses} = require("./addCourses");
const {sendCustomHttpResponse} = require("../utils");

const Courses = async (request) => {
    switch (request?.context?.method) {
        case "GET":
            let getCoursesData = await getCourses(request)
            if (getCoursesData.data && getCoursesData.data.length !== 0) {
                return sendCustomHttpResponse(
                    {
                        status: 200,
                        message: "All courses listed!",
                        data: getCoursesData.data
                    },
                    {},
                    200
                )
            }
            if (getCoursesData.data && getCoursesData.data.length === 0) {
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
            return sendCustomHttpResponse(
                {
                    status: 500,
                    message: "Internal Server Error, please contact administrator!",
                    data: getCoursesData || null,
                },
                {},
                500
            )
        case "POST":
            let addCoursesData = await addCourses(request)
            if (addCoursesData.status) {
                return sendCustomHttpResponse(
                    {
                        status: addCoursesData.status,
                        message: addCoursesData.message,
                        data: addCoursesData.data
                    },
                    {},
                    addCoursesData.status
                )
            }
            return sendCustomHttpResponse(
                {
                    status: 500,
                    message: "Internal Server Error, please contact administrator!",
                    data: addCoursesData || null,
                },
                {},
                500
            )
        default:
            break;
    }
}

module.exports = {
    Courses
}