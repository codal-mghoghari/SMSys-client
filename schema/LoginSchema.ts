import {object, string} from 'yup';


export type LoginType = {
    email: string,
    password: string
}

export const LoginSchema = object({
    email: string()
        .email('Please enter a valid email')
        .matches(/@[^.]*\./, "Invalid email address")
        .required('Email is required'),
    password: string()
        .required('Password is required')
})