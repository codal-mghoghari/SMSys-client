import {iGrades} from "@/interfaces/iGrades";
import QuizData from '@/configuration/quiz.json'
const genRecommendedCourses = (props: iGrades) => {
    const answeredQuestions = props.answeredSelector
    const unAnsweredQuestions = props.unAnsweredSelector
    let grades = 0;

    //TODO Setup grades and return Recommended Courses
}

export default genRecommendedCourses