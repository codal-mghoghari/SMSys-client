import type {Metadata} from "next";
import {Inter} from "next/font/google";
import "./globals.css";
import React from "react";

const inter = Inter({subsets: ["latin"]});

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
        {children}</body>
        </html>
    );
}
