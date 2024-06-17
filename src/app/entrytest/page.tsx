"use client";
import {useRouter} from 'next/navigation';
import {getCookie} from "@/util/Common";
import {useEffect, useState} from "react";
import {QuizUi} from "@/components/QuizUi";
import {useDispatch, useSelector} from "react-redux";
import {_setStarted} from "../../../redux/store/slices/quizReducer";
import {StringIndexable} from "@/util/Util";
import {rootStateType} from "../../../redux/store/mainStore";
import {getAllPaginatedQuestions, getAllOptions} from "@/controller/quizController";
import {
    iQuizData,
    QuizDataType, QuizEachOptionsType,
    QuizEachQuestionType,
    QuizOptionsType,
    QuizQuestionsType
} from "@/interfaces/iQuizData";
import Loading from "@/app/loading";
import {coursesType} from "../../../redux/store/slices/courseReducer";
import {RegisteredUserData} from "@/interfaces/iRegisterUser";

export default function Home() {
    //Global
    const isLoggedIn = !!getCookie('token');
    const quizSelector: StringIndexable = useSelector((state: rootStateType) => state.quiz.quizData);
    const userDataSelector: RegisteredUserData = useSelector((state: rootStateType) => state.user.loggedInUserData);
    const courseDataSelector: coursesType = useSelector((state: rootStateType) => state.course);

    //Variables
    const dispatch = useDispatch();
    const {push} = useRouter();

    //States
    const [quizData, setQuizData] = useState<QuizDataType>([])
    const [isLoading, setIsLoading] = useState<boolean>(false)

    const fetchQuestionOptions = async () => {
        try {
            const questionsData: QuizQuestionsType = await getAllPaginatedQuestions("id,question,question_type").then((res) => {
                return res?.data
            }).catch((err) => {
                console.log("getAllPaginatedQuestions Error: ", err)
                throw err;
            })
            const answersData: QuizOptionsType = await getAllOptions("id,question_id,question_type,isCorrect,option_description").then((res) => {
                return res?.data
            }).catch((err) => {
                console.log("getAllOptions Error: ", err)
                throw err;
            })
            return {questionsData: questionsData, answersData: answersData}
        } catch (err) {
            console.log("Error while fetching Quiz Data", err)
        }
    }

    useEffect(() => {
        if (userDataSelector.entryTest) {
            push('/dashboard')
        } else {
            setIsLoading(true)
            fetchQuestionOptions().then((res) => {
                let finalData: any = []
                res?.questionsData?.map((question: QuizEachQuestionType) => {
                    let ansData: any = []
                    res?.answersData?.map((answer: QuizEachOptionsType) => {
                        if (answer?.question_id === question?.id) {
                            ansData.push({
                                ...answer
                            })
                        }
                    })
                    if (ansData.length > 0) {
                        finalData.push({
                            ...question,
                            Answers: ansData
                        })
                    }
                })
                setQuizData(finalData)
                setIsLoading(false)
            })
        }
    }, []);


    return (
        <>
            {
                isLoading ? (
                    <Loading/>
                ) : (
                    <div className="w-full flex items-center justify-center">
                        <div className="w-11/12 rounded-lg shadow-lg mt-14">
                            <div className="relative mx-auto bg-white p-8 border border-solid drop-shadow">
                                {
                                    quizSelector?.isStarted ? (
                                        <QuizUi quizData={quizData} setQuizData={setQuizData}/>
                                    ) : (
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
                )
            }
        </>
    );
}
