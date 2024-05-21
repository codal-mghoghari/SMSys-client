const {v4: uuidv4} = require("uuid");

const defCourses = (tableName) => {
    const seedData = [
        {
            id: {
                "S": uuidv4()
            },
            course_name: {
                "S": "Javascript"
            },
            createdAt: {
                "N": Date.now().toString()
            },
            updatedAt: {
                "N": Date.now().toString()
            }
        },
        {
            id: {
                "S": uuidv4()
            },
            course_name: {
                "S": "Typescript"
            },
            createdAt: {
                "N": Date.now().toString()
            },
            updatedAt: {
                "N": Date.now().toString()
            }
        },
        {
            id: {
                "S": uuidv4()
            },
            course_name: {
                "S": "Python"
            },
            createdAt: {
                "N": Date.now().toString()
            },
            updatedAt: {
                "N": Date.now().toString()
            }
        },
        {
            id: {
                "S": uuidv4()
            },
            course_name: {
                "S": "C"
            },
            createdAt: {
                "N": Date.now().toString()
            },
            updatedAt: {
                "N": Date.now().toString()
            }
        },
        {
            id: {
                "S": uuidv4()
            },
            course_name: {
                "S": "C++"
            },
            createdAt: {
                "N": Date.now().toString()
            },
            updatedAt: {
                "N": Date.now().toString()
            }
        },
        {
            id: {
                "S": uuidv4()
            },
            course_name: {
                "S": "CSharp"
            },
            createdAt: {
                "N": Date.now().toString()
            },
            updatedAt: {
                "N": Date.now().toString()
            }
        },
        {
            id: {
                "S": uuidv4()
            },
            course_name: {
                "S": "PHP"
            },
            createdAt: {
                "N": Date.now().toString()
            },
            updatedAt: {
                "N": Date.now().toString()
            }
        },
        {
            id: {
                "S": uuidv4()
            },
            course_name: {
                "S": "GO"
            },
            createdAt: {
                "N": Date.now().toString()
            },
            updatedAt: {
                "N": Date.now().toString()
            }
        },
        {
            id: {
                "S": uuidv4()
            },
            course_name: {
                "S": "Rust"
            },
            createdAt: {
                "N": Date.now().toString()
            },
            updatedAt: {
                "N": Date.now().toString()
            }
        },
        {
            id: {
                "S": uuidv4()
            },
            course_name: {
                "S": "Java"
            },
            createdAt: {
                "N": Date.now().toString()
            },
            updatedAt: {
                "N": Date.now().toString()
            }
        },
    ]

    const putReqs = seedData.map((x) => ({
        PutRequest: {
            Item: x,
        },
    }))

    return {
        RequestItems: {
            [tableName]: putReqs,
        },
    }
}

module.exports = {
    defCourses
}