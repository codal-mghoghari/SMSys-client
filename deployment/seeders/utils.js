const {BatchWriteItemCommand} = require('@aws-sdk/client-dynamodb')

function createWriteRequest(seedersData) {
    return seedersData.map(record => ({
        PutRequest: {
            Item: record
        }
    }));
}

async function processWriteRequests(
    ddbClient,
    tableName,
    writeRequests,
    parallelWRTableName = null,
    parallelWriteRequests = null,
    retryCount = 0,
    DDB_MAX_RETRIES = 2,
    DDB_BATCH_SIZE = 1
) {
    if (retryCount > DDB_MAX_RETRIES) {
        throw new Error(`Failed to write ${writeRequests.length} records to DynamoDB after ${DDB_MAX_RETRIES} retries`);
        // TODO: should have some fallback mechanism here
    }
    const promises = [];
    for (let i = 0; i < writeRequests.length; i += DDB_BATCH_SIZE) {
        const requestItems = {};
        requestItems[tableName] = writeRequests.slice(i, i + DDB_BATCH_SIZE);
        if (parallelWriteRequests && parallelWRTableName) {
            const k = i * 4
            requestItems[parallelWRTableName] = parallelWriteRequests.slice(k, k + 4);
        }
        const command = new BatchWriteItemCommand({
            RequestItems: requestItems
        });
        promises.push(ddbClient.send(command));
    }
    const results = await Promise.all(promises);
    const unprocessedItems = [];
    for (const result of results) {
        if (result?.UnprocessedItems && result?.UnprocessedItems[tableName]) {
            unprocessedItems.push(...result.UnprocessedItems[tableName]);
        }
    }
    if (unprocessedItems.length > 0) {
        console.log(`Retrying ${unprocessedItems.length} unprocessed items`);
        await processWriteRequests(ddbClient, tableName, unprocessedItems, retryCount + 1);
    }

    return {
        status: "Completed",
        unprocessedItems: unprocessedItems,
    }
}

module.exports = {
    createWriteRequest,
    processWriteRequests
}