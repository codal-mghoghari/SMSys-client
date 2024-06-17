import {redirect} from 'next/navigation';
import {getCookie} from "@/util/Common";


export default function Home() {
    return (
        <>
            {
                !!(getCookie('token')) ? redirect('/dashboard') : redirect('/login')
            }
        </>
    );
}
