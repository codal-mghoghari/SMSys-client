import {createSlice} from "@reduxjs/toolkit";
import {RegisteredUserData} from "@/interfaces/iRegisterUser";

type loggedUserData = {
    loggedInUserData: RegisteredUserData
}

const initialState: loggedUserData = {
    loggedInUserData: {}
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
        }
    }
})


export default userSlice.reducer

export const {
    _setUser,
    _setUserCourses
} = userSlice.actions