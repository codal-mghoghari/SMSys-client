const {notFoundDefault} = require("./modules/utils");
const apiBuilder = require('claudia-api-builder');

const {loginUser, registerUser} = require("./modules/auth");
const {Courses} = require("./modules/course");
const {Questions} = require("./modules/question");
const {Options} = require("./modules/option");
const {OptedCourses} = require("./modules/optedcourse");
const {Users} = require("./modules/user");
const {RecommCourses} = require("./modules/recommcourse");

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
api.get(PREFIX, notFoundDefault)
api.post(PREFIX, notFoundDefault)

// Users Routes
api.get(PREFIX + '/users', Users, { // For fetching all users
    customAuthorizer: "validateAuth"
})
api.get(PREFIX + '/users/{id}', Users, { // For fetching User by id
    customAuthorizer: "validateAuth"
})
api.post(PREFIX + '/users/{id}', Users, { // For updating User
    customAuthorizer: "validateAuth"
})

// Auth Routes
api.post(PREFIX + '/login', loginUser)
api.post(PREFIX + '/register', registerUser)

// Courses Routes
api.get(PREFIX + '/courses', Courses)
api.get(PREFIX + `/courses/{id}`, Courses)
api.post(PREFIX + '/courses', Courses, {
    customAuthorizer: "validateAuth"
})

// Recommended Courses Routes
api.get(PREFIX + '/recommcourses', RecommCourses, {
    customAuthorizer: "validateAuth"
})
api.get(PREFIX + '/recommcourses/{id}', RecommCourses, {
    customAuthorizer: "validateAuth"
})
api.post(PREFIX + '/recommcourses/{id}', RecommCourses, {
    customAuthorizer: "validateAuth"
})
api.delete(PREFIX + '/recommcourses/{id}', RecommCourses, {
    customAuthorizer: "validateAuth"
})

// Opted Courses Routes
api.get(PREFIX + '/optedcourses', OptedCourses, {
    customAuthorizer: "validateAuth"
})
api.get(PREFIX + '/optedcourses/{id}', OptedCourses, {
    customAuthorizer: "validateAuth"
})
api.post(PREFIX + '/optedcourses/{id}', OptedCourses, {
    customAuthorizer: "validateAuth"
})
api.delete(PREFIX + '/optedcourses/{id}', OptedCourses, {
    customAuthorizer: "validateAuth"
})

// Questions Routes
api.get(PREFIX + '/questions', Questions, {
    customAuthorizer: "validateAuth"
})
api.get(PREFIX + '/questions/{id}', Questions, {
    customAuthorizer: "validateAuth"
})

// Options Routes
api.get(PREFIX + '/options', Options, {
    customAuthorizer: "validateAuth"
})
api.get(PREFIX + '/options/{id}', Options, {
    customAuthorizer: "validateAuth"
})
