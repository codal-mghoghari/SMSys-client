"use client"

import {ToggleBtn} from "@/components/ToggleBtn";
import React, {ChangeEvent, Dispatch, MouseEvent, SetStateAction, useEffect, useState} from "react";
import {RegisteredUserData} from "@/interfaces/iRegisterUser";
import {getKeysWithValueTrue, StringIndexable} from "@/util/Util";
import quizJsonData from "@/configuration/quiz.json"
import "@/app/dashboard/page.css"
import {AllCourses} from "@/components/courses/AllCourses";
import {useSelector} from "react-redux";
import {rootStateType} from "../../redux/store/mainStore";
import {coursesType} from "../../redux/store/slices/courseReducer";

export const DashboardContent = (props: {
    userData: RegisteredUserData,
    active: string,
    setActive: Dispatch<SetStateAction<string>>,
    clickHandler: (e: ChangeEvent<HTMLInputElement>) => void
}) => {
    //States
    const [toggleBtn, setToggleBtn] = useState("account")
    const coursesSelector: coursesType = useSelector((state: rootStateType) => state.course)

    //Variables
    let newPassword = document.getElementById("new-password") as HTMLInputElement
    const quizCats = quizJsonData[0].categories // getting all the question types

    const handleTabChange = (e: MouseEvent<HTMLLIElement>) => {
        const name = (e.target as HTMLLIElement).id
        if (name === "account") {
            setToggleBtn(name)
        } else {
            setToggleBtn(name)
        }
    }

    const optedCourses = props?.userData?.optedCourses
    const optedUserCourses = optedCourses?.course

    return (
        <>
            {props.active === "user" && (
                <>
                    <AllCourses title="Recommended Courses" allQuizData={quizJsonData} courses={coursesSelector}
                                btnHandler={props.clickHandler}/>
                    <AllCourses title="All Courses" allQuizData={quizJsonData} courses={coursesSelector}
                                btnHandler={props.clickHandler}
                    />
                </>

            )}
            {props.active === "settings" && (
                <>
                    <main className="absolute top-0 left-5 w-full">
                        <div className="mx-4 min-h-screen max-w-screen-xl sm:mx-8 xl:mx-auto">
                            <h1 className="border-b py-6 text-4xl mt-14 font-semibold">Settings</h1>
                            <div className="grid grid-cols-8 pt-3 sm:grid-cols-10">
                                <div className="relative my-4 w-56 sm:hidden">
                                    <input className="peer hidden" type="checkbox" name="select-1" id="select-1"/>
                                    <label htmlFor="select-1"
                                           className="flex w-full cursor-pointer select-none rounded-lg border p-2 px-3 text-sm text-gray-700 ring-blue-700 peer-checked:ring">Account </label>
                                    <svg xmlns="http://www.w3.org/2000/svg"
                                         className="pointer-events-none absolute right-0 top-3 ml-auto mr-5 h-4 text-slate-700 transition peer-checked:rotate-180"
                                         fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7"/>
                                    </svg>
                                    <ul className="max-h-0 select-none flex-col overflow-hidden rounded-b-lg shadow-md transition-all duration-300 peer-checked:max-h-56 peer-checked:py-3">
                                        <li className="cursor-pointer px-3 py-2 text-sm text-slate-600 hover:bg-blue-700 hover:text-white">Account</li>
                                        <li className="cursor-pointer px-3 py-2 text-sm text-slate-600 hover:bg-blue-700 hover:text-white">Team</li>
                                        <li className="cursor-pointer px-3 py-2 text-sm text-slate-600 hover:bg-blue-700 hover:text-white">Others</li>
                                    </ul>
                                </div>

                                <div className="col-span-2 hidden sm:block">
                                    <ul>
                                        <li
                                            id="account"
                                            onClick={(e) => {
                                                handleTabChange(e)
                                                document.getElementById('profile')!.classList.remove("border-l-custom-border-primary")
                                                document.getElementById('account')!.classList.add("border-l-custom-border-primary")
                                            }}
                                            className="mt-5 cursor-pointer border-l-2 border-transparent border-l-custom-border-primary px-2 py-2 font-semibold text-custom-primary transition hover:border-l-custom-border-primary hover:text-black">Account
                                        </li>
                                        <li
                                            id="profile"
                                            onClick={(e) => {
                                                handleTabChange(e)
                                                document.getElementById('profile')!.classList.add("border-l-custom-border-primary")
                                                document.getElementById('account')!.classList.remove("border-l-custom-border-primary")
                                            }}
                                            className="mt-5 cursor-pointer border-l-2 border-transparent text-custom-primary px-2 py-2 font-semibold transition hover:border-l-custom-border-primary hover:text-black">Profile
                                        </li>
                                        <li className="mt-5 border-l-2 border-transparent px-2 py-2 font-normal">More
                                            Coming
                                            soon..
                                        </li>
                                    </ul>
                                </div>

                                {
                                    toggleBtn === "account" ? (
                                        <div id="account"
                                             className="col-span-8 h-[28rem] overflow-y-auto rounded-xl sm:bg-gray-50 sm:px-8 sm:shadow">
                                            <div className="pt-4">
                                                <h1 className="py-2 text-2xl font-semibold">Account Settings</h1>
                                            </div>
                                            <hr className="mt-4 mb-8"/>
                                            <p className="py-2 text-xl font-semibold">Email Address</p>
                                            <div
                                                className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                                                <p className="text-gray-600">Your email address
                                                    is <strong>{props.userData.email}</strong></p>
                                                <button
                                                    className="inline-flex text-sm font-semibold text-gray-500 underline decoration-2">Change
                                                </button>
                                            </div>
                                            <hr className="mt-4 mb-8"/>
                                            <p className="py-2 text-xl font-semibold">Password</p>
                                            <div className="flex items-center">
                                                <div
                                                    className="flex flex-col space-y-2 sm:flex-row sm:space-y-0 sm:space-x-3">
                                                    <label htmlFor="cur-password">
                                                        <span className="text-sm text-gray-500">Current Password</span>
                                                        <div
                                                            className="relative flex overflow-hidden rounded-md border-2 transition focus-within:border-blue-600">
                                                            <input type="password" id="cur-password"
                                                                   className="w-full flex-shrink appearance-none border-gray-300 bg-white py-2 px-4 text-base text-gray-700 placeholder-gray-400 focus:outline-none"
                                                                   placeholder="Current Password"/>
                                                        </div>
                                                    </label>
                                                    <label htmlFor="new-password">
                                                        <span className="text-sm text-gray-500">New Password</span>
                                                        <div
                                                            className="relative flex overflow-hidden rounded-md border-2 transition focus-within:border-blue-600">
                                                            <input type="password" id="new-password"
                                                                   className="w-full flex-shrink appearance-none border-gray-300 bg-white py-2 px-4 text-base text-gray-700 placeholder-gray-400 focus:outline-none"
                                                                   placeholder="New Password"/>
                                                        </div>
                                                    </label>
                                                </div>
                                                <svg xmlns="http://www.w3.org/2000/svg"
                                                     onClick={() => {
                                                         if (newPassword.type === "password") {
                                                             newPassword.type = "text"
                                                         } else {
                                                             newPassword.type = "password"
                                                         }
                                                     }}
                                                     className="mt-5 ml-2 h-6 w-6 cursor-pointer text-sm font-semibold text-gray-600 underline decoration-2"
                                                     fill="none" viewBox="0 0 24 24" stroke="currentColor"
                                                     strokeWidth="2">
                                                    <path strokeLinecap="round" strokeLinejoin="round"
                                                          d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"/>
                                                </svg>
                                            </div>
                                            {/* eslint-disable-next-line react/no-unescaped-entities */}
                                            <p className="mt-3 text-sm">Can't remember your current password?
                                                <button
                                                    type="button"
                                                    className="text-sm ml-1 font-semibold text-rose-500 hover:underline">Recover
                                                    Account</button></p>
                                            <button
                                                className="mt-4 rounded-lg bg-custom-primary px-4 py-2 text-white transition-transform duration-[80ms] ease-in active:scale-[0.95]">Save
                                                Password
                                            </button>
                                            <hr className="mt-7 mb-6"/>

                                            <div className="mb-10">
                                                <p className="py-2 text-xl font-semibold">Delete Account</p>
                                                <p className="inline-flex items-center rounded-full bg-rose-100 px-4 py-1 text-rose-600">
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="mr-2 h-5 w-5"
                                                         viewBox="0 0 20 20" fill="currentColor">
                                                        <path fillRule="evenodd"
                                                              d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                                                              clipRule="evenodd"/>
                                                    </svg>
                                                    Proceed with caution!
                                                </p>
                                                <p className="mt-2">Make sure you have taken backup of your account in
                                                    case
                                                    you ever
                                                    need to get access to your data. We will completely wipe your data.
                                                    There is no
                                                    way to access your account after this action.</p>
                                                <button
                                                    type="button"
                                                    className="ml-auto text-sm font-semibold text-rose-600 underline decoration-2 transition-transform duration-[80ms] ease-in active:scale-[0.95]">Continue
                                                    with deletion
                                                </button>
                                            </div>
                                        </div>

                                    ) : (
                                        <div id="profile-settings"
                                             className="relative right-0 col-span-8 h-[20rem] overflow-x-hidden overflow-y-auto rounded-xl sm:bg-gray-50 sm:px-8 sm:shadow">
                                            <div
                                                className="absolute transform rotate-45 bg-gray-600 text-center text-white font-semibold py-1 right-[-40px] top-10 w-[190px]">
                                                {props.userData?.user_role === 1 ? ("Student") : ("Admin")}
                                            </div>
                                            <div className="pt-4">
                                                <h1 className="py-2 text-2xl font-semibold">Profile Settings</h1>
                                            </div>
                                            <hr className="mt-4 mb-8"/>
                                            <div className="flex flex-row gap-20">
                                                <img
                                                    className="object-cover w-40 h-40 p-1 rounded-full ring-2 ring-gray-300"
                                                    src="https://dummyjson.com/image/300"
                                                    alt="Bordered avatar"/>
                                                <div className="flex flex-col gap-3">
                                                    <div className="w-56">
                                                        <label htmlFor="first_name"
                                                               className="block mb-2 text-sm font-medium text-custom-primary">
                                                            First Name</label>
                                                        <input type="text" id="first_name"
                                                               className="bg-gray-50 border border-gray-300 text-black text-sm rounded-lg focus:ring-gray-500 focus:border-gray-500 block w-full p-2.5 "
                                                               placeholder="Your first name"
                                                               defaultValue={props.userData.first_name!}/>
                                                    </div>
                                                    <div className="w-56">
                                                        <label htmlFor="last_name"
                                                               className="block mb-2 text-sm font-medium text-custom-primary">
                                                            Last Name</label>
                                                        <input type="text" id="last_name"
                                                               className="bg-gray-50 border border-gray-300 text-black text-sm rounded-lg focus:ring-gray-500 focus:border-gray-500 block w-full p-2.5 "
                                                               placeholder="Your first name"
                                                               defaultValue={props.userData.last_name!}/>
                                                    </div>
                                                </div>
                                                <div className="flex flex-col gap-6">
                                                    {/*<div className="w-44">*/}
                                                    {/*    <label htmlFor="date_of_birth"*/}
                                                    {/*           className="block mb-2 text-sm font-medium text-custom-primary">*/}
                                                    {/*        Date Of Birth</label>*/}
                                                    {/*    <input type="text" id="date_of_birth"*/}
                                                    {/*           className="bg-gray-50 border border-gray-300 text-black text-sm rounded-lg focus:ring-gray-500 focus:border-gray-500 block w-full p-2.5 "*/}
                                                    {/*           placeholder="DOB"*/}
                                                    {/*           defaultValue={props.userData.date_of_birth!}/>*/}
                                                    {/*</div>*/}
                                                    <div className="w-44">
                                                        <label htmlFor="optedCourses"
                                                               className="block mb-2 text-sm font-medium text-custom-primary">
                                                            Opted Courses</label>
                                                        <div id='optedCourses' className="flex gap-2">
                                                            {optedUserCourses?.map((optedCourse: string, key: React.Key) => {
                                                                return (<span
                                                                        key={key}
                                                                        className="text-sm font-medium bg-gray-200 py-1 px-2 rounded text-gray-500 align-middle">{optedCourse.toString()}</span>
                                                                )
                                                            })}
                                                        </div>


                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                }
                            </div>
                        </div>
                    </main>
                </>
            )}
        </>
    );
};