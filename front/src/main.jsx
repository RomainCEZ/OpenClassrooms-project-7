import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import "./index.css";
import App from "./App";
import TimeAgo from "javascript-time-ago";
import fr from "javascript-time-ago/locale/fr.json";

TimeAgo.addDefaultLocale(fr);

// const rootContainer = document.getElementById("root");
// const root = ReactDOM.createRoot(rootContainer);
// root.render(
//     <React.StrictMode>
//         <BrowserRouter>
//             <App />
//         </BrowserRouter>
//     </React.StrictMode>
// );

ReactDOM.render(
    <React.StrictMode>
        <BrowserRouter>
            <App />
        </BrowserRouter>
    </React.StrictMode>,
    document.getElementById("root")
);
