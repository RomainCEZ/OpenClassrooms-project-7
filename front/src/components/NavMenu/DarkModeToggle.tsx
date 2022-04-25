import { Menu, Switch } from "@headlessui/react";
import { useContext } from "react";
import { DarkmodeContext } from "../Darkmode/DarkModeContext";

export default function DarkModeToggle() {
    const { darkmode, setDarkmode } = useContext(DarkmodeContext);

    return (
        <Menu.Item>
            {({ active }) => (
                <Switch
                    checked={darkmode}
                    onChange={() => setDarkmode(!darkmode)}
                    className={`flex justify-center items-center w-full py-4 active:bg-blue-500 dark:active:bg-gray-600 cursor-pointer
                        ${active ? "bg-blue-600 dark:bg-gray-700" : ""}
                    `}
                >
                    <span className="font-bold mr-4">Mode sombre</span>
                    <div
                        className={`${
                            darkmode ? "bg-gray-300" : "bg-blue-100"
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
                    </div>
                </Switch>
            )}
        </Menu.Item>
    );
}
