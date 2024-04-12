import {createSlice} from "@reduxjs/toolkit";
import {RegisteredUserData} from "@/interfaces/iRegisterUser";

type loggedUserData = {
    loggedInUserData: RegisteredUserData,
    entryTest: false
}

const initialState: loggedUserData = {
    loggedInUserData: {
        full_name: ""
    },
    entryTest: false
}

export const userSlice = createSlice({
    name: 'Authentication',
    initialState,
    reducers: {
        _setUser: (state, action) => {
            state.loggedInUserData = action.payload
        },
        _setUserCourses: (state, action) => {
            state.loggedInUserData.optedCourses = action.payload
        },
        _setUserEntryTest: (state, action) => {
            state.entryTest = action.payload
        },
    }
})


export default userSlice.reducer

export const {
    _setUser,
    _setUserCourses,
    _setUserEntryTest,
} = userSlice.actions