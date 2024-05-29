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
    seedQuestionsData,
    seedOptionsData
} = require("./data/index");
const {processWriteRequests, createWriteRequest} = require("./utils");

async function main() {
    const seededQuestionsData = seedQuestionsData
    const seedOptData = seedOptionsData(seededQuestionsData)
    const writeRequests = createWriteRequest(seededQuestionsData)
    const writeParellelRequests = createWriteRequest(seedOptData.flat(1))
    const response = await processWriteRequests(ddbDocClient, 'Questions', writeRequests, "Options", writeParellelRequests)
    console.log(">>> Data seeded: ", response)
}

main()