"use client";
import {Provider} from "react-redux"
import {persistor, store} from "../../redux/store/mainStore";
import React, {useEffect, useState} from "react";
import {PersistGate} from 'redux-persist/integration/react';

export default function ReduxProvider({children}: { children: React.ReactNode }) {
    const [isClient, setIsClient] = useState(false)
    useEffect(() => {
        if (typeof window !== 'undefined') {
            setIsClient(true)
        }
    }, [])

    if (!isClient) {
        // If it's server side, load without the Persist Gate!
        return (
                <Provider store={store}>
                    {children}
                </Provider>
        )
    } else if (isClient) {
        // If it's client side, load with the Persist Gate!
        return (
                <Provider store={store}>
                    <PersistGate loading={null} persistor={persistor}>
                        {children}
                    </PersistGate>
                </Provider>
        );
    }
};