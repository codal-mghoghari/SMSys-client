import axios, {AxiosError, AxiosResponse} from "axios";
import {getCooki} from "@/util/Common";

const Client = axios.create({
    headers: {"Content-Type": "application/json", "Authorization": "Bearer " + getCooki('token')},
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
            if (error.response.status === 400) {
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
                return response.data
            }
        )
        .catch((error) => {
            if (error.response.status === 400) {
                return error.response.data
            } else if(error.response.status === 404) {
                return error.response.data
            } else {
                return error
            }
        })
}


export const updateUserCourse = async (data: { js: boolean, ts: boolean, cSharp: boolean, java: boolean }, id: number) => {
    return await Client.put(`http://localhost:8000/api/user/${id}`, {
        optedCourses: JSON.stringify(data)
    })
        .then(
            (response: AxiosResponse) => {
                return response.data
            }
        )
        .catch((error) => {
            if (error.response.status === 400) {
                return error.response.data
            } else if(error.response.status === 404) {
                return error.response.data
            } else {
                console.log(error)
                return error
            }
        })
}