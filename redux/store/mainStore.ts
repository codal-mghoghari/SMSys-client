import {combineReducers, configureStore} from '@reduxjs/toolkit'
import userReducer from "./slices/userReducer";
import {persistStore, persistReducer} from 'redux-persist'
import quizReducer from "./slices/quizReducer";

import createWebStorage from "redux-persist/es/storage/createWebStorage";

function createPersistStore() { //To fix the warning/error for falling back to noop-storage or usage of static storage.
    const isServer = typeof window === "undefined";
    if (isServer) {
        return {
            getItem() {
                return Promise.resolve(null);
            },
            setItem() {
                return Promise.resolve();
            },
            removeItem() {
                return Promise.resolve();
            },
        };
    }
    return createWebStorage("local");
}

const storage = typeof window !== "undefined" ? createWebStorage("local") : createPersistStore();

const isClient = typeof window !== "undefined";

//@ts-ignore
export type rootStateType = ReturnType<typeof store.getState>;

const persistConfig = {
    key: 'root',
    storage,
}

const userPersistConfig = {
    key: 'user',
    storage,
}

const quizPersistConfig = {
    key: 'quiz',
    storage,
}

const rootReducer = combineReducers({
    user: persistReducer(userPersistConfig, userReducer),
    quiz: persistReducer(quizPersistConfig, quizReducer),
})

const persistedReducer = persistReducer(persistConfig, rootReducer)

const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware(
        {
            serializableCheck: false,
            thunk: true
        }
    )
})

const persistor = persistStore(store)
export {store, persistor}