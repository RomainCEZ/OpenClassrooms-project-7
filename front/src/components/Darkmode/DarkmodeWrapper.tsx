import { useContext } from "react";
import { DarkmodeContext } from "./DarkModeContext";

export default function DarkmodeWrapper({ children }) {
    const { darkmode } = useContext(DarkmodeContext);

    return (
        <div className={`w-full ${darkmode ? "dark" : ""}`}>
            <div className="flex flex-col items-center px-6 sm:px-20 rounded border shadow-xl bg-white/90 dark:bg-gray-400 border-indigo-900 dark:border-gray-800">
                {children}
            </div>
        </div>
    );
}
