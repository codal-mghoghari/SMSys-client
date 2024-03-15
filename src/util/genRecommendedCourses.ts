import {iGrades} from "@/interfaces/iGrades";
import {StringIndexable} from "@/util/Util";
import {eachQuestion} from "@/components/QuizUi";
import quizJsonData from "@/configuration/quiz.json"


const genRecommendedCourses = (props: iGrades) => {
    const quizCats = quizJsonData[0].categories // getting all the question types
    let returnRecommendedCourses = quizCats // Setting up all the default questison Types
    const answeredQuestions: StringIndexable = props.answeredSelector
    const unAnsweredQuestions: StringIndexable = props.unAnsweredSelector
    const allQuestionsData: StringIndexable = props.Questions[0]
    let grades = 0;

    const answeredQuestionsValues = Object.assign([], Object.values(props.answeredSelector))
    console.log("answeredQuestionsValues: ", answeredQuestionsValues)

    if (Object.keys(answeredQuestions).length > 0) {
        let correctQuestions: eachQuestion[] = []
        allQuestionsData.forEach((question: eachQuestion, index: number) => {
            for (let i = 0; i < question.answerOptions.length; i++) {
                if(question.answerOptions[i]?.answer === answeredQuestionsValues[index]) {
                    if(question.answerOptions[i]?.isCorrect){
                        correctQuestions.push(question)
                    }
                }
            }

        })

        correctQuestions.forEach((correctQuestion) => {
            if(correctQuestion.type.toLowerCase() === "javascript"){
                returnRecommendedCourses = {
                    ...returnRecommendedCourses,
                    [correctQuestion.type]: returnRecommendedCourses.Javascript+1
                }
            }
            if(correctQuestion.type.toLowerCase() === "typescript"){
                returnRecommendedCourses = {
                    ...returnRecommendedCourses,
                    [correctQuestion.type]: returnRecommendedCourses.Typescript+1
                }
            }
        })

    }

    console.log(returnRecommendedCourses);

    return null
}

export default genRecommendedCourses