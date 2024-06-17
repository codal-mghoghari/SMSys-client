"use client";
import React, {useEffect, useState} from "react";
import {getAllCoursesWithoutPagination, getUserOptedCourses, getUserRecommCourses} from "@/controller/courseController";
import {_setDefaultCourses, _setRecommCourses, coursesType} from "../../redux/store/slices/courseReducer";
import {RegisteredUserData} from "@/interfaces/iRegisterUser";
import {getUser} from "@/controller/userController";
import {_setUser, _setUserCourses} from "../../redux/store/slices/userReducer";
import {getCookie, getCourseById} from "@/util/Common";
import {useDispatch, useSelector} from "react-redux";
import {rootStateType} from "../../redux/store/mainStore";
import Loading from "@/app/loading";
import {revalidatePath} from "next/cache";

export default function DataProvider({children}: { children: React.ReactNode }) {
    // Global
    const userDataSelector: RegisteredUserData = useSelector((state: rootStateType) => state.user.loggedInUserData);
    const courseDataSelector: coursesType = useSelector((state: rootStateType) => state.course);

    // States
    const [isClient, setIsClient] = useState(false)
    const [isLoadingData, setIsLoadingData] = useState(true)

    // Variables
    const isLoggedIn = !!getCookie('token');
    const dispatch = useDispatch();

    useEffect(() => {
        if (typeof window !== 'undefined') {
            setIsClient(true)
        }
    }, [])

    const getDefaultData = async () => {
        await getAllCoursesWithoutPagination().then(response => {
            dispatch(_setDefaultCourses(response?.data))
        }).catch(error => console.log("getAllCoursesWithoutPagination error:", error))
    }

    const getUserDefaultData = async () => {
        let returnData: RegisteredUserData = {}
        await getUser(userDataSelector?.id).then(res => {
            if (res?.data) {
                dispatch(_setUser(res?.data))
                returnData = res?.data
            }
        }).catch(error => console.error("getUser: ", error))

        const userCoursesObj: { recommCourses: string[], optedCourses: string[] } = {
            recommCourses: [],
            optedCourses: []
        }

        await getUserRecommCourses(userDataSelector?.id).then(response => {
            if (response?.data) {
                if (response?.totalLength > 0) {
                    response?.data.forEach((item: { courseId: string }) => {
                        let courseData = getCourseById(courseDataSelector.courses.defaultCourses, item.courseId)
                        if (courseData) {
                            userCoursesObj.recommCourses.push(courseData?.course_name)
                        }
                    })
                } else {
                    let course = getCourseById(courseDataSelector.courses.defaultCourses, response?.data.id)
                    userCoursesObj.recommCourses.push(course?.course_name)
                }
            }
        }).finally(() => {
            dispatch(_setRecommCourses(userCoursesObj.recommCourses))
        }).catch(error => console.error("getUserRecommCourses: ", error))

        await getUserOptedCourses(userDataSelector?.id).then(response => {
            if (response?.data) {
                if (response?.totalLength > 0) {
                    response?.data.forEach((item: { courseId: string }) => {
                        let courseData = getCourseById(courseDataSelector.courses.defaultCourses, item.courseId)
                        if (courseData) {
                            userCoursesObj.optedCourses.push(courseData?.course_name)
                        }
                    })
                } else {
                    let course = getCourseById(courseDataSelector.courses.defaultCourses, response?.data.id)
                    userCoursesObj.optedCourses.push(course?.course_name)
                }
            }
        }).finally(() => {
            dispatch(_setUserCourses(userCoursesObj.optedCourses))
        }).catch(error => console.error("getUserOptedCourses: ", error))

        return returnData
    }


    useEffect(() => {
        try {
            if (isLoggedIn && isClient) {
                getDefaultData().then(() => {
                    console.log("Successfully fetched default data!")
                })
                getUserDefaultData().then(() => {
                    console.log("Successfully fetched user default data!")
                })
            }
        } catch (err) {
            console.log("Error in fetching data:", err)
        } finally {
            setIsLoadingData(false)
        }
    }, [isLoggedIn, isClient]);


    if (isLoadingData) {
        return <Loading/>
    } else if (!isLoadingData) {
        return (
            <>
                {children}
            </>
        )
    }

};