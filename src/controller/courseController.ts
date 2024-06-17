import axios, {AxiosHeaders, AxiosResponse} from "axios";
import {getCookie} from "@/util/Common";

axios.defaults.headers.common.Authorization = `Bearer ${getCookie("token")}`
// axios.defaults.headers.common.Accept = "application/json"
axios.defaults.headers.common["Content-Type"] = "application/json"
// axios.defaults.headers.common["Access-Control-Allow-Origin"] = "*"
// axios.defaults.headers.common["Access-Control-Allow-Credentials"] = true

const Client = axios.create({
    // withCredentials: true,
})

export const getAllCoursesWithoutPagination = async () => {
    return await Client.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/courses/`)
        .then(
            (response: AxiosResponse) => {
                return response.data
            }
        )
        .catch((error) => {
            if (error?.response) {
                if (error?.response?.data) {
                    return error?.response?.data
                }
                return error?.response
            }
            return error
        })
}

export const getUserOptedCourses = async (id?: string) => {
    return await Client.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/optedcourses/${id}`)
        .then(
            (response: AxiosResponse) => {
                return response.data
            }
        )
        .catch((error) => {
            if (error?.response?.status) {
                return error?.response?.statusText
            } else {
                return error
            }
        })
}

export const getAllOptedCourses = async () => {
    return await Client.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/optedcourses/`)
        .then(
            (response: AxiosResponse) => {
                return response.data
            }
        )
        .catch((error) => {
            if (error?.response?.status) {
                return error?.response?.statusText
            } else {
                return error
            }
        })
}

export const addUserCourse = async (userId?: string, courseId?: string) => {
    return await Client.post(`${process.env.NEXT_PUBLIC_API_BASE_URL}/optedcourses/${userId}`, JSON.stringify({id: courseId}))
        .then(
            (response: AxiosResponse) => {
                return response.data
            }
        )
        .catch((error) => {
            if (error?.response?.status) {
                return error?.response?.statusText
            } else {
                return error
            }
        })
}

export const deleteUserCourse = async (courseId?: string) => {
    return await Client.delete(`${process.env.NEXT_PUBLIC_API_BASE_URL}/optedcourses/${courseId}`)
        .then(
            (response: AxiosResponse) => {
                return response.data
            }
        )
        .catch((error) => {
            if (error?.response) {
                if (error?.response?.data) {
                    return error?.response?.data
                }
                return error?.response
            }
            return error

        })
}

export const getUserRecommCourses = async (userId?: string) => {
    return await Client.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/recommcourses/${userId}`)
        .then(
            (response: AxiosResponse) => {
                return response.data
            }
        )
        .catch((error) => {
            if (error?.response) {
                if (error?.response?.data) {
                    return error?.response?.data
                }
                return error?.response
            }
            return error
        })
}


export const addUserRecommCourse = async (courseId?: string, userId?: string) => {
    return await Client.post(`${process.env.NEXT_PUBLIC_API_BASE_URL}/recommcourses/${userId}`, JSON.stringify({
        id: courseId
    }))
        .then(
            (response: AxiosResponse) => {
                return response.data
            }
        )
        .catch((error) => {
            if (error?.response) {
                if (error?.response?.data) {
                    return error?.response?.data
                }
                return error?.response
            }
            return error
        })
}

export const deleteUserRecommCourse = async (id?: string) => {
    return await Client.delete(`${process.env.NEXT_PUBLIC_API_BASE_URL}/recommcourses/${id}`)
        .then(
            (response: AxiosResponse) => {
                return response.data
            }
        )
        .catch((error) => {
            if (error?.response) {
                if (error?.response?.data) {
                    return error?.response?.data
                }
                return error?.response
            }
            return error
        })
}