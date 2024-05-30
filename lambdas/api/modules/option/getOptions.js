const {getAllRecords} = require("../db/dynamodb");

const getOptions = async (request) => {
    try {
        const {limit} = request.queryString
        return await getAllRecords('Options', null, limit ? parseInt(limit) : null, "id, question_id, option_description, isCorrect, createdAt, updatedAt")
    } catch (error) {
        console.error(">>> GetOptions Error:", error)
        return []

    }
}

module.exports = {
    getOptions
}