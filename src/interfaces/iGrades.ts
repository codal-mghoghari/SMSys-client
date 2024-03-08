import {StringIndexable} from "@/util/Util";
import {CategoryQuestions} from "@/components/QuizUi";

export type iGrades = {
    unAnsweredSelector: Object | StringIndexable,
    answeredSelector: Object | StringIndexable,
    Questions: CategoryQuestions,
}