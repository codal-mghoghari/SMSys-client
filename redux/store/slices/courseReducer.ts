import {createSlice} from "@reduxjs/toolkit"

export type coursesType = {
    courses: {
        defaultCourses: [
            {
                id?: string,
                course?: string,
                createdAt?: string,
                updatedAt?: string,
            }
        ]
    }
}

const initialState: coursesType = {
    courses: {
        defaultCourses: [{}]
    },
}

export const courseSlice = createSlice({
    name: 'Course',
    initialState,
    reducers: {
        _setDefaultCourses: (state, action) => {
            state.courses.defaultCourses = action.payload
        },
    }
})


export default courseSlice.reducer

export const {
    _setDefaultCourses,
} = courseSlice.actions