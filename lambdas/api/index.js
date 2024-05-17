const {notFoundDefault} = require("./modules/utils");
const apiBuilder = require('claudia-api-builder');
const {loginUser} = require("./modules/login");
api = new apiBuilder()
global.apiBuilder = apiBuilder

module.exports = api

api.corsMaxAge(3600)

api.registerAuthorizer('validateAuth', {
    // lambdaArn: `arn:aws:lambda:ap-south-1:381492076237:function:validateAuth`,
    lambdaName: 'validateAuth',
    lambdaVersion: true
})

const PREFIX = '/api'

// Default Routes

api.get('/', notFoundDefault)
api.post('/', notFoundDefault)


api.post(PREFIX + '/login', loginUser, {
    customAuthorizer: 'validateAuth'
})


