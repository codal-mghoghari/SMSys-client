"use client";

import React, {useEffect} from "react";

export default function Loading() {
    const [isMounted, setIsMounted] = React.useState(true);
    useEffect(() => {
        setIsMounted(true)
    }, []);
    return (
        <>
            {
                isMounted ? (
                    <>
                        <div className="flex h-[100vh] w-full justify-center items-center">
                            <div className="flex w-[300px] h-[100px] justify-center items-end">
                                <div
                                    className="loading-bar flex w-[20px] h-[10px] ml-[5px] mr-[5px] bg-custom-primary rounded-[5px]"></div>
                                <div
                                    className="loading-bar flex w-[20px] h-[10px] ml-[5px] mr-[5px] bg-custom-primary rounded-[5px]"></div>
                                <div
                                    className="loading-bar flex w-[20px] h-[10px] ml-[5px] mr-[5px] bg-custom-primary rounded-[5px]"></div>
                                <div
                                    className="loading-bar flex w-[20px] h-[10px] ml-[5px] mr-[5px] bg-custom-primary rounded-[5px]"></div>
                            </div>
                        </div>
                        <style jsx>{`
                            .loading-bar {
                                animation: loading-wave-animation 1s ease-in-out infinite;
                            }

                            .loading-bar:nth-child(2) {
                                animation-delay: 0.1s;
                            }

                            .loading-bar:nth-child(3) {
                                animation-delay: 0.2s;
                            }

                            .loading-bar:nth-child(4) {
                                animation-delay: 0.3s;
                            }

                            @keyframes loading-wave-animation {
                                0% {
                                    height: 10px;
                                }

                                50% {
                                    height: 50px;
                                }

                                100% {
                                    height: 10px;
                                }
                            }
                        `
                        }</style>
                    </>
                ) : null
            }
        </>
    )
}
