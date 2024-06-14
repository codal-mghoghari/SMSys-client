import axios, {AxiosResponse} from "axios";
import {getCookie} from "cookies-next";

axios.defaults.headers.common.Authorization = `Bearer ${getCookie("token")}`
// axios.defaults.headers.common.Accept = "application/json"
// axios.defaults.headers.common["Content-Type"] = "application/json"
// axios.defaults.headers.common["Access-Control-Allow-Origin"] = " *"
// axios.defaults.headers.common["Access-Control-Allow-Credentials"] = true

const Client = axios.create({
    withCredentials: true,
})

export const registerUser = async (first_name: string, last_name: string, email: string, password: string) => {
    return await Client.post(`${process.env.NEXT_PUBLIC_API_BASE_URL}/register`, {
        first_name: first_name,
        last_name: last_name,
        email: email,
        password: password
    })
        .then(
            (response: AxiosResponse) => {
                return response
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

export const loginUser = async (email: string, password: string) => {
    return await Client.post(`${process.env.NEXT_PUBLIC_API_BASE_URL}/login`, {
        email: email,
        password: password
    })
        .then(
            (response: AxiosResponse) => {
                return response
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

export const updateUser = async (bool: boolean, id: string) => {
    return await Client.post(`${process.env.NEXT_PUBLIC_API_BASE_URL}/users/${id}`, {
        entryTest: bool
    })
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