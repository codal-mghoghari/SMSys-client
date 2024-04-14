import axios, {AxiosError, AxiosResponse} from "axios";
import {getCookie} from "@/util/Common";

const Client = axios.create({
    headers: {
        "Accept": "application/json",
        "Access-Control-Allow-Origin": "http://localhost:8000/",
        "Content-Type": "application/json",
        "Authorization": "Bearer " + getCookie('token')
    },
    withCredentials: true,
})

export const getAllCoursesWithoutPagination = async () => {
    return await Client.get(`http://localhost:8000/api/course/`)
        .then(
            (response: AxiosResponse) => {
                return response.data
            }
        )
        .catch((error) => {
            if (error.response.status) {
                return error.response.statusText
            } else {
                return error
            }
        })
}

export const getUserOptedCourses = async (id: number) => {
    return await Client.get(`http://localhost:8000/api/optcourse/${id}`)
        .then(
            (response: AxiosResponse) => {
                return response.data
            }
        )
        .catch((error) => {
            if (error.response.status) {
                return error.response.statusText
            } else {
                return error
            }
        })
}

export const getAllOptedCourses = async () => {
    return await Client.get(`http://localhost:8000/api/optcourse/`)
        .then(
            (response: AxiosResponse) => {
                return response.data
            }
        )
        .catch((error) => {
            if (error.response.status) {
                return error.response.statusText
            } else {
                return error
            }
        })
}

export const addUserCourse = async (data: { courseId?: string }, id: number) => {
    return await Client.post(`http://localhost:8000/api/optcourse/${id}`, JSON.stringify(data))
        .then(
            (response: AxiosResponse) => {
                return response.data
            }
        )
        .catch((error) => {
            if (error.response.status) {
                return error.response.statusText
            } else {
                return error
            }
        })
}

export const deleteUserCourse = async (id?: string) => {
    return await Client.delete(`http://localhost:8000/api/optcourse/${id}`)
        .then(
            (response: AxiosResponse) => {
                return response.data
            }
        )
        .catch((error) => {
            if (error.response.status) {
                return error.response.statusText
            } else {
                return error
            }
        })
}