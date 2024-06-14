"use client";
import {Suspense, useEffect, useState} from "react";
import {Formik, FormikValues} from "formik";
import {LoginSchema, LoginType} from "@/schema/LoginSchema";
import {RegisterSchema, RegisterType} from "@/schema/RegisterSchema";
import {loginUser, registerUser} from "@/controller/userController";
import Image from "next/image";
import {useRouter} from 'next/navigation';
import {notifySuccess, notifyError, createCookie, getCookie} from "@/util/Common";
import {useDispatch, useSelector} from "react-redux";
import {_setUser, _setUserCourses, _setUserEntryTest, loggedUserData} from "../../../redux/store/slices/userReducer";
import './page.css'
import {RegisteredUserData} from "@/interfaces/iRegisterUser";
import {rootStateType} from "../../../redux/store/mainStore";
import {decode} from "jsonwebtoken";
import {getAllCoursesWithoutPagination, getUserOptedCourses} from "@/controller/courseController";
import {_setDefaultCourses} from "../../../redux/store/slices/courseReducer";
import Loading from "@/app/loading";

export default function Page() {
    // States
    const [uiBool, setUiBool] = useState(true);
    const [isLoading, setIsLoading] = useState(false);
    const [currentUser, setCurrentUser] = useState<RegisteredUserData | null>(null);

    // Variables
    const {push} = useRouter();
    const dispatch = useDispatch();
    const isLoggedIn = !!(getCookie('token'))
    const userDataSelector: RegisteredUserData = useSelector((state: rootStateType) => state.user.loggedInUserData);

    const handleSignUp = () => {
        const loginContainer = (document.getElementById("loginContainer") as HTMLElement);
        const registerContainer = (document.getElementById("registerContainer") as HTMLElement);
        const rightPanel = (document.getElementById("rightPanel") as HTMLElement);
        const leftPanel = (document.getElementById("leftPanel") as HTMLElement);
        if (uiBool) {
            registerContainer.classList.add("goFullRight");

            loginContainer.classList.add("invisible");
            registerContainer.classList.remove("invisible");

            loginContainer.classList.add("goFullLeft");

            leftPanel.classList.add("goFullLeft");

            rightPanel.classList.add("invisible");
            leftPanel.classList.remove("invisible");
            setUiBool(false);
        } else {
            registerContainer.classList.remove("goFullRight");

            loginContainer.classList.remove("invisible");
            registerContainer.classList.add("invisible");

            loginContainer.classList.remove("goFullLeft");


            leftPanel.classList.remove("goFullLeft");

            rightPanel.classList.remove("invisible");
            leftPanel.classList.add("invisible");
            setUiBool(true);
        }
    }

    const getDefaultData = async () => {
        // await getUserOptedCourses(userDataSelector?.id!).then(response => {
        //     if (response?.data) {
        //         let res = response?.data?.map((elm: any) => elm?.course)
        //         dispatch(_setUserCourses({course: res}))
        //     } else {
        //         dispatch(_setUserCourses({course: []}))
        //     }
        // }).catch(error => console.error("getUserOptedCourses: ", error))
        await getAllCoursesWithoutPagination().then(response => {
            dispatch(_setDefaultCourses(response?.data))
        }).catch(error => console.log("getAllCoursesWithoutPagination error:", error))
    }

    const validateLogin = async (values: FormikValues) => {
        try {
            const {email, password} = values
            setIsLoading(true)
            await loginUser(email, password).then(async (res) => {
                if (res?.data && res?.data?.data) {
                    // Get defaults
                    await getDefaultData()
                    let tokenDecode: any = decode(res?.data?.data)
                    let date = new Date(tokenDecode?.exp * 1000)
                    delete tokenDecode?.iat
                    delete tokenDecode?.exp
                    dispatch(_setUser(tokenDecode))
                    dispatch(_setUserEntryTest(tokenDecode?.entryTest))
                    setCurrentUser(tokenDecode)
                    createCookie("token", res?.data?.data, date.getHours() * 60)
                    notifySuccess(res?.message)
                } else {
                    notifyError(res?.message)
                }
            }).finally(() => {
                setIsLoading(false)
            })
        } catch (err) {
            console.log("ValidateLogin Error: ", err)
            setIsLoading(false)
            return err
        }
    }

    const validateRegister = (values: FormikValues) => {
        const {reg_full_name, reg_email, reg_password} = values
        let first_name = reg_full_name.split(" ")[0]
        let last_name = reg_full_name.split(" ")[1]
        registerUser(first_name, last_name, reg_email, reg_password).then((res) => {
            if (res.data) {
                notifySuccess(res?.message)
            } else {
                notifyError(res?.message)
            }
        })
    }

    useEffect(() => {
        if (isLoggedIn && currentUser?.entryTest) {
            push('/dashboard')
        } else if (isLoggedIn && !currentUser?.entryTest) {
            push('entrytest')
        } else {
            push('/login')
        }
    }, [currentUser]);

    return (
        <>
            {
                isLoading && (
                    <Loading/>
                )
            }
            {
                !isLoading && !isLoggedIn && (
                    <div
                        className="relative top-24 left-[15%] w-[100%] bg-red-600 rounded-2xl shadow-xl drop-shadow-lg">
                        <Image src="/logo.png" width="65" height="65"
                               className="absolute z-[100] animate-bounce right-[32%] bottom-[-6vh]" alt="logo"/>
                        <div id="loginContainer" className="absolute flex flex-row w-4/6 h-[65vh] z-20">
                            <div id="login"
                                 className="flex flex-col bg-white w-2/4 text-center p-10 justify-center items-center">
                                <Formik validationSchema={LoginSchema}
                                        initialValues={{email: "", password: ""}}
                                        enableReinitialize={true}
                                        onSubmit={(e) => validateLogin(e)}
                                >
                                    {({
                                          values,
                                          errors,
                                          touched,
                                          handleChange,
                                          handleSubmit,
                                          handleBlur
                                      }) => (
                                        <form method="post" onSubmit={handleSubmit}
                                              className="flex flex-col text-center gap-5 justify-center items-center">
                                            <span className="text-black text-xl font-bold">Sign In</span>
                                            <input id="email" name="email"
                                                   className="bg-[#eee] border-none py-2 px-3 w-full rounded text-sm"
                                                   type="email"
                                                   onChange={handleChange}
                                                   onBlur={handleBlur}
                                                   value={values.email}
                                                   placeholder="Email"/>
                                            {
                                                touched.email && errors.email && (
                                                    <span
                                                        className="text-red-600 text-xs -mt-3 hover:underline">{errors.email}</span>
                                                )
                                            }

                                            <input id="password" name="password"
                                                   className="bg-[#eee] border-none py-2 px-3 w-full rounded text-sm"
                                                   type="password"
                                                   onChange={handleChange}
                                                   onBlur={handleBlur}
                                                   value={values.password}
                                                   placeholder="Password"/>
                                            {
                                                touched.password && errors.password && (
                                                    <span
                                                        className="text-red-600 text-xs -mt-3">{errors.password}</span>

                                                )
                                            }
                                            <a className="text-sm group transition duration-300" href="#">Forgot
                                                your
                                                password?
                                                <span
                                                    className="block max-w-0 group-hover:max-w-full transition-all duration-500 h-0.5 bg-gray-300"></span>
                                            </a>

                                            <button
                                                type="submit"
                                                className="rounded-full w-2/4 text-xs bg-custom-primary border text-white font-bold py-3 px-2 tracking-wider uppercase transition-transform duration-[80ms] ease-in active:scale-[0.95]">Login
                                            </button>
                                        </form>
                                    )}
                                </Formik>
                            </div>
                        </div>
                        <div id="registerContainer" className="absolute flex flex-row w-4/6 h-[65vh] z-10">
                            <div id="register"
                                 className="flex flex-col bg-white w-2/4 text-center p-10 justify-center items-center">
                                <Formik validationSchema={RegisterSchema}
                                        initialValues={{reg_full_name: "", reg_email: "", reg_password: ""}}
                                        enableReinitialize={true}
                                        onSubmit={(e) => validateRegister(e)}
                                >
                                    {({
                                          values,
                                          errors,
                                          touched,
                                          handleChange,
                                          handleSubmit,
                                          handleBlur
                                      }) => (
                                        <form method="post" onSubmit={handleSubmit}
                                              className="flex flex-col text-center gap-4 justify-center items-center">
                                            <span className="text-black text-xl font-bold">Sign Up</span>
                                            <input id="reg_full_name" name="reg_full_name"
                                                   className="bg-[#eee] border-none py-2 px-3 w-full rounded text-sm"
                                                   type="text"
                                                   onChange={handleChange}
                                                   onBlur={handleBlur}
                                                   value={values.reg_full_name}
                                                   placeholder="Full Name"/>
                                            {
                                                touched.reg_full_name && errors.reg_full_name && (
                                                    <span
                                                        className="text-red-600 text-xs">{errors.reg_full_name}</span>

                                                )
                                            }
                                            <input id="reg_email" name="reg_email"
                                                   className="bg-[#eee] border-none py-2 px-3 w-full rounded text-sm"
                                                   type="email"
                                                   onChange={handleChange}
                                                   onBlur={handleBlur}
                                                   value={values.reg_email}
                                                   placeholder="Email"/>
                                            {
                                                touched.reg_email && errors.reg_email && (
                                                    <span
                                                        className="text-red-600 text-xs -mt-3">{errors.reg_email}</span>

                                                )
                                            }
                                            <input id="reg_password" name="reg_password"
                                                   className="bg-[#eee] border-none py-2 px-3 w-full rounded text-sm"
                                                   type="password"
                                                   onChange={handleChange}
                                                   onBlur={handleBlur}
                                                   value={values.reg_password}
                                                   placeholder="Password"/>
                                            {
                                                touched.reg_password && errors.reg_password && (
                                                    <span
                                                        className="text-red-600 text-xs -mt-3">{errors.reg_password}</span>

                                                )
                                            }
                                            <button
                                                type="submit"
                                                className="rounded-full w-2/3 text-xs bg-custom-primary text-white font-bold py-3 px-2 tracking-wider uppercase transition-transform duration-[80ms] ease-in active:scale-[0.95]">Register
                                            </button>
                                        </form>
                                    )}
                                </Formik>
                            </div>
                        </div>
                        <div id="overlayContainer" className="absolute flex flex-row h-[65vh] w-4/6 right-0">
                            <div id="rightPanel"
                                 className="flex flex-col bg-custom-primary w-2/4 text-center z-20 p-10 justify-center items-center">
                                <div className="flex flex-col text-center gap-5 justify-center items-center">
                                    <span className="text-white text-xl font-bold">Hello, Friend!</span>
                                    <span
                                        className="text-white text-sm">Enter your personal details and start the journey with us</span>
                                    <button
                                        onClick={handleSignUp}
                                        type="button"
                                        className="cursor-pointer rounded-full w-2/3 text-xs text-white border border-solid border-white font-bold py-3 px-2 tracking-wider uppercase transition-transform duration-[80ms] ease-in active:scale-[0.95]">Register
                                        now!
                                    </button>
                                </div>
                            </div>
                            <div id="leftPanel"
                                 className="flex flex-col bg-custom-primary w-2/4 text-center z-10 p-10 justify-center items-center invisible">
                                <div className="flex flex-col text-center gap-5 justify-center items-center">
                                    <span className="text-white text-xl font-bold">Welcome Back!</span>
                                    <span
                                        className="text-white text-sm">If you already have account registered, you can login here:</span>
                                    <button
                                        onClick={handleSignUp}
                                        type="button"
                                        className="rounded-full w-2/5 text-xs text-white border border-solid border-white font-bold py-3 px-2 tracking-wider uppercase transition-transform duration-[80ms] ease-in active:scale-[0.95]">Login
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
        </>
    )
}