const {sendCustomHttpResponse} = require("../utils");
const {getQuestions} = require("./getQuestions");
const {getQuestionById} = require("./getQuestionById");

const Questions = async (request) => {
    switch (request?.context?.method) {
        case "GET":
            // Fetch all questions
            let getQuesData = await getQuestions(request)
            if (getQuesData.data && getQuesData.data.length !== 0) {
                return sendCustomHttpResponse(
                    {
                        status: 200,
                        message: "All questions listed!",
                        data: getQuesData.data,
                        totalLength: getQuesData.totalLength
                    },
                    {},
                    200
                )
            }
            if (getQuesData.data && getQuesData.data.length === 0) {
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
                    data: getQuesData || null,
                },
                {},
                500
            )
        case "POST":
            if (request.pathParams.id) {
                // Fetch question by ID
                let questionData = await getQuestionById(request)
                if (questionData.data && questionData.data.length !== 0) {
                    return sendCustomHttpResponse(
                        {
                            status: 200,
                            message: "Record found!",
                            data: questionData.data,
                            totalLength: questionData.totalLength
                        },
                        {},
                        200
                    )
                }
                if (questionData.data && questionData.data.length === 0) {
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
    Questions
}