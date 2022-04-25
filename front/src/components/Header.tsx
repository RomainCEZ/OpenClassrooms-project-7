import { useContext } from "react";
import { Link } from "react-router-dom";
import { Logo } from "../assets/Logo";
import { SessionContext } from "../pages/Auth/context/SessionContext";
import { DropDownNav } from "./NavMenu/DropDownNav";

export default function Header() {
    const { loggedIn, user } = useContext(SessionContext);

    return (
        <header className="flex items-center justify-between bg-blue-800 dark:bg-gray-900 px-6">
            <Logo />
            <nav className="relative">
                {loggedIn ? (
                    <DropDownNav profilePicture={user.profilePicture} />
                ) : (
                    <ul className="flex font-bold divide-x-2 dark:divide-gray-600 py-8">
                        <li>
                            <Link to="/" className="mr-4 px-8 btn-blue">
                                Accueil
                            </Link>
                        </li>
                        <li>
                            <Link to="./login" className="ml-4 px-6 btn-blue">
                                Connexion
                            </Link>
                        </li>
                    </ul>
                )}
            </nav>
        </header>
    );
}
