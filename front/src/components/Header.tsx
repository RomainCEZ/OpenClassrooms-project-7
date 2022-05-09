import { useContext } from "react";
import { Link } from "react-router-dom";
import { Logo } from "../assets/Logo";
import { SessionContext } from "../pages/Auth/context/SessionContext";
import { DropDownNav } from "./NavMenu/DropDownNav";
import { FaHome } from "react-icons/fa";
import { BiLogIn } from "react-icons/bi";

export default function Header() {
    const { loggedIn } = useContext(SessionContext);

    return (
        <header className="flex items-center justify-between h-32 bg-blue-800 dark:bg-gray-800 pl-9 pr-6 sm:px-8">
            <Link to="/" className="z-30 w-24">
                <Logo />
            </Link>
            <nav className="relative z-20">
                {loggedIn ? (
                    <DropDownNav />
                ) : (
                    <ul className="flex font-bold divide-x-2 divide-gray-100 dark:divide-gray-600">
                        <li>
                            <Link
                                to="/"
                                className="flex items-center mr-4 px-3 lg:px-7 btn blue gap-2"
                            >
                                <span className="text-3xl md:text-2xl lg:hidden">
                                    <FaHome />
                                </span>{" "}
                                <span className="hidden lg:block">Accueil</span>
                            </Link>
                        </li>
                        <li>
                            <Link
                                to="./login"
                                className="flex items-center ml-4 pl-2 pr-4 md:px-6 btn blue gap-2"
                            >
                                <span className="text-3xl md:text-2xl md:hidden">
                                    <BiLogIn />
                                </span>{" "}
                                <span className="hidden md:block">
                                    Connexion
                                </span>
                            </Link>
                        </li>
                    </ul>
                )}
            </nav>
        </header>
    );
}
