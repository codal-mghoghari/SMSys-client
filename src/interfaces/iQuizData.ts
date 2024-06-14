export type AnswersType = {
    id: string,
    question_id: string,
    question_type: string,
    option: string,
}[]

export type EachAnswersType = {
    id: string,
    question_id: string,
    question_type: string,
    option: string,
} | undefined

export type QuizDataType = {
    id?: string,
    question_type?: string,
    question?: string,
    Answers?: QuizOptionsType
}[]

export type QuizEachQuestionType = {
    id: string,
    question_type: string,
    question?: string,
}

export type QuizQuestionsType = {
    id: string,
    question_type: string,
    question?: string,
}[]

export type QuizOptionsType = {
    id: string,
    isCorrect: number,
    option_description: String,
    question_id: String,
    question_type: String,
}[]

export type QuizEachOptionsType = {
    id: string,
    isCorrect: number,
    option_description: String,
    question_id: String,
    question_type: String,
}

export type EachQuizDataType = {
    id?: string,
    question_type?: string,
    question?: string,
    Answers?: QuizOptionsType
}


export interface iQuizData {
    id?: string,
    question_type?: string,
    question?: string,
    Answers?: AnswersType
}