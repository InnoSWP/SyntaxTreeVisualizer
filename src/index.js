import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Home from "./client/components/Home.js";
import * as serviceWorker from './client/serviceWorker.js';

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

serviceWorker.register();