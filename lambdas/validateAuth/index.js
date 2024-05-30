const jwt = require("jsonwebtoken");
require("dotenv/config");

const generatePolicy = (decoded, methodArn) => {
    'use strict'
    //console.log('>>>>>: generatePolicy ->\n', decoded, methodArn, '\n--------------')
    return {
        principalId: "user",
        policyDocument: {
            Version: "2012-10-17",
            Statement: [
                {
                    Effect: "Allow",
                    Action: "execute-api:Invoke",
                    Resource: ["*"]
                },
            ],
        },
        context: {...decoded?.userData, ...decoded.iat, ...decoded.exp}
    }
}

exports.handler = async (event, context, callback) => {
    try {
        const authToken = event?.authorizationToken?.split(' ')[1]
        if (event && event.authorizationToken && authToken) {
            const options = {}
            jwt.verify(authToken, process.env.SECRETKEY, options, (error, decoded) => {
                if (error) {
                    console.error('jwt.verify error', error)
                    callback('Unauthorized')
                } else if (decoded !== null) {
                    const policy = generatePolicy(decoded, event.methodArn)
                    console.log(">>> Policy: ", policy)
                    callback(null, policy)
                } else {
                    callback('Unauthorized')
                }
            })
        } else {
            callback('Unauthorized')
        }
    } catch (error) {
        console.error(`Error in auth`, error)
        callback('Unauthorized')
    }

}