import {iGrades} from "@/interfaces/iGrades";
import {StringIndexable} from "@/util/Util";
import {eachQuestion} from "@/components/QuizUi";
import quizJsonData from "@/configuration/quiz.json"


const genRecommendedCourses = (props: iGrades) => {
    let returnRecommendedCourses: StringIndexable = quizJsonData[0].categories // Setting up all the default questison Types
    const answeredQuestions: StringIndexable = props.answeredSelector
    const unAnsweredQuestions: StringIndexable = props.unAnsweredSelector
    const allQuestionsData: StringIndexable = props.Questions[0]
    let grades = 0;

    const answeredQuestionsValues = Object.assign([], Object.values(props.answeredSelector))

    let correctQuestions: eachQuestion[] = []
    if (Object.keys(answeredQuestions).length > 0) {
        allQuestionsData.forEach((question: eachQuestion, index: number) => {
            for (let i = 0; i < question.answerOptions.length; i++) {
                if (question.answerOptions[i]?.answer === answeredQuestionsValues[index]) {
                    if (question.answerOptions[i]?.isCorrect) {
                        correctQuestions.push(question)
                    }
                }
            }

        })

        correctQuestions.forEach((correctQuestion) => {
            if (correctQuestion.type.toLowerCase() === correctQuestion.type.toLowerCase()) {
                returnRecommendedCourses = {
                    ...returnRecommendedCourses,
                    [correctQuestion.type]: returnRecommendedCourses[correctQuestion.type] + 1
                }
            }
        })

        console.log("returnRecommendedCourses", Object.entries(returnRecommendedCourses) // Sort the object's values from HIGH to LOW
            .sort(([, a], [, b]) => (b) - (a))
            .reduce((r, [k, v]) => ({...r, [k]: v}), {}))
        return Object.entries(returnRecommendedCourses) // Sort the object's values from HIGH to LOW
            .sort(([, a], [, b]) => (b) - (a))
            .reduce((r, [k, v]) => ({...r, [k]: v}), {})

    } else {
        return null
    }


}

export default genRecommendedCourses