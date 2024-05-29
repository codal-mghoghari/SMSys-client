const {v4: uuidv4} = require("uuid");
const seedQuestionsData = [
    {
        id: {
            "S": uuidv4()
        },
        question_type: {
            "S": "Javascript"
        },
        question: {
            "S": "How do you write comments in Javascript?",
        },
        createdAt: {
            "S": new Date().toISOString()
        },
        updatedAt: {
            "S": new Date().toISOString()
        }
    },
    {
        id: {
            "S": uuidv4()
        },
        question_type: {
            "S": "Javascript"
        },
        question: {
            "S": "How do you unwrite comments in Javascript?",
        },
        createdAt: {
            "S": new Date().toISOString()
        },
        updatedAt: {
            "S": new Date().toISOString()
        }
    },
    {
        id: {
            "S": uuidv4()
        },
        question_type: {
            "S": "Javascript"
        },
        question: {
            "S": "How do you dewrite comments in Javascript?",
        },
        createdAt: {
            "S": new Date().toISOString()
        },
        updatedAt: {
            "S": new Date().toISOString()
        }
    },
    {
        id: {
            "S": uuidv4()
        },
        question_type: {
            "S": "Javascript"
        },
        question: {
            "S": "How do you overwrite comments in Javascript?",
        },
        createdAt: {
            "S": new Date().toISOString()
        },
        updatedAt: {
            "S": new Date().toISOString()
        }
    },
    {
        id: {
            "S": uuidv4()
        },
        question_type: {
            "S": "Javascript"
        },
        question: {
            "S": "How do you underwrite comments in Javascript?",
        },
        createdAt: {
            "S": new Date().toISOString()
        },
        updatedAt: {
            "S": new Date().toISOString()
        }
    },
    {
        id: {
            "S": uuidv4()
        },
        question_type: {
            "S": "Java"
        },
        question: {
            "S": "How do you write comments in Javascript?",
        },
        createdAt: {
            "S": new Date().toISOString()
        },
        updatedAt: {
            "S": new Date().toISOString()
        }
    },
    {
        id: {
            "S": uuidv4()
        },
        question_type: {
            "S": "Java"
        },
        question: {
            "S": "How do you unwrite comments in Javascript?",
        },
        createdAt: {
            "S": new Date().toISOString()
        },
        updatedAt: {
            "S": new Date().toISOString()
        }
    },
    {
        id: {
            "S": uuidv4()
        },
        question_type: {
            "S": "Java"
        },
        question: {
            "S": "How do you dewrite comments in Javascript?",
        },
        createdAt: {
            "S": new Date().toISOString()
        },
        updatedAt: {
            "S": new Date().toISOString()
        }
    },
    {
        id: {
            "S": uuidv4()
        },
        question_type: {
            "S": "Java"
        },
        question: {
            "S": "How do you overwrite comments in Javascript?",
        },
        createdAt: {
            "S": new Date().toISOString()
        },
        updatedAt: {
            "S": new Date().toISOString()
        }
    },
    {
        id: {
            "S": uuidv4()
        },
        question_type: {
            "S": "Java"
        },
        question: {
            "S": "How do you underwrite comments in Javascript?",
        },
        createdAt: {
            "S": new Date().toISOString()
        },
        updatedAt: {
            "S": new Date().toISOString()
        }
    },
    {
        id: {
            "S": uuidv4()
        },
        question_type: {
            "S": "Typescript"
        },
        question: {
            "S": "How do you write comments in Javascript?",
        },
        createdAt: {
            "S": new Date().toISOString()
        },
        updatedAt: {
            "S": new Date().toISOString()
        }
    },
    {
        id: {
            "S": uuidv4()
        },
        question_type: {
            "S": "Typescript"
        },
        question: {
            "S": "How do you unwrite comments in Javascript?",
        },
        createdAt: {
            "S": new Date().toISOString()
        },
        updatedAt: {
            "S": new Date().toISOString()
        }
    },
    {
        id: {
            "S": uuidv4()
        },
        question_type: {
            "S": "Typescript"
        },
        question: {
            "S": "How do you dewrite comments in Javascript?",
        },
        createdAt: {
            "S": new Date().toISOString()
        },
        updatedAt: {
            "S": new Date().toISOString()
        }
    },
    {
        id: {
            "S": uuidv4()
        },
        question_type: {
            "S": "Typescript"
        },
        question: {
            "S": "How do you overwrite comments in Javascript?",
        },
        createdAt: {
            "S": new Date().toISOString()
        },
        updatedAt: {
            "S": new Date().toISOString()
        }
    },
    {
        id: {
            "S": uuidv4()
        },
        question_type: {
            "S": "Typescript"
        },
        question: {
            "S": "How do you underwrite comments in Javascript?",
        },
        createdAt: {
            "S": new Date().toISOString()
        },
        updatedAt: {
            "S": new Date().toISOString()
        }
    },
    {
        id: {
            "S": uuidv4()
        },
        question_type: {
            "S": "Python"
        },
        question: {
            "S": "How do you write comments in Javascript?",
        },
        createdAt: {
            "S": new Date().toISOString()
        },
        updatedAt: {
            "S": new Date().toISOString()
        }
    },
    {
        id: {
            "S": uuidv4()
        },
        question_type: {
            "S": "Python"
        },
        question: {
            "S": "How do you unwrite comments in Javascript?",
        },
        createdAt: {
            "S": new Date().toISOString()
        },
        updatedAt: {
            "S": new Date().toISOString()
        }
    },
    {
        id: {
            "S": uuidv4()
        },
        question_type: {
            "S": "Python"
        },
        question: {
            "S": "How do you dewrite comments in Javascript?",
        },
        createdAt: {
            "S": new Date().toISOString()
        },
        updatedAt: {
            "S": new Date().toISOString()
        }
    },
    {
        id: {
            "S": uuidv4()
        },
        question_type: {
            "S": "Python"
        },
        question: {
            "S": "How do you overwrite comments in Javascript?",
        },
        createdAt: {
            "S": new Date().toISOString()
        },
        updatedAt: {
            "S": new Date().toISOString()
        }
    },
    {
        id: {
            "S": uuidv4()
        },
        question_type: {
            "S": "Python"
        },
        question: {
            "S": "How do you underwrite comments in Javascript?",
        },
        createdAt: {
            "S": new Date().toISOString()
        },
        updatedAt: {
            "S": new Date().toISOString()
        }
    },
    {
        id: {
            "S": uuidv4()
        },
        question_type: {
            "S": "Rust"
        },
        question: {
            "S": "How do you write comments in Javascript?",
        },
        createdAt: {
            "S": new Date().toISOString()
        },
        updatedAt: {
            "S": new Date().toISOString()
        }
    },
    {
        id: {
            "S": uuidv4()
        },
        question_type: {
            "S": "Rust"
        },
        question: {
            "S": "How do you unwrite comments in Javascript?",
        },
        createdAt: {
            "S": new Date().toISOString()
        },
        updatedAt: {
            "S": new Date().toISOString()
        }
    },
    {
        id: {
            "S": uuidv4()
        },
        question_type: {
            "S": "Rust"
        },
        question: {
            "S": "How do you dewrite comments in Javascript?",
        },
        createdAt: {
            "S": new Date().toISOString()
        },
        updatedAt: {
            "S": new Date().toISOString()
        }
    },
    {
        id: {
            "S": uuidv4()
        },
        question_type: {
            "S": "Rust"
        },
        question: {
            "S": "How do you overwrite comments in Javascript?",
        },
        createdAt: {
            "S": new Date().toISOString()
        },
        updatedAt: {
            "S": new Date().toISOString()
        }
    },
    {
        id: {
            "S": uuidv4()
        },
        question_type: {
            "S": "Rust"
        },
        question: {
            "S": "How do you underwrite comments in Javascript?",
        },
        createdAt: {
            "S": new Date().toISOString()
        },
        updatedAt: {
            "S": new Date().toISOString()
        }
    },
    {
        id: {
            "S": uuidv4()
        },
        question_type: {
            "S": "PHP"
        },
        question: {
            "S": "How do you write comments in Javascript?",
        },
        createdAt: {
            "S": new Date().toISOString()
        },
        updatedAt: {
            "S": new Date().toISOString()
        }
    },
    {
        id: {
            "S": uuidv4()
        },
        question_type: {
            "S": "PHP"
        },
        question: {
            "S": "How do you unwrite comments in Javascript?",
        },
        createdAt: {
            "S": new Date().toISOString()
        },
        updatedAt: {
            "S": new Date().toISOString()
        }
    },
    {
        id: {
            "S": uuidv4()
        },
        question_type: {
            "S": "PHP"
        },
        question: {
            "S": "How do you dewrite comments in Javascript?",
        },
        createdAt: {
            "S": new Date().toISOString()
        },
        updatedAt: {
            "S": new Date().toISOString()
        }
    },
    {
        id: {
            "S": uuidv4()
        },
        question_type: {
            "S": "PHP"
        },
        question: {
            "S": "How do you overwrite comments in Javascript?",
        },
        createdAt: {
            "S": new Date().toISOString()
        },
        updatedAt: {
            "S": new Date().toISOString()
        }
    },
    {
        id: {
            "S": uuidv4()
        },
        question_type: {
            "S": "PHP"
        },
        question: {
            "S": "How do you underwrite comments in Javascript?",
        },
        createdAt: {
            "S": new Date().toISOString()
        },
        updatedAt: {
            "S": new Date().toISOString()
        }
    },
    {
        id: {
            "S": uuidv4()
        },
        question_type: {
            "S": "GO"
        },
        question: {
            "S": "How do you write comments in Javascript?",
        },
        createdAt: {
            "S": new Date().toISOString()
        },
        updatedAt: {
            "S": new Date().toISOString()
        }
    },
    {
        id: {
            "S": uuidv4()
        },
        question_type: {
            "S": "GO"
        },
        question: {
            "S": "How do you unwrite comments in Javascript?",
        },
        createdAt: {
            "S": new Date().toISOString()
        },
        updatedAt: {
            "S": new Date().toISOString()
        }
    },
    {
        id: {
            "S": uuidv4()
        },
        question_type: {
            "S": "GO"
        },
        question: {
            "S": "How do you dewrite comments in Javascript?",
        },
        createdAt: {
            "S": new Date().toISOString()
        },
        updatedAt: {
            "S": new Date().toISOString()
        }
    },
    {
        id: {
            "S": uuidv4()
        },
        question_type: {
            "S": "GO"
        },
        question: {
            "S": "How do you overwrite comments in Javascript?",
        },
        createdAt: {
            "S": new Date().toISOString()
        },
        updatedAt: {
            "S": new Date().toISOString()
        }
    },
    {
        id: {
            "S": uuidv4()
        },
        question_type: {
            "S": "GO"
        },
        question: {
            "S": "How do you underwrite comments in Javascript?",
        },
        createdAt: {
            "S": new Date().toISOString()
        },
        updatedAt: {
            "S": new Date().toISOString()
        }
    },
    {
        id: {
            "S": uuidv4()
        },
        question_type: {
            "S": "CSharp"
        },
        question: {
            "S": "How do you write comments in Javascript?",
        },
        createdAt: {
            "S": new Date().toISOString()
        },
        updatedAt: {
            "S": new Date().toISOString()
        }
    },
    {
        id: {
            "S": uuidv4()
        },
        question_type: {
            "S": "CSharp"
        },
        question: {
            "S": "How do you unwrite comments in Javascript?",
        },
        createdAt: {
            "S": new Date().toISOString()
        },
        updatedAt: {
            "S": new Date().toISOString()
        }
    },
    {
        id: {
            "S": uuidv4()
        },
        question_type: {
            "S": "CSharp"
        },
        question: {
            "S": "How do you dewrite comments in Javascript?",
        },
        createdAt: {
            "S": new Date().toISOString()
        },
        updatedAt: {
            "S": new Date().toISOString()
        }
    },
    {
        id: {
            "S": uuidv4()
        },
        question_type: {
            "S": "CSharp"
        },
        question: {
            "S": "How do you overwrite comments in Javascript?",
        },
        createdAt: {
            "S": new Date().toISOString()
        },
        updatedAt: {
            "S": new Date().toISOString()
        }
    },
    {
        id: {
            "S": uuidv4()
        },
        question_type: {
            "S": "CSharp"
        },
        question: {
            "S": "How do you underwrite comments in Javascript?",
        },
        createdAt: {
            "S": new Date().toISOString()
        },
        updatedAt: {
            "S": new Date().toISOString()
        }
    },
    {
        id: {
            "S": uuidv4()
        },
        question_type: {
            "S": "C++"
        },
        question: {
            "S": "How do you write comments in Javascript?",
        },
        createdAt: {
            "S": new Date().toISOString()
        },
        updatedAt: {
            "S": new Date().toISOString()
        }
    },
    {
        id: {
            "S": uuidv4()
        },
        question_type: {
            "S": "C++"
        },
        question: {
            "S": "How do you unwrite comments in Javascript?",
        },
        createdAt: {
            "S": new Date().toISOString()
        },
        updatedAt: {
            "S": new Date().toISOString()
        }
    },
    {
        id: {
            "S": uuidv4()
        },
        question_type: {
            "S": "C++"
        },
        question: {
            "S": "How do you dewrite comments in Javascript?",
        },
        createdAt: {
            "S": new Date().toISOString()
        },
        updatedAt: {
            "S": new Date().toISOString()
        }
    },
    {
        id: {
            "S": uuidv4()
        },
        question_type: {
            "S": "C++"
        },
        question: {
            "S": "How do you overwrite comments in Javascript?",
        },
        createdAt: {
            "S": new Date().toISOString()
        },
        updatedAt: {
            "S": new Date().toISOString()
        }
    },
    {
        id: {
            "S": uuidv4()
        },
        question_type: {
            "S": "C++"
        },
        question: {
            "S": "How do you underwrite comments in Javascript?",
        },
        createdAt: {
            "S": new Date().toISOString()
        },
        updatedAt: {
            "S": new Date().toISOString()
        }
    },
    {
        id: {
            "S": uuidv4()
        },
        question_type: {
            "S": "C"
        },
        question: {
            "S": "How do you write comments in Javascript?",
        },
        createdAt: {
            "S": new Date().toISOString()
        },
        updatedAt: {
            "S": new Date().toISOString()
        }
    },
    {
        id: {
            "S": uuidv4()
        },
        question_type: {
            "S": "C"
        },
        question: {
            "S": "How do you unwrite comments in Javascript?",
        },
        createdAt: {
            "S": new Date().toISOString()
        },
        updatedAt: {
            "S": new Date().toISOString()
        }
    },
    {
        id: {
            "S": uuidv4()
        },
        question_type: {
            "S": "C"
        },
        question: {
            "S": "How do you dewrite comments in Javascript?",
        },
        createdAt: {
            "S": new Date().toISOString()
        },
        updatedAt: {
            "S": new Date().toISOString()
        }
    },
    {
        id: {
            "S": uuidv4()
        },
        question_type: {
            "S": "C"
        },
        question: {
            "S": "How do you overwrite comments in Javascript?",
        },
        createdAt: {
            "S": new Date().toISOString()
        },
        updatedAt: {
            "S": new Date().toISOString()
        }
    },
    {
        id: {
            "S": uuidv4()
        },
        question_type: {
            "S": "C"
        },
        question: {
            "S": "How do you underwrite comments in Javascript?",
        },
        createdAt: {
            "S": new Date().toISOString()
        },
        updatedAt: {
            "S": new Date().toISOString()
        }
    },
]


