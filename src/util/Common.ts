import {Slide, toast} from "react-toastify";
import {QuizDataType} from "@/interfaces/iQuizData";
import {DefaultCourseObj, DefaultCourseType} from "../../redux/store/slices/courseReducer";

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

export const getCookie = (name: string) => typeof window !== "undefined" ? document.cookie.match(new RegExp(`(^| )${name}=([^;]+)`))?.at(2) : null;

export function capitalizeEachWord(str: string) {
    let splitStr = str?.toLowerCase().split(' ');
    for (let i = 0; i < splitStr?.length; i++) {
        splitStr[i] = splitStr[i]?.charAt(0).toUpperCase() + splitStr[i].substring(1);
    }
    return splitStr?.join(' ');
}

export const getQuestionsByType = (allData: QuizDataType, argsQuestionType: string) => {
    return allData.filter((data) => {
        return data.question_type === argsQuestionType
    })
}

export const getCourseByName = (defaultCourses: DefaultCourseType, courseName: string) => {
    let returnObj = {}
    defaultCourses?.map((eachCourse) => {
        if (eachCourse?.course_name?.toLowerCase() === courseName?.toLowerCase()) {
            returnObj = eachCourse
        }
    })
    return returnObj
}

export const getCourseById = (defaultCourses: DefaultCourseType, courseId: string) => {
    let courseArr = defaultCourses?.map((eachCourse: DefaultCourseObj) => {
        if (eachCourse?.id?.toLowerCase() === courseId?.toString().toLowerCase()) {
            return eachCourse
        }
    })
    return Object.assign({}, ...courseArr)
}


export const notifySuccess = (args: string) => toast.success(args, {
    toastId: "toast-success_notification",
    position: "top-right",
    autoClose: 2000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: false,
    theme: "colored",
    transition: Slide,
});

export const notifyError = (args: string) => toast.error(args, {
    toastId: "toast-error_notification",
    position: "top-right",
    autoClose: 2000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: false,
    theme: "colored",
    transition: Slide,
});
