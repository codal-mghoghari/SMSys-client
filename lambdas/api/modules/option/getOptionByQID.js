const {getRecordsByKey} = require("../db/dynamodb");
const getOptionByQID = async (request) => {
    try {
        const {limit} = request?.queryString
        const id = request?.pathParams?.id
        const {returnAttr} = request?.body
        return await getRecordsByKey('Options', null, limit ? parseInt(limit) : null, "question_id", id, returnAttr ? returnAttr : null)
    } catch (error) {
        console.error(">>> PostOptionByQId Error:", error)
        return []
    }
}

module.exports = {
    getOptionByQID
}