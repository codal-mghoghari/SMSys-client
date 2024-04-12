"use client";
import {useRouter} from 'next/navigation';
import {getCookie} from "@/util/Common";

export default function Home() {
    //Variables
    const {push} = useRouter();
    const isLoggedIn = !!(getCookie('token')!)

    return (
        <>
            {
                isLoggedIn ? push('/dashboard') : push('/login')
            }
        </>
    );
}
