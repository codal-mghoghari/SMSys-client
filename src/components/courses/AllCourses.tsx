import {ToggleBtn} from "@/components/ToggleBtn";
import React, {ChangeEvent} from "react";
import quizJsonData from "@/configuration/quiz.json";

export const AllCourses = (props: {
    allQuizData: Object,
    quizCats: Object,
    btnHandler: (e: ChangeEvent<HTMLInputElement>) => void
}) => {
    return (
        <>
            <main id="user" className="max-w-full h-[100vh] flex relative overflow-hidden">
                <div id="opt-course-container"
                     className="w-full m-4 flex flex-wrap items-start justify-start rounded-tl grid-flow-col auto-cols-max gap-4 overflow-y-scroll">
                    {Object.keys(props.quizCats).map((cat, index) => {
                        return (
                            <div key={index}
                                 className="relative group flex justify-center items-center w-96 h-60 rounded-lg flex-shrink-0 flex-grow bg-courseImage bg-cover opacity-80 cursor-pointer">
                                        <span
                                            className="absolute font-bold group-hover:opacity-0 text-4xl text-center text-white">{cat} Course</span>
                                <div
                                    className="flex gap-2 flex-col justify-center items-center opacity-0 group-hover:opacity-100 group-hover:transition-all group-hover:duration-500 group-hover:ease-linear">
                                            <span
                                                className="font-bold  text-4xl text-center text-white">{cat} Course</span>
                                    <span
                                        className="text-xl font-medium text-center text-white"> Here, you will learn {cat} concepts and more..</span>
                                    <ToggleBtn id={cat} handleChange={(e) => props.btnHandler(e)}/>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </main>

        </>
    );
};