import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App";
import TimeAgo from "javascript-time-ago";
import fr from "./utils/TimeAgoConfig/fr.json";

TimeAgo.addDefaultLocale(fr);

ReactDOM.render(
    <React.StrictMode>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </React.StrictMode>,
    document.getElementById("root")
);
