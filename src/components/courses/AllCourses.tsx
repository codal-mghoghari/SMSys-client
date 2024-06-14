import {ToggleBtn} from "@/components/ToggleBtn";
import React, {ChangeEvent} from "react";
import {IoIosArrowDown} from "react-icons/io";
import {StringIndexable} from "@/util/Util";
import {coursesType} from "../../../redux/store/slices/courseReducer";
import {capitalizeEachWord} from "@/util/Common";

export const AllCourses = (props: {
    title: string,
    allQuizData: Object,
    courses?: coursesType | StringIndexable,
    btnHandler: (e: ChangeEvent<HTMLInputElement>) => void
}) => {
    //States
    const [hideAllCourses, setHideAllCourses] = React.useState(false);

    const handleAllCourses = () => {
        setHideAllCourses(!hideAllCourses);
    }

    return (
        <>
            <div className="flex flex-row items-center gap-3 m-4" onClick={handleAllCourses}>
                <span className="text-2xl font-medium hover:underline">{props.title}</span>
                <IoIosArrowDown
                    className={`text-2xl transition-all duration-[250ms] ease-in ${hideAllCourses ? '' : '-rotate-180'}`}
                    />
            </div>
            <main
                className={`user transition-all duration-[250ms] ease-in max-w-full ${hideAllCourses ? 'h-[0vh]' : '2xl:h-[100%] lg:h-[100vh] md:h-[100vh]'} flex relative overflow-hidden`}>
                {props.title === "Recommended Courses" && (
                    <div id="recomm-course-container"
                         className="w-full m-4 flex flex-wrap items-start justify-start rounded-tl gap-4 overflow-y-scroll">
                        {
                            props?.courses?.courses?.recommCourses?.map((cat: string, index: number) => {
                                return (
                                    <div key={index}
                                         className="relative group flex justify-center items-center 2xl:w-[30rem] lg:w-96 2xl:h-60 lg:h-56 rounded-lg flex-shrink-0 flex-grow bg-courseImage bg-cover opacity-80 cursor-pointer">
                                        <span
                                            className="absolute font-bold group-hover:opacity-0 text-4xl text-center text-white">{capitalizeEachWord(cat)} Course</span>
                                        <div
                                            className="flex gap-2 flex-col justify-center items-center opacity-0 group-hover:opacity-100 group-hover:transition-all group-hover:duration-500 group-hover:ease-linear">
                                            <span
                                                className="font-bold  text-4xl text-center text-white">{capitalizeEachWord(cat)} Course</span>
                                            <span
                                                className="text-xl font-medium text-center text-white"> Here, you will learn {capitalizeEachWord(cat)} concepts and more..</span>
                                            <ToggleBtn id={cat} handleChange={(e) => props.btnHandler(e)}/>
                                        </div>
                                    </div>
                                )
                            })

                        }
                    </div>
                )}
                {props.title === "All Courses" && (
                    <div id="all-course-container"
                         className="w-full m-4 flex flex-wrap items-start justify-start rounded-tl gap-4 overflow-y-scroll">
                        {
                            props?.courses?.courses?.defaultCourses?.length > 0 && props?.courses?.courses?.defaultCourses?.map((cat: {
                                id: string,
                                course_name: string,
                            }, index: number) => {
                                return (
                                    <div key={index + 100}
                                         className="relative  group flex justify-center items-center 2xl:w-[30rem] lg:w-96 2xl:h-60 lg:h-56 rounded-lg flex-shrink-0 flex-grow bg-courseImage bg-cover opacity-80 cursor-pointer">
                                        <span
                                            className="absolute font-bold group-hover:opacity-0 text-4xl text-center text-white">{capitalizeEachWord(cat.course_name)} Course</span>
                                        <div
                                            className="flex gap-2 flex-col justify-center items-center opacity-0 group-hover:opacity-100 group-hover:transition-all group-hover:duration-500 group-hover:ease-linear">
                                            <span
                                                className="font-bold  text-4xl text-center text-white">{capitalizeEachWord(cat.course_name)} Course</span>
                                            <span
                                                className="text-xl font-medium text-center text-white"> Here, you will learn {capitalizeEachWord(cat.course_name)} concepts and more..</span>
                                            <ToggleBtn id={"allCourses-" + capitalizeEachWord(cat.course_name)}
                                                       handleChange={(e) => props.btnHandler(e)}/>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                )}
            </main>
        </>
    );
};