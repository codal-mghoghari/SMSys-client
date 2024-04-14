"use client";

import {useRouter} from "next/navigation";
import {jwtUserData, RegisteredUserData} from "@/interfaces/iRegisterUser";
import {jwtDecode} from "jwt-decode";
import {capitalizeEachWord, createCookie, getCookie} from "@/util/Common";
import {Aside} from "@/components/Aside";
import {DashboardContent} from "@/components/DashboardContent";
import {ChangeEvent, useEffect, useRef, useState} from "react";
import {addUserCourse, deleteUserCourse} from "@/controller/courseController";
import {notifySuccess, notifyError} from "@/util/Common";
import {useDispatch, useSelector} from "react-redux";
import {rootStateType} from "../../../redux/store/mainStore";
import {_setUser, _setUserCourses} from "../../../redux/store/slices/userReducer";
import defaultConfig from "../../configuration/defaultConfig.json"
import "./page.css"
import {StringIndexable} from "@/util/Util";
import {coursesType} from "../../../redux/store/slices/courseReducer";

export default function Page() {
    //Global preload
    const isLoggedIn = !!getCookie('token');
    const userDataSelector: RegisteredUserData = useSelector((state: rootStateType) => state.user.loggedInUserData);
    const courseDataSelector: coursesType = useSelector((state: rootStateType) => state.course);
    const entryTest: boolean = useSelector((state: rootStateType) => state.user.entryTest);

    //Local States
    const [activeElem, setActiveElem] = useState("user");
    const [optedCourses, setOptedCourses] = useState(userDataSelector.optedCourses === undefined ? [{}] : userDataSelector.optedCourses)

    const [opted, setOpted] = useState<string[]>([])
    const [unOpted, setUnOpted] = useState<string[]>([])


    //Variables
    const {push} = useRouter();
    const {userData}: jwtUserData = isLoggedIn ? jwtDecode(getCookie('token')!) : {}
    const prevOptedCourses = useRef(optedCourses);
    const saveOptedCourses = typeof window !== "undefined" ? document?.getElementById('saveOptedCourses') as HTMLElement : null // TODO - Fix the Console Error - ReferenceError: location is not defined
    const dispatch = useDispatch();

    const tickHandler = (e: ChangeEvent<HTMLInputElement>) => {
        const checked = (e.target as HTMLInputElement).checked;
        let id = e.target.id.split('-')[1] ? e.target.id.split('-')[1] : e.target.id
        setOptedCourses({
            ...optedCourses,
            [id]: checked,
        })
    }
    const getDefaultCourseUUIDByName = (name: string) => {
        return courseDataSelector.courses.defaultCourses.find(course => {
            return course.course === name && course.id
        })
    }

    useEffect(() => {
        if (opted) {
            setTimeout(async () => {
                for (const opt of opted) {
                    let courseUUID = getDefaultCourseUUIDByName(opt)
                    if (courseUUID) {
                        await addUserCourse({courseId: courseUUID?.id}, (userData?.id as number)).then(res => {
                            if (res.data) {
                                notifySuccess(res.message)
                                dispatch(_setUserCourses(JSON.stringify(optedCourses)))
                            } else {
                                notifyError(res.message)
                            }
                        })
                    }
                }
                if (!saveOptedCourses?.classList.contains('invisible')) {
                    saveOptedCourses?.classList.add('invisible')
                }
                prevOptedCourses.current = optedCourses
            }, 2000)
        }
    }, [opted]);

    useEffect(() => {
        if (unOpted) {
            setTimeout(async () => {
                for (const opt of unOpted) {
                    let courseUUID = getDefaultCourseUUIDByName(opt)
                    if (courseUUID) {
                        await deleteUserCourse(courseUUID?.id).then(res => {
                            if (res.status === "SUCCESS") {
                                notifySuccess(res.message)
                                dispatch(_setUserCourses(JSON.stringify(optedCourses)))
                            } else {
                                notifyError(res)
                            }
                        })
                    }
                }
                if (!saveOptedCourses?.classList.contains('invisible')) {
                    saveOptedCourses?.classList.add('invisible')
                }
                prevOptedCourses.current = optedCourses
            }, 2000)
        }
    }, [unOpted]);


    const handleSaveOptedCourses = () => {
        setOpted(Object.keys(optedCourses).filter((key: string) => {
            return (optedCourses as StringIndexable)[key] === true && key
        }))
        setUnOpted(Object.keys(optedCourses).filter((key: string) => {
            return (optedCourses as StringIndexable)[key] === false && key
        }))
    }

    // TODO()
    // useEffect(() => {
    //     let recommCoursesInputElements: StringIndexable = (document.getElementById('recomm-course-container') as HTMLElement)?.getElementsByTagName('input')
    //     let allCoursesInputElements: StringIndexable = (document.getElementById('all-course-container') as HTMLElement)?.getElementsByTagName('input')
    //
    //     for (let i = 0; i < recommCoursesInputElements?.length; i++){
    //         if(recommCoursesInputElements[i].id === (optedCourses as StringIndexable)[i]?.course){
    //             recommCoursesInputElements[i].checked = true
    //         }
    //     }
    //     for (let i = 0; i < allCoursesInputElements?.length; i++) {
    //         let id = allCoursesInputElements[i].id.split('-')[1]
    //         if(id === (optedCourses as StringIndexable)[i]?.course){
    //             allCoursesInputElements[i].checked = true
    //         }
    //     }
    // }, []);

    useEffect(() => {
        // if (!entryTest) { // If user is logged-in but has not given the entry test yet, shall be redirected to EntryTest page.
        //     push('/entrytest')
        // }

        let recommCoursesInputElements: StringIndexable = (document.getElementById('recomm-course-container') as HTMLElement)?.getElementsByTagName('input')
        let allCoursesInputElements: StringIndexable = (document.getElementById('all-course-container') as HTMLElement)?.getElementsByTagName('input')
        // let sameCourses = Object.keys(optedCourses).filter((course) => {
        //     return course.split('-')[1]
        // })
        // console.log(sameCourses)
        for (let i = 0; i < recommCoursesInputElements?.length; i++) {
            recommCoursesInputElements[i].checked = optedCourses[recommCoursesInputElements[i].id]
        }
        for (let i = 0; i < allCoursesInputElements?.length; i++) {
            let id = allCoursesInputElements[i].id.split('-')[1]
            allCoursesInputElements[i].checked = optedCourses[id]
        }


        if (typeof window !== undefined) {
            const saveOptedCourses = (document.getElementById('saveOptedCourses') as HTMLElement)
            console.log('prevOptedCourses.current', prevOptedCourses.current, optedCourses)
            if (JSON.stringify(prevOptedCourses.current) !== JSON.stringify(optedCourses)) {
                saveOptedCourses?.classList.remove('invisible')
            } else {
                saveOptedCourses?.classList.add('invisible')
            }
        }

    }, [optedCourses]);

    const handleUserClick = () => {
        setActiveElem("user")
    }

    const handleSettingsClick = () => {
        setActiveElem("settings")
    }

    const handleLogout = () => {
        dispatch(_setUser({}))
        createCookie("token", '', 0) // Delete Token Cookie
        push('/login')
    }

    return (
        <>
            {
                isLoggedIn ? (
                    <>
                        <div className="h-screen w-full bg-white relative flex overflow-hidden">
                            <Aside active={activeElem} handleUserClick={handleUserClick}
                                   handleSettingsClick={handleSettingsClick} handleLogout={handleLogout}/>
                            <div className="relative w-full h-full flex flex-col">
                                <span
                                    className="absolute left-0 top-3 z-10 text-white text-xl font-bold animate-pulse">{defaultConfig.websiteTitle}</span>
                                <header
                                    className="min-h-16 w-full flex items-center relative justify-end px-5 space-x-10 bg-custom-primary">
                                    <div className="flex flex-shrink-0 items-center space-x-4 text-white">

                                        <div className="flex flex-col items-end ">
                                            <div
                                                className="text-md font-medium">{capitalizeEachWord(userDataSelector.full_name)}</div>
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
                                    setActive={setActiveElem}
                                    clickHandler={(e) => tickHandler(e)}
                                />
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