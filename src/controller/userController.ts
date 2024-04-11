import axios, {AxiosError, AxiosResponse} from "axios";
import {getCooki} from "@/util/Common";

const Client = axios.create({
    headers: {
        "Accept": "application/json",
        "Access-Control-Allow-Origin": "http://localhost:8000/",
        "Content-Type": "application/json",
        "Authorization": "Bearer " + getCooki('token')
    },
    withCredentials: true,
})

export const registerUser = async (first_name: string, last_name: string, email: string, password: string) => {
    return await Client.post('http://localhost:8000/api/signup', {
        first_name: first_name,
        last_name: last_name,
        email: email,
        password: password
    })
        .then(
            (response: AxiosResponse) => {
                return response.data
            }
        )
        .catch((error) => {
            if (error.response.status) {
                return error.response.data
            } else {
                return error
            }
        })
}

export const loginUser = async (email: string, password: string) => {
    return await Client.post('http://localhost:8000/api/login', {
        email: email,
        password: password
    })
        .then(
            (response: AxiosResponse) => {
                return response?.data
            }
        )
        .catch((error) => {
            if (error.response.status) {
                return error.response.data
            } else {
                return error
            }
        })
}


export const updateUserCourse = async (data: {courseId: string}, id: number) => {
    return await Client.post(`http://localhost:8000/api/optcourse/${id}`, {
        courseId: JSON.stringify(data)
    })
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

export const updateUserEntryTest = async (data: boolean, id: number) => {
    return await Client.put(`http://localhost:8000/api/user/${id}`, {entryTest: data})
        .then(
            (response: AxiosResponse) => {
                return response.data
            }
        )
        .catch((error) => {
            if (error.response.status) {
                return error.response.data
            } else {
                return error
            }
        })
}