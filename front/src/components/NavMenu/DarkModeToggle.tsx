import { Menu, Switch } from "@headlessui/react";
import { useContext } from "react";
import { DarkmodeContext } from "../Darkmode/DarkModeContext";

export default function DarkModeToggle() {
    const { darkmode, setDarkmode } = useContext(DarkmodeContext);

    return (
        <Menu.Item>
            {({ active }) => (
                <div
                    className={`
                        flex justify-center items-center p-4 font-bold dark:text-white active:bg-blue-500 cursor-pointer
                        ${
                            active
                                ? "bg-blue-600 text-white dark:bg-slate-700"
                                : "text-blue-800"
                        }
                    `}
                    onClick={() => setDarkmode(!darkmode)}
                >
                    <span className="mx-6">Thème</span>
                    <Switch
                        checked={darkmode}
                        onChange={() => setDarkmode(!darkmode)}
                        className={`${
                            darkmode ? "bg-gray-300" : "bg-blue-200"
                        } relative inline-flex items-center h-6 rounded-full w-11 transition`}
                    >
                        <span className="sr-only">Changer le thème</span>
                        <span
                            className={`${
                                darkmode
                                    ? "translate-x-5 bg-gray-700"
                                    : "translate-x-1 bg-blue-600"
                            } inline-block w-5 h-5 transform rounded-full transition`}
                        />
                    </Switch>
                </div>
            )}
        </Menu.Item>
    );
}
