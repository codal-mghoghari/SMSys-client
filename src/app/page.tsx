"use client";
import {useRouter} from 'next/navigation';

export default function Home() {
    //Variables
    const {push} = useRouter();
    const isLoggedIn = !!(localStorage.getItem('token')!)

    return (
        <>
            {
                isLoggedIn ? (push('/dashboard')) : (push('/login'))
            }
        </>
    );
}