const seedOptionsData = (seededQuestionsData) => {
    return seededQuestionsData.map(question => {
        return [
            {
                id: {
                    "S": uuidv4()
                },
                question_id: {
                    "S": question.id.S
                },
                question_type: {
                    "S": question.question_type.S,
                },
                option_description: {
                    "S": "Noo"
                },
                isCorrect: {
                    "N": "0"
                },
                createdAt: {
                    "S": new Date().toISOString()
                },
                updatedAt: {
                    "S": new Date().toISOString()
                },
            },
            {
                id: {
                    "S": uuidv4()
                },
                question_id: {
                    "S": question.id.S
                },
                question_type: {
                    "S": question.question_type.S,
                },
                option_description: {
                    "S": "NO"
                },
                isCorrect: {
                    "N": "0"
                },
                createdAt: {
                    "S": new Date().toISOString()
                },
                updatedAt: {
                    "S": new Date().toISOString()
                },
            },
            {
                id: {
                    "S": uuidv4()
                },
                question_id: {
                    "S": question.id.S
                },
                question_type: {
                    "S": question.question_type.S,
                },
                option_description: {
                    "S": "Yes"
                },
                isCorrect: {
                    "N": "1"
                },
                createdAt: {
                    "S": new Date().toISOString()
                },
                updatedAt: {
                    "S": new Date().toISOString()
                },
            },
            {
                id: {
                    "S": uuidv4()
                },
                question_id: {
                    "S": question.id.S
                },
                question_type: {
                    "S": question.question_type.S,
                },
                option_description: {
                    "S": "Nope"
                },
                isCorrect: {
                    "N": "0"
                },
                createdAt: {
                    "S": new Date().toISOString()
                },
                updatedAt: {
                    "S": new Date().toISOString()
                },
            },

        ]
    })
}

module.exports = {
    seedQuestionsData,
    seedOptionsData,
}