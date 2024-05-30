const {sendCustomHttpResponse} = require("../utils");
const {getOptions} = require("./getOptions");
const {getOptionByQID} = require("./getOptionByQID");

const Options = async (request) => {
    switch (request?.context?.method) {
        case "GET":
            let getOptData = await getOptions(request)
            if (getOptData.data && getOptData.data.length !== 0) {
                return sendCustomHttpResponse(
                    {
                        status: 200,
                        message: "All Options listed!",
                        data: getOptData.data,
                        totalLength: getOptData.totalLength
                    },
                    {},
                    200
                )
            }
            if (getOptData.data && getOptData.data.length === 0) {
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
                    data: getOptData || null,
                },
                {},
                500
            )
        case "POST":
            let getOptByQIDData = await getOptionByQID(request)
            if (getOptByQIDData.data && getOptByQIDData.data.length !== 0) {
                return sendCustomHttpResponse(
                    {
                        status: 200,
                        message: "Record found!",
                        data: getOptByQIDData.data,
                        totalLength: getOptByQIDData.totalLength
                    },
                    {},
                    200
                )
            }
            if (getOptByQIDData.data && getOptByQIDData.data.length === 0) {
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
                    data: getOptByQIDData || null,
                },
                {},
                500
            )
        default:
            break;
    }
}

module.exports = {
    Options
}