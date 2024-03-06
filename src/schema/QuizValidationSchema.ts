import {object, string} from 'yup';


export const QuizValidationSchema = object({
    "A1": string(),
    "A2": string(),
    "A3": string(),
    "A4": string(),
})