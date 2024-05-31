const {getRecordsByKey, updateData} = require("../db/dynamodb");
const updateUser = async (request) => {
    try {
        const {limit, include} = request?.queryString
        const id = request?.pathParams?.id
        const requestBody = request?.body
        const userData = await getRecordsByKey('Users', null, limit ? parseInt(limit) : null, "id", id, include ? include : null, false, false, false)
        if (userData && userData?.totalLength > 0 && requestBody) {
            let requestKey = Object.keys(requestBody)[0]
            let requestValue = Object.values(requestBody)[0]
            let updatedData = await updateData('Users', 'id', userData?.data?.id, requestKey, requestValue)
            console.log(">>> UpdatedData: ", updatedData)
            if (updatedData.Attributes) {
                return {
                    data: updatedData.Attributes,
                    totalLength: updatedData.Attributes.length
                }
            }
            return []
        }
        return []
    } catch (error) {
        console.error(">>> Post updateUser Error:", error)
        return []
    }
}

module.exports = {
    updateUser
}