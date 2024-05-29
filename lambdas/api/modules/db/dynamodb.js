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
    scanIndexForward = true
) => {
    console.log('getAllRecords >>>>>', tableName)

    try {
        if (!tableName) {
            return new Error('Table name is not added.')
        }

        let params = {
            TableName: tableName,
            ProjectionExpression: returnAttr,
            Limit: limit || 10,
            ScanIndexForward: scanIndexForward,
        }
        if (tableIndex) {
            params['IndexName'] = tableIndex
        }

        console.log('>>> DyanamoDB: params:', params)
        const queryCommand = new ScanCommand(params)
        const response = await ddbDocClient.send(queryCommand)

        if (response.Count > 0) {
            const result = {
                data: response.Items
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
        if (key === null || value === null) {
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

const insertData = async (tableName, data, isAuth = false, createColsForEach = true, caseInSensitve = false) => {
    console.log('InsertData >>> ', tableName, '>>', data)

    if (!tableName) {
        throw new Error('Table name is required.')
    }

    try {
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

module.exports = {
    getAllRecords,
    getRecordsByKey,
    insertData,
}