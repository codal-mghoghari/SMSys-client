import axios, {AxiosError, AxiosHeaders, AxiosResponse} from "axios";
import {getCookie} from "@/util/Common";
import {decode} from "jsonwebtoken";

axios.defaults.headers.common.Authorization = `Bearer ${getCookie("token")}`
axios.defaults.headers.common.Accept = "application/json"
axios.defaults.headers.common["Content-Type"] = "application/json"
axios.defaults.headers.common["Access-Control-Allow-Origin"] = "*"

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
            if (error.response.status) {
                return error.response.data
            } else {
                return error
            }
        })
}

export const loginUser = async (email: string, password: string) => {
    return await Client.post(`${process.env.NEXT_PUBLIC_API_BASE_URL}/login`, {
        email: email,
        password: password
    })
        .then(
            (response: AxiosResponse) => {
                return decode(response?.data)
            }
        )
        .catch((error) => {
            return error
        })
}

export const updateUserEntryTest = async (data: boolean, id: number) => {
    return await Client.put(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/user/${id}`, {entry_test: data})
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