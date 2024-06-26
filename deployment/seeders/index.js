const {DynamoDBClient} = require('@aws-sdk/client-dynamodb')
const {
    DynamoDBDocumentClient,
} = require('@aws-sdk/lib-dynamodb')

const dynamoDbClient = new DynamoDBClient({
    region: "ap-south-1"
})

const ddbDocClient = DynamoDBDocumentClient.from(dynamoDbClient, {
    marshallOptions: {
        removeUndefinedValues: true,
    },
})

const {
    seedCoursesData
} = require("./data/index");
const {processWriteRequests, createWriteRequest} = require("./utils");

async function main() {
    const writeRequests = createWriteRequest(seedCoursesData)
    const response = await processWriteRequests(
        ddbDocClient,
        "tableName",
        writeRequests
    );
    console.log(">>> Data seeded: ", response)
}

main()