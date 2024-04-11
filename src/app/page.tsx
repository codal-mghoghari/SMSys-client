"use client";
import {useRouter} from 'next/navigation';
import {getCooki} from "@/util/Common";

export default function Home() {
    //Variables
    const {push} = useRouter();
    const isLoggedIn = !!(getCooki('token')!)

    return (
        <>
            {
                isLoggedIn ? push('/dashboard') : push('/login')
            }
        </>
    );
}
