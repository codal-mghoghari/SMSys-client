import {createSlice} from "@reduxjs/toolkit";
import {StringIndexable} from "@/util/Util";


const initialState = {
    quizData: {
        isStarted: false,
        questions: {},
        unAnsweredQuestions: {},
    }
}

export const quizSlice = createSlice({
    name: 'Quiz',
    initialState,
    reducers: {
        _setStarted: (state, action: { payload: boolean, type: string }) => {
            state.quizData.isStarted = action.payload
        },
        _setQuizData: (state, action) => {
            state.quizData = action.payload
        },
        _updateQuizData: (state, action: { payload: any, type: string }) => {
            state.quizData.questions = action.payload
        },
        _resetQuizQuestions: (state) => {
            state.quizData.questions = {}
        },
        _setUnAnsweredQuestions: (state, action: { payload: any, type: string }) => {
            state.quizData.unAnsweredQuestions = action.payload
        },
        _removeUnAnsweredQuestions: (state: StringIndexable, action: { payload: any, type: string }) => {
            delete state.quizData.unAnsweredQuestions[action.payload]
        },
        _resetUnAnsweredQuestions: (state) => {
            state.quizData.unAnsweredQuestions = {}
        },
    }
})


export default quizSlice.reducer

export const {
    _setStarted,
    _setQuizData,
    _updateQuizData,
    _resetQuizQuestions,
    _setUnAnsweredQuestions,
    _removeUnAnsweredQuestions,
    _resetUnAnsweredQuestions,
} = quizSlice.actions