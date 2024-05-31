const {getAllRecords} = require("../db/dynamodb");

const getOptions = async (request) => {
    try {
        const {limit, include} = request.queryString
        return await getAllRecords('Options', null, limit ? parseInt(limit) : null, include ? include : null)
    } catch (error) {
        console.error(">>> GetOptions Error:", error)
        return []

    }
}

module.exports = {
    getOptions
}