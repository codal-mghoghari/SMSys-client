"use client";

import defaultConfig from '../configuration/defaultConfig.json'
import {paginate, StringIndexable} from "@/util/Util";
import React, {ChangeEvent, useEffect, useState} from "react";
import Image from "next/image";
import {useDispatch, useSelector} from "react-redux";
import {
    _resetQuizQuestions,
    _updateQuizData,
    _setUnAnsweredQuestions,
    _removeUnAnsweredQuestions, _resetUnAnsweredQuestions
} from "../../redux/store/slices/quizReducer";
import {rootStateType} from "../../redux/store/mainStore";
import {getCourseByName, notifyError, notifySuccess} from "@/util/Common";
import SubmitDialog from "@/components/SubmitDialog";
import {RegisteredUserData} from "@/interfaces/iRegisterUser";
import {useRouter} from "next/navigation";
import genRecommendedCourses from "@/util/genRecommendedCourses";
import {
    _setRecommCourses,
    coursesType,
    DefaultCourseObj,
} from "../../redux/store/slices/courseReducer";
import {
    iQuizData,
    QuizDataType,
} from "@/interfaces/iQuizData";
import {updateUser} from "@/controller/userController";
import {_setUserEntryTest} from "../../redux/store/slices/userReducer";
import {addUserRecommCourse} from "@/controller/courseController";


