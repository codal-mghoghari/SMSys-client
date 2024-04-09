export type jwtUserData = {
    userData?: RegisteredUserData,
    iat?: number,
    exp?: number
}

export type RegisteredUserData = {
    createdAt?: string,
    date_of_birth?: null | string,
    email?: string,
    first_name?: string,
    full_name: string,
    id?: number,
    is_deleted?: number,
    last_name?: string,
    password?: string,
    role?: number,
    updatedAt?: string,
    optedCourses?: string,
}

export interface iRegisterUser {
    data: RegisteredUserData,
    message: string,
}