import { useContext } from "react";
import { Menu, Transition } from "@headlessui/react";
import { SessionContext } from "../../pages/Auth/context/SessionContext";
import { NavLink } from "./NavLink";
import ProfilePictureBox from "../../pages/UserProfile/ProfilePictureBox";
import { DarkmodeContext } from "../DarkMode";
import NavButton from "./NavButton";

export function DropDownNav({ profilePicture }) {
    const { user, logout } = useContext(SessionContext);
    const { darkmode, setDarkmode } = useContext(DarkmodeContext);

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
                <Menu.Items className="absolute mt-3 right-0 w-52 z-20 bg-white dark:bg-gray-800  border-2 border-blue-600 dark:border-slate-600 py-2 rounded-lg shadow-lg">
                    <NavLink path={`./`}>Accueil</NavLink>
                    <NavLink path="./profile">Mon profil</NavLink>
                    <NavButton handleClick={() => setDarkmode(!darkmode)}>
                        Mode sombre
                    </NavButton>
                    <NavLink path={`./login`} handleClick={() => logout()}>
                        Déconnexion
                    </NavLink>
                </Menu.Items>
            </Transition>
        </Menu>
    );
}
