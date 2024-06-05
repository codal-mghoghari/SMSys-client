const {DynamoDBClient} = require('@aws-sdk/client-dynamodb')
const {
    DynamoDBDocumentClient,
    PutCommand,
    QueryCommand,
    UpdateCommand,
    ScanCommand,
    DeleteCommand,
} = require('@aws-sdk/lib-dynamodb')
const {v4: uuidv4} = require('uuid')

const dynamoDbClient = new DynamoDBClient()
const ddbDocClient = DynamoDBDocumentClient.from(dynamoDbClient, {
    marshallOptions: {
        removeUndefinedValues: true,
    },
})

const getAllRecords = async (
    tableName,
    tableIndex = null,
    limit = null,
    returnAttr,
    scanIndexForward = true,
    deleteCreds = false,
) => {
    try {
        console.log('getAllRecords >>>>>', tableName)

        if (!tableName) {
            return new Error('Table name is not added.')
        }

        let params = {
            TableName: tableName,
            ProjectionExpression: returnAttr,
            ScanIndexForward: scanIndexForward,
        }

        if (limit) {
            params['Limit'] = limit
        }

        if (tableIndex) {
            params['IndexName'] = tableIndex
        }

        console.log('>>> DyanamoDB: params:', params)
        const queryCommand = new ScanCommand(params)
        const response = await ddbDocClient.send(queryCommand)

        if (response.Count > 0) {
            let result = {
                data: response.Items,
                totalLength: response.Items.length,
            }
            if (deleteCreds) {
                let newResult = Object.assign({}, ...result.data)
                delete newResult?.password
                result.data = [newResult]
            }
            if (result.data.length === 1) {
                // If data length is equal to 1, convert from Array<Object> to <Object>
                result.data = Object.assign({}, ...result.data)
            }
            console.log(
                'getAllRecords >>>>>',
                tableName,
                '>>>>>',
                JSON.stringify(result, null, 2)
            )
            return result
        } else {
            return {
                data: [],
            }
        }
    } catch (e) {
        return new Error(e.message)
    }
}


const getRecordsByKey = async (
    tableName,
    tableIndex = null,
    limit = null,
    key,
    value,
    returnAttr = null,
    scanIndexForward = true,
    caseInSensitive = false,
    deleteCreds = false,
) => {
    console.log(
        'getRecordsByKey >>>>>',
        tableName,
        '>>',
        'key & value >>',
        key,
        value,
    )
    try {
        if (!tableName) {
            return new Error('Table name is not added!')
        }
        if (key === (null | undefined) || value === (null | undefined)) {
            return new Error("Key or Value is undefined/null!")
        }

        let params = {
            TableName: tableName,
            FilterExpression: `${String(key)} = :value`,
            ExpressionAttributeValues: {
                ':value': String(value),
            },
            ScanIndexForward: scanIndexForward,
        }
        if (returnAttr) {
            params['ProjectionExpression'] = returnAttr
        }

        if (limit) {
            params['Limit'] = limit
        }

        if (tableIndex) {
            params['IndexName'] = tableIndex
        }

        if (caseInSensitive) {
            params['ExpressionAttributeValues'] = {
                ":value": value.toString().toLowerCase()
            }
        }

        console.log('>>> DyanamoDB: params:', params)
        const scanCommand = new ScanCommand(params)
        const response = await ddbDocClient.send(scanCommand)

        if (response.Count > 0) {
            const result = {
                data: response.Items,
            }
            if (deleteCreds) {
                let newResult = Object.assign({}, ...result.data)
                delete newResult?.password
                result.data = [newResult]
            }
            if (result.data.length === 1) {
                // If data length is equal to 1, convert from Array<Object> to <Object>
                result.data = Object.assign({}, ...result.data)
            }
            Object.keys(result?.data).length > 0 ? result['totalLength'] = Object.keys(result?.data).length : result['totalLength'] = null
            console.log(
                'getRecordsByKey >>>>>',
                tableName,
                '>>>>>',
                JSON.stringify(result, null, 2)
            )
            return result
        } else {
            console.log(
                'getRecordsByKey >>>>>',
                tableName,
                '>>>>>',
                "NO RECORDS FOUND! -", JSON.stringify(response, null, 2)
            )
            return {
                data: [],
            }
        }
    } catch (e) {
        return new Error(e.message)

    }
}

const insertData = async (
    tableName,
    data,
    isAuth = false,
    createColsForEach = true,
) => {
    try {
        console.log('InsertData >>> ', tableName, '>>', data)
        if (!tableName) {
            return new Error('Table name is required.')
        }

        const params = {
            TableName: tableName,
            Item: {
                id: uuidv4(),
                ...data,
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString(),
            },
        }
        if (createColsForEach === false) {
            params.Item = {
                id: uuidv4(),
                data,
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString(),
            }
        }
        console.log("InsertData >>> Params: ", params)
        if (isAuth) {
            let date = new Date()
            let expiredDate = date.setDate(date.getDate() + 1);
            params.Item['expiresAt'] = new Date(expiredDate).toISOString();
            delete params.Item.updatedAt
        }
        const putCommand = new PutCommand(params)
        const result = await ddbDocClient.send(putCommand)
        console.log('InsertData >>>>>', tableName, '>>>>>', result)
        return result
    } catch (e) {
        throw new Error(e.message)
    }
}

const updateData = async (
    tableName,
    searchKey,
    searchValue,
    updateKey,
    updateValue,
) => {
    try {
        console.log(
            'updateData >>>>>',
            tableName,
            '>>',
            'search key & Value >>',
            searchKey,
            searchValue,
            '>>',
            'update key & value >>',
            updateKey,
            updateValue,
        )
        if (!tableName) {
            return new Error('Table name is required.')
        }

        if (searchKey === (null | undefined) || searchValue === (null | undefined)) {
            return new Error("Row's Key or Value is undefined/null!")
        }

        if (updateKey === (null | undefined) || updateValue === (null | undefined)) {
            return new Error("Updating Data's Key or Value is undefined/null!")
        }

        let params = {
            TableName: tableName,
            Key: {
                [searchKey]: searchValue.toString(),
            },
            UpdateExpression:
                `set ${updateKey} = :value, updatedAt = :updatedAt`,
            ExpressionAttributeValues: {
                ':value': updateValue,
                ':updatedAt': new Date().toISOString(),
            },
            ReturnValues: "ALL_NEW",
        }
        console.log(">>> Update Data ~ params: ", params)
        const updateCommand = new UpdateCommand(params)
        const updateResult = await ddbDocClient.send(updateCommand)
        if (updateResult?.Attributes) {
            delete updateResult?.Attributes?.password
            let returnData = {
                data: updateResult?.Attributes,
            }
            Object.keys(returnData?.data).length > 0 ? returnData['totalLength'] = Object.keys(returnData?.data).length : returnData['totalLength'] = null
            return returnData
        }
        console.log('>>>> Update Data -> result', JSON.stringify(updateResult, null, 4))
        return updateResult
    } catch (err) {
        throw new Error(err.message)
    }
}

module.exports = {
    getAllRecords,
    getRecordsByKey,
    insertData,
    updateData
}