export const QuizUi = (props: {
    quizData: QuizDataType
    setQuizData: any
}) => {
    //Redux
    const userDataSelector: RegisteredUserData = useSelector((state: rootStateType) => state.user.loggedInUserData);
    const courseDataSelector: coursesType = useSelector((state: rootStateType) => state.course);

    //Global
    const answeredSelector: StringIndexable = useSelector((state: rootStateType) => state.quiz.quizData.answeredQuestions);
    const unAnsweredSelector: StringIndexable = useSelector((state: rootStateType) => state.quiz.quizData.unAnsweredQuestions);


    //States
    const [pageSize, setPageSize] = useState<number>(1);
    const [pageNumber, setPageNumber] = useState<number>(1);
    const [unAnsweredPlaceholderText, setUnAnsweredPlaceholderText] = useState<string>("");
    const [dialogBool, setDialogBool] = useState({bool: false, elem: ""})
    const [recommCourses, setRecommCourses] = useState<string[]>([])

    //Variables
    const quizData = props.quizData
    const {push} = useRouter();
    const dispatch = useDispatch();

    const Questions = props?.quizData?.map((quiz) => {
        return quiz?.question
    })

    const ansOptions = (questionType: string | undefined) => props.quizData?.map((quiz: any) => {
        return quiz.Answers?.filter((answer: { question_id: string; }) => {
            if (quiz.id === answer.question_id && questionType && questionType === quiz.question_type) {
                return quiz.Answers
            }
            return null
        })
    })

    const answeredQuestionsLen = Object.keys(answeredSelector)?.length
    const unAnsweredQuestionsLen = Object.keys(unAnsweredSelector)?.length
    const totalQuestionsLen = Questions?.length

    const handlePrevious = () => {
        const options = (document.getElementsByName('option') as NodeListOf<HTMLInputElement>)
        let val = []
        options.forEach((option: HTMLInputElement) => {
            if (!option.checked) {
                return val.push(option)
            }
        })
        if (val.length === options.length) {
            dispatch(_setUnAnsweredQuestions({
                ...unAnsweredSelector,
                [`q${pageNumber}`]: pageNumber
            }))
        }
        if (Questions.length >= pageNumber && pageNumber > 1) {
            setPageNumber(prevState => prevState - 1)
        }

    }

    const handleNext = () => {
        const options = (document.getElementsByName('option') as NodeListOf<HTMLInputElement>)
        let val: HTMLInputElement[] = []
        options.forEach((option: HTMLInputElement) => {
            if (!option.checked) {
                return val.push(option)
            }
        })
        if (val.length === options.length) {
            dispatch(_setUnAnsweredQuestions({
                ...unAnsweredSelector,
                [`q${pageNumber}`]: pageNumber
            }))
        }
        if (Questions.length !== pageNumber) {
            setPageNumber(prevState => prevState + 1)
        }
    }

    const handleDirectNavFromButtons = () => {
        const options = (document.getElementsByName('option') as NodeListOf<HTMLInputElement>)
        let val = []
        options.forEach((option: HTMLInputElement) => {
            if (!option.checked) {
                return val.push(option)
            }
        })
        if (val.length === options.length) {
            dispatch(_setUnAnsweredQuestions({
                ...unAnsweredSelector,
                [`q${pageNumber}`]: pageNumber
            }))
        }
    }

    const handleSelect = (e: ChangeEvent<HTMLInputElement>) => {
        const selectedOpt = e.target.value
        const selectedOptName = e.target.id
        dispatch(_updateQuizData({
            ...answeredSelector,
            [selectedOptName]: selectedOpt
        }))
        if (unAnsweredSelector[`q${pageNumber}`]) {
            dispatch(_removeUnAnsweredQuestions(`q${pageNumber}`))
        }
    }

    const handleSubmit = () => {
        if (answeredQuestionsLen === 0) {
            setUnAnsweredPlaceholderText(totalQuestionsLen.toString())
        } else {
            let leftToAttempt = totalQuestionsLen - answeredQuestionsLen
            setUnAnsweredPlaceholderText(leftToAttempt.toString())
        }
        setDialogBool({bool: true, elem: ""})
    }

    const handleOnConfirmSubmit = () => {
        setDialogBool({bool: true, elem: "confirm"})
        setTimeout(() => {
            setDialogBool({bool: false, elem: ""})
        }, 2000)
    }

    const handleOnCancelSubmit = () => {
        setDialogBool({bool: false, elem: "confirm"})
    }

    const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        await updateUser(true, userDataSelector?.id!).then(async res => {
            if (res?.data) {
                await genRecommendedCourses({
                    answeredSelector, unAnsweredSelector, quizData
                })
                    .then((result) => {
                        console.log("genRecommendedCourses: ", result)
                        if (result?.length > 0) {
                            setRecommCourses(result)
                            dispatch(_setRecommCourses(result))
                        }
                    })
                    .catch((err) => console.log(err))
                    .finally(() => {
                        dispatch(_setUserEntryTest(true))
                    })
                notifySuccess(res?.message)
            } else {
                notifyError(res?.message)
            }
        }).catch((err) => {
            console.error("Quiz Form Submit:", err)
        }).finally(() => {
            push('/dashboard')
        })
    }

    const addRecommCourses = async (course: DefaultCourseObj) => {
        await addUserRecommCourse(course?.id?.toString(), userDataSelector?.id!).then((res) => {
            if (!res?.data && !res?.data?.data) {
                notifyError(res?.message)
            }
        }).catch((err) => {
            console.log("addUserRecommCourse error: ", err)
        })
    }

    useEffect(() => {
        const defCourses = courseDataSelector?.courses?.defaultCourses

        if (recommCourses.length > 0) {
            recommCourses?.forEach((recommendedCourse) => {
                let courseObj = getCourseByName(defCourses, recommendedCourse.toString())
                if (Object.keys(courseObj).length > 0) {
                    addRecommCourses(courseObj)
                }
            })
        }
    }, [recommCourses]);

    return (
        <>
            <div className="flex flex-row items-center justify-end text-center w-full flex-wrap overflow-hidden">
                <div className="flex gap-2 w-80 flex-wrap">
                    {
                        Questions?.map((question, index: number) => {
                            return (
                                <div onClick={() => {
                                    setPageNumber(index + 1)
                                    handleDirectNavFromButtons()
                                }}
                                     key={index}
                                     className={`${unAnsweredSelector[`q${index + 1}`] === index + 1 ? 'bg-rose-200' : 'bg-gray-100'} w-6 h-6 hover:cursor-pointer transition duration-300 ease-in hover:border hover:border-black`}>
                                    {index + 1}
                                </div>
                            )
                        })
                    }
                </div>

            </div>
            <h1 className="text-3xl font-bold mb-6
                   text-custom-primary text-center">
                {defaultConfig?.websiteTitle}
            </h1>
            <form onSubmit={(e) => handleFormSubmit(e)} id="quizForm" className="space-y-4">
                {
                    dialogBool.bool && (
                        <SubmitDialog title={"Submit"}
                                      message={`Are you sure, you want to submit? \nUnanswered Questions: ${unAnsweredPlaceholderText}`}
                                      button={"Confirm"} onConfirm={handleOnConfirmSubmit} onCancel={handleOnCancelSubmit}
                                      loader={dialogBool}/>
                    )
                }
                <div className="flex flex-col mb-4">
                    {
                        paginate(props?.quizData, pageSize, pageNumber)?.map((question: iQuizData, index: number) => {
                            return (
                                <div key={index}>
                                    <div className="flex flex-row items-center justify-center">
                                        <h3 className="text-2xl font-bold mb-6 text-center">
                                            Question {pageNumber}
                                        </h3>
                                    </div>
                                    {
                                        <Image className="absolute left-5 top-5" width="100"
                                               height="100"
                                               src={`/${question.question_type?.toLowerCase()}.png`} alt="Image"/>
                                    }
                                    <label className="text-lg text-gray-800 mb-2">
                                        {question?.question}
                                    </label>
                                    {
                                        ansOptions(question?.question_type)[pageNumber - 1]?.map((
                                            option: any, ansIndex: number) => {
                                            return (
                                                <div key={ansIndex}
                                                     className="flex items-center space-x-4">
                                                    <input id={question.id?.toString()}
                                                           name="option" type="radio"
                                                           value={option?.option_description?.toString()}
                                                           checked={
                                                               answeredSelector[`${question?.id}`] === option?.option_description?.toString()
                                                           }
                                                           onChange={e => handleSelect(e)}
                                                           className="w-4 h-4 text-blue-600 bg-custom-primary border-gray-800 focus:outline-0"
                                                    />
                                                    <label className="text-black">
                                                        {option?.option_description?.toString()}
                                                    </label>
                                                </div>
                                            )
                                        })
                                    }
                                </div>
                            )
                        })
                    }
                </div>

                <hr className="my-2"/>

                <div className="flex justify-between">
                    <button type="button"
                            onClick={handlePrevious}
                            className="bg-custom-primary hover:bg-gray-700
                           text-white px-2 py-1 rounded-md transition-transform duration-[80ms] ease-in active:scale-[0.95]">
                        Previous
                    </button>
                    <button type="button" onClick={handleNext}
                            className="bg-custom-primary hover:bg-gray-700
                               text-white px-4 py-1 rounded-md transition-transform duration-[80ms] ease-in active:scale-[0.95]">
                        Next
                    </button>
                </div>
                <hr className="my-2"/>
                <div className="flex flex-row gap-2">
                    <button type="button"
                            onClick={
                                () => {
                                    dispatch(_resetQuizQuestions())
                                    dispatch(_resetUnAnsweredQuestions())
                                    setPageNumber(1)
                                    notifySuccess("Quiz has been reset successfully!")
                                }
                            }
                            className="bg-red-500 text-white px-4 py-2 rounded-md mt-4">
                        Reset
                    </button>
                    <button type="button"
                            onClick={handleSubmit}
                            className="bg-green-500 text-white px-4 py-2 rounded-md mt-4">
                        Submit
                    </button>

                </div>
            </form>
        </>
    );
};