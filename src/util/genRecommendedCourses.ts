import {iGrades} from "@/interfaces/iGrades";
import {StringIndexable} from "@/util/Util";
import {AnswersType, QuizDataType} from "@/interfaces/iQuizData";
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
            let selectedOption = question.Answers?.find((ans) => ans.question_id == answeredQuestionsKeys[index] && props.answeredSelector[answeredQuestionsKeys[index]] === ans.option)
            if (selectedOption && index !== -1) {
                await checkOptionIsCorrect(selectedOption?.id)
                    .then((res) => {
                        if (res?.data?.length === 1) { // Returns 1 if its correct option
                            answeredList.push(res?.data[0])
                        }
                    })
                    .catch((err) => console.error("checkOptionIsCorrect: ", err))
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

        }

        return returnRecommendedCourses
    }

    return []
}

export default genRecommendedCourses