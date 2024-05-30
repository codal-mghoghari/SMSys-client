const {notFoundDefault} = require("./modules/utils");
const apiBuilder = require('claudia-api-builder');

const {loginUser, registerUser} = require("./modules/auth");
const {Courses} = require("./modules/course");
const {Questions} = require("./modules/question");
const {Options} = require("./modules/option");
const {OptedCourses} = require("./modules/optedcourse");

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
api.post(PREFIX + '/courses', Courses, {
    customAuthorizer: "validateAuth"
})

//Opted Courses Routes
api.get(PREFIX + '/optedcourses', OptedCourses, {
    customAuthorizer: "validateAuth"
})
api.post(PREFIX + '/optedcourses/{id}', OptedCourses, {
    customAuthorizer: "validateAuth"
})

// Questions Routes
api.get(PREFIX + '/questions', Questions, {
    customAuthorizer: "validateAuth"
})
api.post(PREFIX + '/questions/{id}', Questions, {
    customAuthorizer: "validateAuth"
})

// Options Routes
api.get(PREFIX + '/options', Options, {
    customAuthorizer: "validateAuth"
})
api.post(PREFIX + '/options/{id}', Options, {
    customAuthorizer: "validateAuth"
})
