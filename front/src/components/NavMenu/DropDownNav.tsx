import { useContext, useState } from "react";
import { Menu } from "@headlessui/react";
import { SessionContext } from "../../pages/Auth/context/SessionContext";
import { NavOption } from "./NavOption";

export function DropDownNav({ username }) {
    const { logout } = useContext(SessionContext);

    return (
        <Menu as="nav" className="relative">
            <Menu.Button
                className="px-6 py-2.5 bg-blue-700 text-white text-md rounded shadow-md
                        hover:bg-blue-600 hover:shadow-lg
                        focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0
                        active:bg-blue-600 active:shadow-lg
                        transition duration-150 ease-in-out
                    "
            >
                {`Bienvenue, ${username} !`}
            </Menu.Button>
            <Menu.Items className="w-full absolute bg-blue-700 py-2 rounded-lg shadow-lg mt-1">
                <NavOption path={`./`}>Accueil</NavOption>
                <NavOption path={`./login`} handleClick={() => logout()}>
                    Déconnexion
                </NavOption>
            </Menu.Items>
        </Menu>
    );
}
