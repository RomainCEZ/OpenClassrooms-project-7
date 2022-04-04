import { useContext, useState } from "react";
import { Menu, Transition } from "@headlessui/react";
import { SessionContext } from "../../pages/Auth/context/SessionContext";
import { NavOption } from "./NavOption";

export function DropDownNav({ username }) {
    const { logout } = useContext(SessionContext);

    return (
        <Menu as="div" className="flex flex-col justify-center relative">
            <Menu.Button
                className="px-6 py-2.5 bg-blue-700 text-white font-bold rounded shadow-md
                        hover:bg-blue-600 hover:shadow-lg
                        focus:bg-blue-600 focus:shadow-lg
                        active:bg-blue-500 active:shadow-lg
                        transition duration-150 ease-in-out
                    "
            >
                {/* <Menu.Button
                className="group overflow-hidden p-12 relative bg-blue-700 text-white font-bold rounded-full shadow-md border-2 border-blue-400
                        hover:bg-blue-600 hover:border-blue-200 hover:shadow-blue-400
                        focus:bg-blue-700 focus:shadow-md focus:outline-none focus:ring-0
                        active:bg-blue-600 active:shadow-md
                        transition-all
                    "
            >
                <div className="absolute top-6 right-7 p-5 bg-blue-600 group-hover:bg-blue-500 hover:shadow-lg rounded-full transition-all"></div>
                <div className="absolute top-2/3 right-0 p-12 bg-blue-600 group-hover:bg-blue-500 hover:shadow-lg rounded-full transition-all"></div> */}
                {`Bienvenue, ${username} !`}
            </Menu.Button>
            <Transition
                enter="transition duration-100 ease-out"
                enterFrom="transform scale-95 opacity-0"
                enterTo="transform scale-100 opacity-100"
                leave="transition duration-75 ease-out"
                leaveFrom="transform scale-100 opacity-100"
                leaveTo="transform scale-95 opacity-0"
            >
                <Menu.Items className="absolute w-full bg-blue-700 py-2 rounded-lg shadow-lg mt-1">
                    <NavOption path={`./`}>Accueil</NavOption>
                    <NavOption path={`./login`} handleClick={() => logout()}>
                        Déconnexion
                    </NavOption>
                </Menu.Items>
            </Transition>
        </Menu>
    );
}
