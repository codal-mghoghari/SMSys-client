import {StringIndexable} from "@/util/Util";
import {QuizDataType} from "@/interfaces/iQuizData";

export type iGrades = {
    unAnsweredSelector: Object | StringIndexable,
    answeredSelector: Object | StringIndexable,
    quizData: QuizDataType
}