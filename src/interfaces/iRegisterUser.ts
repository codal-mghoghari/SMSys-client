export type jwtUserData = {
    createdAt?: string,
    email?: string,
    entryTest?: number
    first_name?: string,
    id?: string,
    last_name?: string,
    updatedAt?: string,
    user_role?: number,
    iat?: number,
    exp?: number
}

export type RegisteredUserData = {
    createdAt?: string,
    email?: string,
    entryTest?: number | boolean
    exp?: number,
    first_name?: string,
    iat?: number,
    id?: string,
    last_name?: string,
    updatedAt?: string,
    user_role?: number,
    optedCourses?: {
        course: string[],
    },
}

export interface iRegisterUser {
    data: RegisteredUserData,
    message: string,
}