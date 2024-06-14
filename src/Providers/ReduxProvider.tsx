"use client";
import {Provider} from "react-redux"
import {persistor, store} from "../../redux/store/mainStore";
import React, {Suspense, useEffect, useRef, useState} from "react";
import {PersistGate} from 'redux-persist/integration/react';
import Loading from "@/app/loading";

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
            <Suspense fallback={<Loading/>}>
                <Provider store={store}>
                    {children}
                </Provider>
            </Suspense>
        )
    } else if (isClient) {
        // If it's client side, load with the Persist Gate!
        return (
            <Suspense fallback={<Loading/>}>
                <Provider store={store}>
                    <PersistGate loading={null} persistor={persistor}>
                        {children}
                    </PersistGate>
                </Provider>
            </Suspense>
        );
    }
};