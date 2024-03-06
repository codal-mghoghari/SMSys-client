"use client";

import {useRouter} from "next/navigation";
import {jwtUserData, RegisteredUserData} from "@/interfaces/iRegisterUser";
import {jwtDecode} from "jwt-decode";
import {capitalizeEachWord, getCooki} from "@/util/Common";
import {Aside} from "@/components/Aside";
import {DashboardContent} from "@/components/DashboardContent";
import {ChangeEvent, useEffect, useRef, useState} from "react";
import {updateUserCourse} from "@/controller/userController";
import {notifySuccess, notifyError} from "@/util/Common";
import {useDispatch, useSelector} from "react-redux";
import {rootStateType} from "../../../redux/store/mainStore";
import {_setUserCourses} from "../../../redux/store/slices/userReducer";
import defaultConfig from "../../configuration/defaultConfig.json"

type optedCourse = {
    js: boolean,
    ts: boolean,
    cSharp: boolean,
    java: boolean,
}

export default function Page() {
    //Global preload
    const isLoggedIn = !!getCooki('token');
    const userDataSelector: RegisteredUserData = useSelector((state: rootStateType) => state.user.loggedInUserData);


    //Local States
    const [activeElem, setActiveElem] = useState("user");
    const [optedCourses, setOptedCourses] = useState<optedCourse>(userDataSelector.optedCourses === undefined ? ({}) : (JSON.parse(userDataSelector.optedCourses!)));

    //Variables
    const {userData}: jwtUserData = jwtDecode(getCooki('token')!);
    const {push} = useRouter();
    const prevOptedCourses = useRef(optedCourses);
    const saveOptedCourses = (document.getElementById('saveOptedCourses')!)
    const dispatch = useDispatch();

    const tickHandler = (e: ChangeEvent<HTMLInputElement>) => {
        const checked = (e.target as HTMLInputElement).checked;
        setOptedCourses({
            ...optedCourses,
            [e.target.id]: checked,
        })
    }

    const handleSaveOptedCourses = () => {
        setTimeout(async () => {
            await updateUserCourse(optedCourses, userData.id!).then(res => {
                if (res.data) {
                    notifySuccess(res.message)
                    dispatch(_setUserCourses(JSON.stringify(optedCourses)))
                } else {
                    notifyError(res.message)
                }
            })
            saveOptedCourses.classList.add('invisible')
            prevOptedCourses.current = optedCourses
        }, 2000)
    }

    useEffect(() => {
        if(!isLoggedIn){ //Check if user has token in their cookie, if not it shall be logged out.
            push('/login')
        }

        let inputElements = (document.getElementById('opt-course-container') as HTMLElement).getElementsByTagName('input')
        for (let i = 0; i < inputElements.length; i++) {
            inputElements[i].checked = Object.values(optedCourses)[i]
        }
        if (JSON.stringify(prevOptedCourses.current) !== JSON.stringify(optedCourses)) {
            saveOptedCourses.classList.remove('invisible')
        } else {
            const saveOptedCourses = (document.getElementById('saveOptedCourses')!)
            saveOptedCourses.classList.add('invisible')
        }
    }, [optedCourses]);

    const handleUserClick = () => {
        setActiveElem("user")
        const userDashboardElem = document.getElementById('user') as HTMLElement
        const settingsElem = document.getElementById('settings') as HTMLElement
        userDashboardElem.classList.remove("invisible")
        settingsElem.classList.add("invisible")
    }

    const handleSettingsClick = () => {
        setActiveElem("settings")
        const userDashboardElem = document.getElementById('user') as HTMLElement
        const settingsElem = document.getElementById('settings') as HTMLElement
        settingsElem.classList.remove("invisible")
        userDashboardElem.classList.add("invisible")
    }

    return (
        <>
            {
                isLoggedIn ? (
                    <>
                        <div className="h-screen w-full bg-white relative flex overflow-hidden">
                            <Aside active={activeElem} handleUserClick={handleUserClick}
                                   handleSettingsClick={handleSettingsClick}/>
                            <div className="relative w-full h-full flex flex-col">
                                <span
                                    className="absolute left-0 top-3 z-10 text-white text-xl font-bold animate-pulse">{defaultConfig.websiteTitle}</span>
                                <header
                                    className="h-16 w-full flex items-center relative justify-end px-5 space-x-10 bg-custom-primary">
                                    <div className="flex flex-shrink-0 items-center space-x-4 text-white">

                                        <div className="flex flex-col items-end ">
                                            <div
                                                className="text-md font-medium">{capitalizeEachWord(userDataSelector.full_name!)}</div>
                                            <div
                                                className="text-sm font-regular">{userDataSelector.role === 0 ? ('Admin') : ('Student')}</div>
                                        </div>

                                        <div
                                            className="h-10 w-10 z-20 rounded-full cursor-pointer bg-gray-200 border-2 border-gray-500">
                                            <img src="https://dummyjson.com/image/300" alt="pfp"
                                                 className="rounded-full z-10"/>
                                        </div>
                                    </div>
                                </header>

                                <DashboardContent
                                    userData={userDataSelector}
                                    active={activeElem}
                                    jsHandler={(e) => tickHandler(e)}
                                    tsHandler={(e) => tickHandler(e)}
                                    cSharpHandler={(e) => tickHandler(e)}
                                    javaHandler={(e) => tickHandler(e)}/>
                                <div id="saveOptedCourses"
                                     className="flex flex-row items-center justify-end absolute bottom-0 bg-gray-300 w-full h-16 z-20 rounded invisible opacity-90
                                     transition-all duration-300 ease-in-out
                                     "> {/* If optedCourses changes, shows a row for saving it!*/}
                                    <button type="button"
                                            onClick={handleSaveOptedCourses}
                                            className="text-white bg-gray-800 hover:bg-gray-900 transition-transform duration-[80ms] ease-in active:scale-[0.95] focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-full text-sm px-10 py-2.5 me-2 mb-2 mr-10">Save
                                        Changes
                                    </button>


                                </div>
                            </div>
                        </div>
                    </>
                ) : (
                    push('/login')
                )
            }
        </>
    )
}