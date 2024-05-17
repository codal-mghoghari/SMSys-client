const jwt = require("jsonwebtoken");
require("dotenv/config");

// async function jwtValidation(token) {
//     try {
//         const secret = process.env.SECRETKEY;
//         const tokenDecoded = jwt.verify(token, secret);
//         if (process.env.NODE_ENV !== "test" && Date.now() >= tokenDecoded.exp * 1000) {
//             return {status: 401, message: "Unauthorized"}
//         }
//         return {
//             token: token
//         }
//         // const User = await Model.Users.findOne({
//         //     where: {id: tokenDecoded.userData.id},
//         // });
//         // if (!User) {
//         //     return res.status(404).json({message: "User not found!"});
//         // }
//     } catch (e) {
//         return {status: 500, message: e.message}
//     }
// }

const generatePolicy = (decoded, methodArn) => {
    'use strict'
    //console.log('>>>>>: generatePolicy ->\n', decoded, methodArn, '\n--------------')
    return {
        'principalId': '123123',
        'policyDocument': {
            'Version': '2012-10-17',
            'Statement': [{
                'Effect': 'Allow',
                'Action': [
                    'execute-api:Invoke'
                ],
                'Resource': ['*']
            }]
        }
    };
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