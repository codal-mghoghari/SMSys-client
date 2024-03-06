import {Slide, toast} from "react-toastify";

export function createCookie(username: string, value: string, minutes: number) {
    let expires, date;
    if (minutes) {
        date = new Date();
        date.setTime(date.getTime() + (minutes * 60 * 1000));
        expires = "; expires=" + date.toUTCString();
    } else {
        expires = "";
    }
    document.cookie = username + "=" + value + expires + "; path=/";
}

export function getCooki(name: string) {
    if(typeof window !== "undefined") {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop()?.split(';').shift();
    }
}

export function capitalizeEachWord(str: string) {
    let splitStr = str.toLowerCase().split(' ');
    for (let i = 0; i < splitStr.length; i++) {
        splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);
    }
    return splitStr.join(' ');
}


export const notifySuccess = (args: string) => toast.success(args, {
    toastId: "toast-success_notification",
    position: "top-right",
    autoClose: 3000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    theme: "colored",
    transition: Slide,
});

export const notifyError = (args: string) => toast.error(args, {
    toastId: "toast-error_notification",
    position: "top-right",
    autoClose: 3000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    theme: "colored",
    transition: Slide,
});
