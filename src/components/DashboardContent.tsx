"use client"

import {ToggleBtn} from "@/components/ToggleBtn";
import {ChangeEvent} from "react";

export const DashboardContent = (props: {
    active: string,
    jsHandler: (e: ChangeEvent<HTMLInputElement>) => void,
    tsHandler: (e: ChangeEvent<HTMLInputElement>) => void,
    cSharpHandler: (e: ChangeEvent<HTMLInputElement>) => void,
    javaHandler: (e: ChangeEvent<HTMLInputElement>) => void,
}) => {
    return (
        <>
            {props.active === "user" ? (
                <main className="max-w-full h-full flex relative overflow-y-hidden">
                    <div
                        className="h-full w-full m-4 flex flex-wrap items-start justify-start rounded-tl grid-flow-col auto-cols-max gap-4 overflow-y-scroll">
                        <div
                            className="relative group flex justify-center items-center w-96 h-60 rounded-lg flex-shrink-0 flex-grow bg-courseImage bg-cover opacity-80 cursor-pointer">
                                        <span
                                            className="absolute font-bold group-hover:opacity-0 text-4xl text-center text-white">Javascript Course</span>
                            <div
                                className="flex gap-2 flex-col justify-center items-center opacity-0 group-hover:opacity-100 group-hover:transition-all group-hover:duration-500 group-hover:ease-linear">
                                            <span
                                                className="font-bold  text-4xl text-center text-white">Javascript Course</span>
                                <span className="text-xl font-medium text-center text-white"> Here, you will learn javascript concepts and more..</span>
                                <ToggleBtn id="js" handleChange={(e) => props.jsHandler(e)} />
                            </div>
                        </div>
                        <div
                            className="relative group flex justify-center items-center w-96 h-60 rounded-lg flex-shrink-0 flex-grow bg-courseImage bg-cover opacity-80 cursor-pointer ">
                                        <span
                                            className="absolute font-bold group-hover:opacity-0 text-4xl text-center text-white">Typescript Course</span>
                            <div
                                className="flex gap-2 flex-col justify-center items-center opacity-0 group-hover:opacity-100 group-hover:transition-all group-hover:duration-500 group-hover:ease-linear">
                                            <span
                                                className="font-bold  text-4xl text-center text-white">Typescript Course</span>
                                <span className="text-xl font-medium text-center text-white"> Here, you will learn Typescript concepts and more..</span>
                                <ToggleBtn id="ts" handleChange={(e) => props.tsHandler(e)}/>
                            </div>
                        </div>
                        <div
                            className="relative group flex justify-center items-center w-96 h-60 rounded-lg flex-shrink-0 flex-grow bg-courseImage bg-cover opacity-80 cursor-pointer ">
                                        <span
                                            className="absolute font-bold group-hover:opacity-0 text-4xl text-center text-white">C# Course</span>
                            <div
                                className="flex gap-2 flex-col justify-center items-center opacity-0 group-hover:opacity-100 group-hover:transition-all group-hover:duration-500 group-hover:ease-linear">
                                            <span
                                                className="font-bold  text-4xl text-center text-white">C# Course</span>
                                <span className="text-xl font-medium text-center text-white"> Here, you will learn C# concepts and more..</span>
                                <ToggleBtn id="cSharp" handleChange={(e) => props.cSharpHandler(e)}/>
                            </div>
                        </div>
                        <div
                            className="relative group flex justify-center items-center w-96 h-60 rounded-lg flex-shrink-0 flex-grow bg-courseImage bg-cover opacity-80 cursor-pointer ">
                                        <span
                                            className="absolute font-bold group-hover:opacity-0 text-4xl text-center text-white">Java Course</span>
                            <div
                                className="flex gap-2 flex-col justify-center items-center opacity-0 group-hover:opacity-100 group-hover:transition-all group-hover:duration-500 group-hover:ease-linear">
                                            <span
                                                className="font-bold  text-4xl text-center text-white">Java Course</span>
                                <span className="text-xl font-medium text-center text-white"> Here, you will learn java concepts and more..</span>
                                <ToggleBtn id="java" handleChange={(e) => props.javaHandler(e)}/>
                            </div>
                        </div>
                    </div>
                </main>

            ) : (
                <div>
                    <h2>Do something</h2>
                </div>
            )
            }
        </>
    );
};