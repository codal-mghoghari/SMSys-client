"use client";

import {useRouter} from "next/navigation";
import {jwtUserData} from "../../../interfaces/iRegisterUser";
import {jwtDecode} from "jwt-decode";
import {capitalizeEachWord} from "../../../util/Common";
import {ToggleBtn} from "@/components/ToggleBtn";
import {Aside} from "@/components/Aside";
import {DashboardContent} from "@/components/DashboardContent";
import {ChangeEvent, useEffect, useState} from "react";

type optedCourse = {
    js: boolean,
    ts: boolean,
    cSharp: boolean,
    java: boolean,
}[]

export default function Page() {
    //Local States
    const [activeElem, setActiveElem] = useState("user");
    const [optedCourses, setOptedCourses] = useState<optedCourse>([{
        js: false,
        ts: false,
        cSharp: false,
        java: false,
    }])

    //Variables
    const isLoggedIn = !!(localStorage?.getItem('token')!)
    const {push} = useRouter();
    const {userData}: jwtUserData = jwtDecode(localStorage?.getItem('token')!);

    const jsHandler = (e: ChangeEvent<HTMLInputElement>) => {
        const checked = (e.target as HTMLInputElement).checked;
        let stateCopy = Object.assign({}, optedCourses);
        stateCopy[0].js = checked
        setOptedCourses(stateCopy)
    }
    const tsHandler = (e: ChangeEvent<HTMLInputElement>) => {
        const checked = (e.target as HTMLInputElement).checked;
        let stateCopy = Object.assign({}, optedCourses);
        stateCopy[0].ts = checked
        setOptedCourses(stateCopy)
    }
    const cSharpHandler = (e: ChangeEvent<HTMLInputElement>) => {
        const checked = (e.target as HTMLInputElement).checked;
        let stateCopy = Object.assign({}, optedCourses);
        stateCopy[0].cSharp = checked
        setOptedCourses(stateCopy)
    }
    const javaHandler = (e: ChangeEvent<HTMLInputElement>) => {
        const checked = (e.target as HTMLInputElement).checked;
        let stateCopy = Object.assign({}, optedCourses);
        stateCopy[0].java = checked
        setOptedCourses(stateCopy)
    }

    return (
        <>
            {
                isLoggedIn ? (
                    <>
                        <div className="h-screen w-full bg-white relative flex overflow-hidden">
                            <Aside active={activeElem} handleUserClick={() => {
                                setActiveElem("user")
                            }} handleSettingsClick={() => {
                                setActiveElem("settings")
                            }}/>
                            <div className="relative w-full h-full flex flex-col">
                                <span
                                    className="absolute left-0 top-3 z-10 text-white text-xl font-bold animate-pulse">SMSys</span>
                                <header
                                    className="h-16 w-full flex items-center relative justify-end px-5 space-x-10 bg-gray-800">
                                    <div className="flex flex-shrink-0 items-center space-x-4 text-white">

                                        <div className="flex flex-col items-end ">
                                            <div
                                                className="text-md font-medium">{capitalizeEachWord(userData.full_name)}</div>
                                            <div
                                                className="text-sm font-regular">{userData.role === 0 ? ('Admin') : ('Student')}</div>
                                        </div>

                                        <div
                                            className="h-10 w-10 z-20 rounded-full cursor-pointer bg-gray-200 border-2 border-gray-500">
                                            <img src="https://dummyjson.com/image/300" alt="pfp"
                                                 className="rounded-full z-10"/>
                                        </div>
                                    </div>
                                </header>

                                <DashboardContent active={activeElem} jsHandler={(e) => jsHandler(e)}
                                                  tsHandler={(e) => tsHandler(e)}
                                                  cSharpHandler={(e) => cSharpHandler(e)}
                                                  javaHandler={(e) => javaHandler(e)}/>
                                <div className="absolute bottom-0 bg-gray-300 w-full h-16 z-20 rounded opacity-0"> {/* If optedCourses changes, shows a row for saving it!*/}
                                    <button type="button"
                                            className=""
                                            >Save</button>
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