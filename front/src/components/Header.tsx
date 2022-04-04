import { useContext } from "react";
import { Link } from "react-router-dom";
import { Logo } from "../assets/Logo";
import { SessionContext } from "../pages/Auth/context/SessionContext";
import { DropDownNav } from "./NavMenu/DropDownNav";

export default function Header() {
    const { loggedIn, user } = useContext(SessionContext);

    return (
        <header className="flex items-center justify-between bg-blue-800 p-5">
            <Logo />
            <nav className="mr-6 text-white relative">
                {loggedIn ? (
                    <DropDownNav username={user.username} />
                ) : (
                    <ul className="flex font-bold divide-x-2">
                        <li>
                            <Link
                                to="/"
                                className="mr-4 px-8 py-3.5 bg-blue-700 rounded shadow-lg
                                hover:bg-blue-600 hover:shadow-lg
                                focus:bg-blue-600 focus:shadow-lg
                                active:bg-blue-500 active:shadow-lg
                                transition-all duration-150 ease-in-out"
                            >
                                Accueil
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="./login"
                                className="ml-4 px-6 py-3.5 bg-blue-700 text-white rounded shadow-md
                                        hover:bg-blue-600 hover:shadow-lg
                                        focus:bg-blue-600 focus:shadow-lg
                                        active:bg-blue-500 active:shadow-lg
                                        transition duration-150 ease-in-out"
                            >
                                Connexion
                            </Link>
                        </li>
                    </ul>
                )}
            </nav>
        </header>
    );
}
