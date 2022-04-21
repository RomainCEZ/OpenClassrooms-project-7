import { useContext } from "react";
import { Menu, Transition } from "@headlessui/react";
import { SessionContext } from "../../pages/Auth/context/SessionContext";
import { NavOption } from "./NavOption";

export function DropDownNav({ username }) {
    const { user, logout } = useContext(SessionContext);

    return (
        <Menu as="div" className="flex flex-col justify-center relative">
            <Menu.Button
                className="px-6 py-2.5 bg-blue-700 text-white font-bold rounded shadow-md
                hover:bg-blue-600 focus:bg-blue-600 active:bg-blue-500 transition-all"
            >
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
                    <NavOption path={`./profile/${user.id}`}>
                        Mon profil
                    </NavOption>
                    <NavOption path={`./login`} handleClick={() => logout()}>
                        Déconnexion
                    </NavOption>
                </Menu.Items>
            </Transition>
        </Menu>
    );
}
