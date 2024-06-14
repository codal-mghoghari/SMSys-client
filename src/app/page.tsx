"use client";
import {useRouter} from 'next/navigation';
import {getCookie} from "@/util/Common";
import {useEffect, useState} from "react";

export default function Home() {
    //Variables
    const {push} = useRouter();

    // States
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        if (typeof window !== "undefined") {
            setIsLoggedIn(!!(getCookie('token')))
        }
    }, []);

    return (
        <>
            {
                isLoggedIn ? push('/dashboard') : push('/login')
            }
        </>
    );
}
