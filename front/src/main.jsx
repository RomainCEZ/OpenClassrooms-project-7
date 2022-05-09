import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import TimeAgo from "javascript-time-ago";
import fr from "javascript-time-ago/locale/fr.json";

TimeAgo.addDefaultLocale(fr);

ReactDOM.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>,
    document.getElementById("root")
);
