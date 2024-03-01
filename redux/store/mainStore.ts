import {configureStore} from '@reduxjs/toolkit'
import userReducer from "./slices/userReducer";

export type rootStateType = ReturnType<typeof store.getState>;
export const store = configureStore({
    reducer: {
        Auth: userReducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware(
        {
            serializableCheck: false
        }
    )
})