import { useContext } from "react";
import { Menu, Transition } from "@headlessui/react";
import { SessionContext } from "../../pages/Auth/context/SessionContext";
import { NavLink } from "./NavLink";
import ProfilePictureBox from "../../pages/UserProfile/ProfilePictureBox";
import DarkModeToggle from "./DarkModeToggle";

export function DropDownNav() {
    const { user, logout } = useContext(SessionContext);

    return (
        <Menu
            as="div"
            className="flex flex-col justify-center items-end w-52 py-6"
        >
            <Menu.Button className="h-20 w-20">
                <ProfilePictureBox picture={user.profilePicture} />
            </Menu.Button>
            <Transition
                enter="transition duration-100 ease-out"
                enterFrom="transform scale-95 opacity-0"
                enterTo="transform scale-100 opacity-100"
                leave="transition duration-75 ease-out"
                leaveFrom="transform scale-100 opacity-100"
                leaveTo="transform scale-95 opacity-0"
            >
                <Menu.Items className="absolute mt-3 right-0 w-56 z-20 text-white bg-blue-800 dark:bg-gray-800 border-blue-500 dark:border-gray-600 divide-blue-500 dark:divide-gray-600 divide-y border rounded-lg shadow-lg">
                    <NavLink path={`./`}>Accueil</NavLink>
                    <NavLink path="./profile">Mon profil</NavLink>
                    <DarkModeToggle />
                    <NavLink path={`./login`} handleClick={() => logout()}>
                        Déconnexion
                    </NavLink>
                </Menu.Items>
            </Transition>
        </Menu>
    );
}
