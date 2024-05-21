const {DynamoDBClient, BatchWriteItemCommand} = require('@aws-sdk/client-dynamodb')
const {
    DynamoDBDocumentClient
} = require('@aws-sdk/lib-dynamodb')
const {v4: uuidv4} = require('uuid')

const dynamoDbClient = new DynamoDBClient({
    region: "ap-south-1"
})

const {defCourses} = require("./courses")

async function main() {

    const req = defCourses('Courses')
    const command = new BatchWriteItemCommand(req);
    const response = await dynamoDbClient.send(command);
    console.log('Courses seeded >>>>>>>', response)
}

main()

//
// ddbDocClient
//     .batchWrite(req)
//     .promise()
//     .then((res) => console.log('Courses Seeded!', res))
//     .catch((err) => console.error(err))