import {iGrades} from "@/interfaces/iGrades";
import {StringIndexable} from "@/util/Util";
import {AnswersType, EachAnswersType, QuizDataType, QuizEachOptionsType} from "@/interfaces/iQuizData";
import {checkOptionIsCorrect} from "@/controller/quizController";
import {getQuestionsByType} from "@/util/Common";


const genRecommendedCourses = async (props: iGrades) => {
    // Props
    const answeredQuestions: StringIndexable = props.answeredSelector
    const unAnsweredQuestions: StringIndexable = props.unAnsweredSelector
    const allQuestionsData = props.quizData

    const answeredQuestionsKeys = Object.assign([], Object.keys(props.answeredSelector))

    // Local Variables
    let answeredList: AnswersType = []
    let answeredTypes: StringIndexable = {}
    const returnRecommendedCourses: string[] = []

    if (Object.keys(answeredQuestions).length > 0) {
        for (const question of allQuestionsData) {
            const index: number = allQuestionsData.indexOf(question);
            let selectedOption = question.Answers?.find((ans: QuizEachOptionsType) => answeredQuestionsKeys.includes(ans?.question_id.toString()) && answeredQuestions[ans?.question_id!.toString()] === ans?.option_description)
            if (selectedOption && index !== -1) {
                await checkOptionIsCorrect(selectedOption?.id)
                    .then((res) => {
                        if (res?.totalLength === 1 && res?.data.isCorrect === 1) { // Only adding if its isCorrect = true
                            answeredList.push(res?.data)
                        }
                    })
                    .catch((err) => console.log("checkOptionIsCorrect: ", err))

            }
        }

        if (answeredList.length > 0) {
            answeredList.forEach((answer) => {
                if (answer.question_type in answeredTypes) {
                    answeredTypes = {
                        ...answeredTypes,
                        [answer.question_type]: answeredTypes[answer.question_type] + 1
                    }
                } else {
                    answeredTypes = {
                        ...answeredTypes,
                        [answer.question_type]: 1,
                    }
                }
            })
            
            Object.keys(answeredTypes).map((item) => {
                let key = item
                let val = answeredTypes[item]
                let totalItemLength = getQuestionsByType(props.quizData, key).length
                if (val / totalItemLength <= 0.5) {
                    returnRecommendedCourses.push(key)
                }
            })

            allQuestionsData.filter((question) => {
                if (!(question?.id! in answeredQuestions)) {
                    if (!returnRecommendedCourses.includes(question?.question_type!)) {
                        returnRecommendedCourses.push(question?.question_type!)
                    }
                    return false
                }
            })

            return returnRecommendedCourses
        }

        return []
    }

    return []
}

export default genRecommendedCourses