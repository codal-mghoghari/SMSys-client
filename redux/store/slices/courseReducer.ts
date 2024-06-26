import {createSlice} from "@reduxjs/toolkit"

export type DefaultCourseType = {
    id?: string,
    course_name?: string,
    createdAt?: string,
    updatedAt?: string,
}[]

export type DefaultCourseObj = {
    id?: string,
    course_name?: string,
    createdAt?: string,
    updatedAt?: string,
}

export type coursesType = {
    courses: {
        defaultCourses: [
            {
                id?: string,
                course_name?: string,
                createdAt?: string,
                updatedAt?: string,
            }
        ],
        recommCourses: []
    }
}

const initialState: coursesType = {
    courses: {
        defaultCourses: [{}],
        recommCourses: []
    },
}

export const courseSlice = createSlice({
    name: 'Course',
    initialState,
    reducers: {
        _setDefaultCourses: (state, action) => {
            state.courses.defaultCourses = action.payload
        },
        _setRecommCourses: (state, action) => {
            state.courses.recommCourses = action.payload
        },
    }
})


export default courseSlice.reducer

export const {
    _setDefaultCourses,
    _setRecommCourses
} = courseSlice.actions