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
    Answers?: AnswersType
}[]

export interface iQuizData {
    id?: string,
    question_type?: string,
    question?: string,
    Answers?: AnswersType
}