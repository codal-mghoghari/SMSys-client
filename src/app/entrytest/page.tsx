"use client";
import {useRouter} from 'next/navigation';
import {getCookie} from "@/util/Common";
import {useEffect, useState} from "react";
import {QuizUi} from "@/components/QuizUi";
import quizData from "../../configuration/quiz.json"
import {useDispatch, useSelector} from "react-redux";
import {_setStarted} from "../../../redux/store/slices/quizReducer";
import {StringIndexable} from "@/util/Util";
import {rootStateType} from "../../../redux/store/mainStore";

export default function Home() {
    //Global
    const quizSelector: StringIndexable = useSelector((state: rootStateType) => state.quiz.quizData);

    //Variables
    const dispatch = useDispatch();
    const {push} = useRouter();
    const isLoggedIn = !!(getCookie('token')!)

    return (
        <>
            {
                isLoggedIn ? (
                    <div className="w-full flex items-center justify-center">
                        <div className="w-11/12 rounded-lg shadow-lg mt-14">
                            <div className="relative mx-auto bg-white p-8 border border-solid drop-shadow">
                                {
                                    quizSelector.isStarted ? (<QuizUi/>) : (
                                        <div className="flex flex-col items-center justify-center gap-6">
                                            <h1 className="text-center text-black text-[50px] font-bold tracking-[0.5px]">
                                                Welcome to Quiz!
                                            </h1>
                                            <p className="text-center w-[90%]">
                                                You are going to see few questions and based on the answer, the marks
                                                will
                                                be
                                                used to
                                                give you recommendation on which course you should be opting in for
                                                betterment
                                                of
                                                yourself!
                                            </p>
                                            <button
                                                onClick={() => {
                                                    dispatch(_setStarted(true))
                                                }}
                                                className="bg-custom-primary py-[5px] px-[30px] rounded-[20px] text-center text-white transition-colors duration-300 hover:bg-gray-700">
                                                Start
                                            </button>
                                        </div>

                                    )
                                }
                            </div>
                        </div>
                    </div>
                ) : (push('/login'))
            }
        </>
    );
}
