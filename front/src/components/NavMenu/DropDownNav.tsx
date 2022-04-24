import { useContext } from "react";
import { Menu, Transition } from "@headlessui/react";
import { SessionContext } from "../../pages/Auth/context/SessionContext";
import { NavOption } from "./NavOption";
import ProfilePictureBox from "../../pages/UserProfile/ProfilePictureBox";

export function DropDownNav({ profilePicture }) {
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
                <Menu.Items className="absolute right-0 w-52 z-20 bg-white border-2 border-blue-600 py-2 rounded-lg shadow-lg mt-1">
                    <NavOption path={`./`}>Accueil</NavOption>
                    <NavOption path="./profile">Mon profil</NavOption>
                    <NavOption path={`./login`} handleClick={() => logout()}>
                        Déconnexion
                    </NavOption>
                </Menu.Items>
            </Transition>
        </Menu>
    );
}
