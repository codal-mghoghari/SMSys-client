"use client";

import {useRouter} from "next/navigation";
import {jwtUserData, RegisteredUserData} from "@/interfaces/iRegisterUser";
import {jwtDecode} from "jwt-decode";
import {capitalizeEachWord, createCookie, getCookie} from "@/util/Common";
import {Aside} from "@/components/Aside";
import {DashboardContent} from "@/components/DashboardContent";
import {ChangeEvent, MouseEventHandler, useEffect, useRef, useState} from "react";
import {
    addUserCourse,
    deleteUserCourse,
    getAllCoursesWithoutPagination,
    getUserOptedCourses
} from "@/controller/courseController";
import {notifySuccess, notifyError} from "@/util/Common";
import {useDispatch, useSelector} from "react-redux";
import {rootStateType} from "../../../redux/store/mainStore";
import {_setUser, _setUserCourses, _setUserEntryTest} from "../../../redux/store/slices/userReducer";
import defaultConfig from "../../configuration/defaultConfig.json"
import "./page.css"
import {StringIndexable} from "@/util/Util";
import {_setDefaultCourses, coursesType} from "../../../redux/store/slices/courseReducer";
import Image from "next/image";

export default function Page() {
    //Global preload
    const isLoggedIn = !!getCookie('token');
    const userDataSelector: RegisteredUserData = useSelector((state: rootStateType) => state.user.loggedInUserData);
    const courseDataSelector: coursesType = useSelector((state: rootStateType) => state.course);
    const entryTest: boolean = useSelector((state: rootStateType) => state.user.entryTest);

    //Local States
    const [activeElem, setActiveElem] = useState("user");
    const [optedCourses, setOptedCourses] = useState({
        course: userDataSelector?.optedCourses?.course ? userDataSelector?.optedCourses?.course : []
    });
    const [saveDisable, setSaveDisable] = useState<boolean>(false);
    const [opted, setOpted] = useState<Array<string>>([])
    const [unOpted, setUnOpted] = useState<Array<string>>([])

    //Variables
    const {push} = useRouter();
    const userData: jwtUserData = isLoggedIn ? jwtDecode(getCookie('token')!) : {}
    const [prevOptedCourses, setPrevOptedCourses] = useState(optedCourses);
    const saveOptedCourses = typeof window !== "undefined" ? document?.getElementById('saveOptedCourses') as HTMLElement : null // TODO - Fix the Console Error - ReferenceError: location is not defined
    const dispatch = useDispatch();


    const tickHandler = (e: ChangeEvent<HTMLInputElement>) => {
        const checked = (e.target as HTMLInputElement).checked;
        let id = e.target.id.split('-')[1] ? e.target.id.split('-')[1] : e.target.id
        if (checked) {
            let tempArr = [...optedCourses?.course]
            tempArr?.push(id)
            setOpted(tempArr)
            setOptedCourses(prevState => {
                // prevOptedCourses.current = prevState
                return {
                    ...optedCourses,
                    course: tempArr,
                }
            })
        } else {
            let tempArr = [...optedCourses?.course]
            tempArr?.splice(tempArr?.indexOf(id), 1)
            let delArr = []
            delArr.push(id)
            setUnOpted(delArr)
            setOptedCourses(prevState => {
                // prevOptedCourses.current = prevState
                return {
                    ...optedCourses,
                    course: tempArr,
                }
            })

        }
    }

    const getDefaultCourseUUIDByName = (name: string) => {
        return courseDataSelector?.courses?.defaultCourses?.find(course => {
            return course.course_name?.toLowerCase() === name.toLowerCase() && course.id
        })
    }

    const optCourse = async () => {
        try {
            if (opted) {
                setSaveDisable(true)
                console.log('Opted')
                for (const opt of opted) {
                    let optedCourseUUID = getDefaultCourseUUIDByName(opt)
                    if (optedCourseUUID) {
                        await addUserCourse(userData?.id, optedCourseUUID?.id).then(res => {
                            if (res?.data) {
                                notifySuccess(res?.message)
                                dispatch(_setUserCourses(optedCourses))
                                setOpted([])
                                setPrevOptedCourses(optedCourses)
                            } else {
                                notifyError(res?.message)
                            }
                        }).finally(() => {
                            if (!saveOptedCourses?.classList.contains('invisible')) {
                                saveOptedCourses?.classList.add('invisible')
                            }
                            setSaveDisable(false)
                        })
                    }
                }

            }
        } catch (err) {
            console.error("Opted Course Error: ", err)
        }
    }

    const unOptCourse = async () => {
        try {
            if (unOpted) {
                setSaveDisable(true)
                console.log("unOpted")
                for (const opt of unOpted) {
                    let unOptedCourseUUID = getDefaultCourseUUIDByName(opt)
                    if (unOptedCourseUUID) {
                        await deleteUserCourse(unOptedCourseUUID?.id).then(res => {
                            if (res?.data) {
                                notifySuccess(res?.message)
                                dispatch(_setUserCourses(optedCourses))
                            } else {
                                notifyError(res?.message)
                            }
                        }).finally(() => {
                            if (!saveOptedCourses?.classList.contains('invisible')) {
                                saveOptedCourses?.classList.add('invisible')
                            }
                            setSaveDisable(false)
                        })
                    }
                }
                setUnOpted([])
                setPrevOptedCourses(optedCourses)
            }
        } catch (err) {
            console.error("Opted Course Error:", err)
        }
    }


    const handleSaveOptedCourses = async () => {
        if (unOpted.length > 0) {
            await unOptCourse()
        }
        if (opted.length > 0) {
            await optCourse()
        }
    }

    useEffect(() => {
        if (!entryTest) { // If user is logged-in but has not given the entry test yet, shall be redirected to EntryTest page.
            push('/entrytest')
        }
        if (typeof window !== undefined) {
            let recommCoursesInputElements = (document.getElementById('recomm-course-container') as HTMLElement)?.getElementsByTagName('input')
            let allCoursesInputElements = (document.getElementById('all-course-container') as HTMLElement)?.getElementsByTagName('input')

            if (recommCoursesInputElements && recommCoursesInputElements.length > 0) {
                Array.from((recommCoursesInputElements)).map(elem => {
                    let index = optedCourses?.course?.indexOf(elem.id)
                    if (index !== -1) {
                        elem.checked = optedCourses.course && elem.id === (optedCourses as StringIndexable)?.course[index];
                    } else {
                        elem.checked = false
                    }
                })
            }

            if (allCoursesInputElements && allCoursesInputElements.length > 0) {
                Array.from((allCoursesInputElements)).map(elem => {
                    let id = elem.id.split('-')[1]
                    let index = optedCourses?.course?.indexOf(id)
                    if (index !== -1) {
                        elem.checked = optedCourses.course && id === (optedCourses as StringIndexable)?.course[index];
                    } else {
                        elem.checked = false
                    }
                })
            }


            const saveOptedCourses = (document.getElementById('saveOptedCourses') as HTMLElement)
            if (JSON.stringify(prevOptedCourses) !== JSON.stringify(optedCourses)) {
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
                isLoggedIn && (
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
                                                className="text-md font-medium">{capitalizeEachWord(`${userDataSelector.first_name} ${userDataSelector.last_name}`)}</div>
                                            <div
                                                className="text-sm font-regular">{userDataSelector.user_role === 0 ? 'Admin' : 'Student'}</div>
                                        </div>

                                        <div
                                            className="h-10 w-10 z-20 rounded-full cursor-pointer bg-gray-200 border-2 border-gray-500">
                                            <Image src="/avatar.png" height="50" width="50" alt="pfp"
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
                                            disabled={saveDisable}
                                            onClick={handleSaveOptedCourses}
                                            className="text-white bg-gray-800 hover:bg-gray-900 transition-transform duration-[80ms] ease-in active:scale-[0.95] focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-full text-sm px-10 py-2.5 me-2 mb-2 mr-10">Save
                                        Changes
                                    </button>
                                </div>
                            </div>
                        </div>
                    </>
                )
            }
        </>
    )
}