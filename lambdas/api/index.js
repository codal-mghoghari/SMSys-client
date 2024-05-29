const {notFoundDefault} = require("./modules/utils");
const apiBuilder = require('claudia-api-builder');

const {loginUser, registerUser} = require("./modules/auth");
const {Courses} = require("./modules/course");

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

// Auth Routes
api.post(PREFIX + '/login', loginUser)
api.post(PREFIX + '/register', registerUser)

// Courses Routes
api.get(PREFIX + '/courses', Courses)
api.post(PREFIX + '/courses', Courses)
