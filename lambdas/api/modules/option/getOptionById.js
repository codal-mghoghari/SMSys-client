const {getRecordsByKey} = require("../db/dynamodb");
const getOptionById = async (request) => {
    try {
        const {limit, include} = request?.queryString
        const id = request?.pathParams?.id
        if (request?.queryString?.isOptId) {
            return await getRecordsByKey('Options', null, limit ? parseInt(limit) : null, "id", id, include ? include : null)
        }
        return await getRecordsByKey('Options', null, limit ? parseInt(limit) : null, "question_id", id, include ? include : null)
    } catch (error) {
        console.error(">>> Get OptionByQId Error:", error)
        return []
    }
}

module.exports = {
    getOptionById
}