import axios, {AxiosResponse} from "axios";
import {getCookie} from "@/util/Common";

axios.defaults.headers.common.Authorization = `Bearer ${getCookie("token")}`
// axios.defaults.headers.common.Accept = "application/json"
// axios.defaults.headers.common["Content-Type"] = "application/json"
// axios.defaults.headers.common["Access-Control-Allow-Origin"] = "*"

const Client = axios.create({
    // withCredentials: true,
})


export const getAllPaginatedQuestions = async (include: string | null = null) => {
    let extraParams = `${include ? "?include=" + include : "/"}`
    return await Client.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/questions${extraParams}`)
        .then(
            (response: AxiosResponse) => {
                return response?.data
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

export const getAllOptions = async (include: string | null = null) => {
    let extraParams = `${include ? "?include=" + include : "/"}`
    return await Client.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/options${extraParams}`)
        .then(
            (response: AxiosResponse) => {
                return response?.data
            }
        )
        .catch((error) => {
            if (error?.response?.status) {
                return error?.response?.data
            }
            return error
        })
}

export const getOptionsByQId = async (id: string, include: string | null = null) => {
    let extraParams = `${include ? "?include=" + include : "/"}`
    return await Client.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/options/${id}${extraParams}`)
        .then(
            (response: AxiosResponse) => {
                return response?.data
            }
        )
        .catch((error) => {
            console.log("getOptionsByQId ERROR: ", error)
            if (error?.response) {
                if (error?.response?.data) {
                    return error?.response?.data
                }
                return error?.response
            }
            return error
        })
}

export const checkOptionIsCorrect = async (id: string | undefined) => {
    return await Client.get(`${process.env.NEXT_PUBLIC_API_BASE_URL}/options/${id}?isOptId=true`)
        .then(
            (response: AxiosResponse) => {
                return response?.data
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