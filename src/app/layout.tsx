import type {Metadata} from "next";
import {Inter} from "next/font/google";
import "./globals.css";
import React, {Suspense} from "react";
import ReduxProvider from "@/Providers/ReduxProvider";
import {ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const inter = Inter({subsets: ["latin"]});


import type {Viewport} from 'next'
import Loading from "@/app/loading";

export const viewport: Viewport = {
    width: 'device-width',
    initialScale: 1,
    userScalable: false,
}

export const metadata: Metadata = {
    icons: [
        {
            rel: 'icon',
            type: 'image/png',
            sizes: '16x16',
            url: '/student-32x32.png',
        },
        {
            rel: 'apple-touch-icon',
            type: 'image/png',
            sizes: '16x16',
            url: '/student-32x32.png',
        },
    ],
    title: "SMSys",
    description: "Student Management with courses and ranking system.",
};

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
        <body className={inter.className}>
        <ReduxProvider>
            <Suspense fallback={<Loading/>}>
                <ToastContainer/>
                {children}
            </Suspense>
        </ReduxProvider>
        </body>
        </html>
    );
}
