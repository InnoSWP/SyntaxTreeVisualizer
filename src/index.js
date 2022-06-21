import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Home from "./client/components/Home.js";

ReactDOM.render(
    <BrowserRouter>
        <div className="App">
            <Routes>
                <Route path="/" element={<Home/>}/>
            </Routes>
        </div>
    </BrowserRouter>,
    document.getElementById("root")
);