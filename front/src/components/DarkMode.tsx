import { createContext, useState } from "react";

export const DarkmodeContext = createContext({
    darkmode: false,
    setDarkmode: null,
});

export const DarkMode = ({ children }) => {
    const [darkmode, setDarkmode] = useState(true);

    return (
        <DarkmodeContext.Provider value={{ darkmode, setDarkmode }}>
            <div className={darkmode ? "dark" : ""}>{children}</div>
        </DarkmodeContext.Provider>
    );
};
