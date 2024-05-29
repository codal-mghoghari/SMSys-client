const {v4: uuidv4} = require("uuid");
const seedCoursesData = [
    {
        id: {
            "S": uuidv4()
        },
        course_name: {
            "S": "javascript"
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
            "S": "typescript"
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
            "S": "python"
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
            "S": "c"
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
            "S": "c++"
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
            "S": "csharp"
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
            "S": "php"
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
            "S": "go"
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
            "S": "rust"
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
            "S": "java"
        },
        createdAt: {
            "N": Date.now().toString()
        },
        updatedAt: {
            "N": Date.now().toString()
        }
    },
]

module.exports = {
    seedCoursesData
}