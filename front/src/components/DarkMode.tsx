import { createContext, useEffect, useState } from "react";

export const DarkmodeContext = createContext({
    darkmode: false,
    setDarkmode: null,
});

export const DarkMode = ({ children }) => {
    const [darkmode, setDarkmode] = useState(true);

    useEffect(() => {
        const darkmodeSetting = localStorage.getItem("darkmode")
            ? JSON.parse(localStorage.getItem("darkmode"))
            : false;
        setDarkmode(darkmodeSetting);
    }, []);

    useEffect(() => {
        localStorage.setItem("darkmode", JSON.stringify(darkmode));
    }, [darkmode]);

    return (
        <DarkmodeContext.Provider value={{ darkmode, setDarkmode }}>
            <div className={darkmode ? "dark" : ""}>{children}</div>
        </DarkmodeContext.Provider>
    );
};
