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
    returnAttr,
    scanIndexForward = true,
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
            return new Error('Table name is not added!')
        }
        if(key === null || value === null){
            return new Error("Key or Value is undefined/null!")
        }

        let params = {
            TableName: tableName,
            FilterExpression: `${key} = :value`,
            ExpressionAttributeValues: {
                ':value': value,
            },
            ProjectionExpression: returnAttr,
            Limit: limit,
            ScanIndexForward: scanIndexForward,
        }

        if (tableIndex) {
            params['IndexName'] = tableIndex
        }

        console.log('>>> DyanamoDB: params:', params)
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

const insertData = async (tableName, data, isAuth = false, createColsForEach = true) => {
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
                createdAt: Date.now(),
                updatedAt: Date.now(),
            },
        }
        if (createColsForEach === false) {
            params.Item = {
                id: uuidv4(),
                data,
                createdAt: Date.now(),
                updatedAt: Date.now(),
            }
        }
        console.log("InsertData >>> Params: ", params)
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