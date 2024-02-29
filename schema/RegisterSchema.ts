import {object, string} from 'yup';


export type RegisterType = {
    reg_full_name: string,
    reg_email: string,
    reg_password: string
}

export const RegisterSchema = object({
    reg_full_name: string()
        .required('Full name is required'),
    reg_email: string()
        .email('Please enter a valid email')
        .matches(/@[^.]*\./)
        .required('Email is required'),
    reg_password: string()
        .required('Password is required')
        .min(6, "Must be atleast 6 characters")
})