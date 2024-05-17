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


const getRecordsByKey = async (
    tableName,
    tableIndex = null,
    limit = 10,
    key,
    value,
    returnAttr
) => {
    console.log(
        'getAllDataEventRecords >>>>>',
        tableName,
        '>>',
        'key & value >>',
        key,
        value,
    )
    try {
        if (!tableName) {
            return new Error('Table name is not added.')
        }

        let params = {
            TableName: tableName,
            FilterExpression: `${key} = :value AND is_deleted = :deletedValue`,
            ExpressionAttributeValues: {
                ':value': value,
                ':deletedValue': 0,
            },
            ProjectionExpression: returnAttr,
            Limit: limit,
            ScanIndexForward: true,
        }

        if (tableIndex) {
            params['IndexName'] = tableIndex
        }

        console.log('~ file: data-event.js ~ params', params)
        const scanCommand = new ScanCommand(params)
        const response = await ddbDocClient.send(scanCommand)

        if (response.Count > 0) {
            const result = {
                data: response.Items,
            }
            console.log(
                'getAllDataEventRecords >>>>>',
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

const insertData = async (tableName, data, isAuth = false) => {
    console.log('InsertData >>> ', tableName, '>>', data)


    if (!tableName) {
        throw new Error('Table name is required.')
    }

    try {
        const params = {
            TableName: tableName,
            Item: {
                id : uuidv4(),
                data,
                createdAt: Date.now(),
                updatedAt: Date.now(),
            },
        }
        if (isAuth) {
            let date = new Date()
            params.Item['expiresAt'] = date.setDate(date.getDate() + 1);
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
    getRecordsByKey,
    insertData,
}