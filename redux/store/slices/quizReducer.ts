import {createSlice} from "@reduxjs/toolkit";
import {StringIndexable} from "@/util/Util";


const initialState = {
    quizData: {
        isStarted: false,
        answeredQuestions: {},
        unAnsweredQuestions: {},
        recommCourses: {}
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
            state.quizData.answeredQuestions = action.payload
        },
        _resetQuizQuestions: (state) => {
            state.quizData.answeredQuestions = {}
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
        _setRecommCourses: (state, action) => {
            state.quizData.recommCourses = action.payload
        }
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
    _setRecommCourses
} = quizSlice.actions