import axios, {AxiosResponse} from "axios";
import {getCookie} from "@/util/Common";

axios.defaults.headers.common.Authorization = `Bearer ${getCookie("token")}`
axios.defaults.headers.common.Accept = "application/json"
axios.defaults.headers.common["Content-Type"] = "application/json"
axios.defaults.headers.common["Access-Control-Allow-Origin"] = "*"

const Client = axios.create({
    withCredentials: true,
})


export const getAllPaginatedQuestions = async (size: number = -1) => {
    let url = size !== -1 ? `quiz?size=${size}` : `quiz`
    return await Client.get(`http://localhost:8000/api/${url}`)
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

export const getQuestionOptions = async (id: number) => {
    return await Client.get(`http://localhost:8000/api/quiz/${id}`)
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

export const checkOptionIsCorrect = async (id: string | undefined) => {
    return await Client.get(`http://localhost:8000/api/quiz/${id}?isCorrect=1`)
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