"use client";
import {useState} from "react";
import {Formik, FormikValues} from "formik";
import {LoginSchema, LoginType} from "../../../schema/LoginSchema";
import {RegisterSchema, RegisterType} from "../../../schema/RegisterSchema";
import {loginUser, registerUser} from "../../../controller/userController";
import {Slide, toast, ToastContainer} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import Image from "next/image";
import {useRouter} from 'next/navigation';


const notifySuccess = (args: string) => toast.success(args, {
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

const notifyError = (args: string) => toast.error(args, {
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

export default function Page() {
    // States
    const [uiBool, setUiBool] = useState(true);

    // Variables
    const {push} = useRouter();
    const isLoggedIn = !!(localStorage.getItem('token')!)

    const handleSignUp = () => {
        const loginContainer = (document.getElementById("loginContainer") as HTMLElement);
        const registerContainer = (document.getElementById("registerContainer") as HTMLElement);
        if (uiBool) {
            registerContainer.classList.remove("invisible");
            loginContainer.classList.add("invisible");
            setUiBool(false);
        } else {
            registerContainer.classList.add("invisible");
            loginContainer.classList.remove("invisible");
            setUiBool(true);
        }
    }

    const validateLogin = (values: FormikValues) => {
        const {email, password} = values
        loginUser(email, password).then((res) => {
            if (res.data) {
                notifySuccess(res.message)
                if(!isLoggedIn){ // If localStorage already has token, it will not re-set it.
                    localStorage.setItem('token', res.data.token)
                }
                // createCookie("token", res.data.token, 1440)
                push('/dashboard')
            } else {
                notifyError(res.message)
            }
        })
    }

    const validateRegister = (values: FormikValues) => {
        const {reg_full_name, reg_email, reg_password} = values
        let first_name = reg_full_name.split(" ")[0]
        let last_name = reg_full_name.split(" ")[1]
        registerUser(first_name, last_name, reg_email, reg_password).then((res) => {
            if (res.data) {
                notifySuccess(res.message)
            } else {
                notifyError(res.message)
            }
        })
    }

    return (
        <>
            {
                isLoggedIn ? (push('/dashboard')) : (
                    <>
                        <ToastContainer/>
                        <div className="relative top-24 left-[15%]">
                            <Image src="/logo.png" width="65" height="65"
                                   className="absolute z-20 animate-bounce right-[32%] bottom-[-6vh]" alt="logo"/>
                            <div id="loginContainer"
                                 className="absolute flex flex-row w-4/6 shadow-xl drop-shadow-lg rounded-2xl h-[65vh]">
                                <div
                                    className="flex flex-col bg-white w-2/4 text-center p-10 justify-center items-center rounded-l-2xl">
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
                                <div
                                    className="flex flex-col bg-custom-primary w-2/4 text-center p-10 justify-center items-center rounded-r-2xl">
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
                            </div>
                            <div id="registerContainer"
                                 className="absolute flex flex-row w-4/6 shadow-xl drop-shadow-lg rounded-2xl invisible h-[65vh]">
                                <div
                                    className="flex flex-col bg-custom-primary w-2/4 text-center p-10 justify-center items-center rounded-l-2xl">
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
                                <div
                                    className="flex flex-col bg-white w-2/4 text-center p-10 justify-center items-center rounded-r-2xl">
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
                        </div>
                    </>
                )
            }
        </>
    )
}