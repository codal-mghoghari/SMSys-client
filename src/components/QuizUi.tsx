import quizData from '../configuration/quiz.json'
import defaultConfig from '../configuration/defaultConfig.json'
import {paginate, StringIndexable} from "@/util/Util";
import React, {ChangeEvent, useState} from "react";
import Image from "next/image";
import {useDispatch, useSelector} from "react-redux";
import {
    _resetQuizQuestions,
    _updateQuizData,
    _setUnAnsweredQuestions,
    _removeUnAnsweredQuestions, _resetUnAnsweredQuestions
} from "../../redux/store/slices/quizReducer";
import {rootStateType} from "../../redux/store/mainStore";
import {toast} from "react-toastify";
import {notifySuccess} from "@/util/Common";
import SubmitDialog from "@/components/SubmitDialog";
import genRecommendedCourses from "@/util/genRecommendedCourses";

type RootQuestions = {
    categories: Array<string>,
    questions: Array<Questions>
}

type Questions = {
    Questions: Array<CategoryQuestions>,
}

export type CategoryQuestions = {
    id: number,
    type: string,
    question: string,
    answerOptions: ({ id: number, answer: string, isCorrect?: undefined | boolean })[]
}[][]

type eachQuestion = {
    id: number,
    type: string,
    question: string,
    answerOptions: ({ id: number, answer: string, isCorrect?: undefined | boolean })[]
}


export const QuizUi = () => {
    //Global
    const answeredSelector: StringIndexable = useSelector((state: rootStateType) => state.quiz.quizData.answeredQuestions);
    const unAnsweredSelector: StringIndexable = useSelector((state: rootStateType) => state.quiz.quizData.unAnsweredQuestions);


    //States
    const [pageSize, setPageSize] = useState<number>(1);
    const [pageNumber, setPageNumber] = useState<number>(1);
    const [unAnsweredPlaceholderText, setUnAnsweredPlaceholderText] = useState<string>("");
    const [dialogBool, setDialogBool] = useState({bool: false, elem: ""})


    //Variables
    const dispatch = useDispatch();
    const quizCategories = quizData.map((quiz) => {
        return quiz.questions[0]
    })
    const Questions: CategoryQuestions = quizCategories.map((quiz) => {
        return quiz.questions
    })
    const ansOptions = (qIndex: number) => Questions.map((quiz) => {
        return quiz[qIndex].answerOptions
    })

    const answeredQuestionsLen = Object.keys(answeredSelector).length
    const unAnsweredQuestionsLen = Object.keys(unAnsweredSelector).length
    const totalQuestionsLen = Questions[0].length


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
        if (Questions[0].length >= pageNumber && pageNumber > 1) {
            setPageNumber(prevState => prevState - 1)
        }

    }

    const handleNext = () => {
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
        if (Questions[0].length !== pageNumber) {
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

    const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        genRecommendedCourses({unAnsweredSelector, answeredSelector, Questions})
    }


    return (
        <>
            <div className="flex flex-row items-center justify-end  text-center w-full flex-wrap">
                <div className="flex gap-2 w-32 flex-wrap">
                    {Questions[0].map((question, index: React.Key) => (
                        <div onClick={() => {
                            setPageNumber(question.id)
                            handleDirectNavFromButtons()
                        }}
                             key={index}
                             className={`${unAnsweredSelector[`q${question.id}`] === question.id ? 'bg-rose-200' : 'bg-gray-100'} w-6 h-6 hover:cursor-pointer transition duration-300 ease-in hover:border hover:border-black`}>
                            {question.id}
                        </div>
                    ))}
                </div>

            </div>
            <h1 className="text-3xl font-bold mb-6
                   text-custom-primary text-center">
                {defaultConfig.websiteTitle}
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
                        paginate(Questions[0], pageSize, pageNumber).map((question: eachQuestion, index: React.Key) => {
                            return (
                                <div key={index}>
                                    <div className="flex flex-row items-center justify-center">
                                        <h3 className="text-2xl font-bold mb-6 text-center">
                                            Question {question.id}
                                        </h3>
                                    </div>
                                    {
                                        question.type === "Javascript" ? (
                                            <Image className="absolute left-5 top-5" width="50"
                                                   height="50"
                                                   src="/jsicon.png" alt="js"/>
                                        ) : (
                                            <Image className="absolute left-5 top-5" width="50"
                                                   height="50"
                                                   src="/tsicon.png" alt="js"/>
                                        )
                                    }
                                    <label className="text-lg text-gray-800 mb-2">
                                        {question.question}
                                    </label>
                                    {ansOptions(pageNumber - 1)[0].map((
                                        option: {
                                            id: number,
                                            answer: string,
                                            isCorrect?: undefined | boolean
                                        }, index: React.Key) => {
                                        return (
                                            <>
                                                <div key={index}
                                                     className="flex items-center space-x-4">
                                                    <input id={question.id.toString()}
                                                           name="option" type="radio"
                                                           value={option.answer}
                                                           checked={
                                                               answeredSelector[question.id] === option.answer
                                                           }
                                                           onChange={e => handleSelect(e)}
                                                           className="w-4 h-4 text-blue-600 bg-custom-primary border-gray-800 focus:outline-0"
                                                           required
                                                    />
                                                    <label className="text-black">
                                                        {option.answer}
                                                    </label>
                                                </div>
                                            </>
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