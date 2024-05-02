import {iGrades} from "@/interfaces/iGrades";
import {StringIndexable} from "@/util/Util";
import quizJsonData from "@/configuration/quiz.json"
import {AnswersType} from "@/interfaces/iQuizData";
import {checkOptionIsCorrect} from "@/controller/quizController";


const genRecommendedCourses = async (props: iGrades) => {
    let returnRecommendedCourses: StringIndexable = quizJsonData[0].categories // Setting up all the default questison Types
    const answeredQuestions: StringIndexable = props.answeredSelector
    const unAnsweredQuestions: StringIndexable = props.unAnsweredSelector
    const allQuestionsData = props.quizData

    const answeredQuestionsKeys = Object.assign([], Object.keys(props.answeredSelector))
    console.log(props.answeredSelector)
    let answeredList: AnswersType = []
    if (Object.keys(answeredQuestions).length > 0) {
        for (const question of allQuestionsData) {
            const index: number = allQuestionsData.indexOf(question);
            let selectedOption = question.Answers?.find((ans) => ans.id == answeredQuestionsKeys[index] && props.answeredSelector[answeredQuestionsKeys[index]] === ans.option)
            if (selectedOption && index !== -1) {
                await checkOptionIsCorrect(selectedOption?.id)
                    .then((res) => {
                        console.log(res)
                        if (res?.data?.length === 1) {
                            answeredList.push(res?.data)
                        }
                    })
                    .catch((err) => console.error("checkOptionIsCorrect: ", err))
            }
        }

        // TODO

        let coursesObj = Object.entries(returnRecommendedCourses) // Sort the object's values from HIGH to LOW
            .sort(([, a], [, b]) => (b) - (a))
            .reduce((r, [k, v]) => ({...r, [k]: v}), {})

        console.log("correctAnswers: ", answeredList)

    } else {
        return null
    }


}

export default genRecommendedCourses