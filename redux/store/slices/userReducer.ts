import {createSlice} from "@reduxjs/toolkit";


const initialState = {
    userState: {}
}

export const userSlice = createSlice({
    name: 'Authentication',
    initialState,
    reducers: {
        _setUser: (state, action) => {
            state.userState = action.payload
        },
    }
})


export default userSlice.reducer

export const {
    _setUser
} = userSlice.actions