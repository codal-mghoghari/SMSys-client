"use client";

import {BrowserRouter as Router, Routes, Route, Navigate} from "react-router-dom";

export default function Home() {
    return (
        <>
            <Router>
                <Routes>
                    <Route
                        path="/"
                        element={
                            <Navigate replace={true} to="/login"/>
                        }
                    />
                </Routes>
            </Router>
        </>
    );
}
