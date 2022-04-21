import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import BlueOnClickButton from "../../components/Buttons/OnClick/BlueOnClickButton";
import RedOnClickButton from "../../components/Buttons/OnClick/RedOnClickButton";
import { authProvider } from "../../providers/AuthProvider";
import { SessionContext } from "../Auth/context/SessionContext";
import ConfirmDisableAccount from "./ConfirmDisableAccount";

export default function UserProfile() {
    const { user, navigate } = useContext(SessionContext);
    const [isOpen, setIsOpen] = useState(false);
    const openModal = () => {
        setIsOpen(true);
    };
    const closeModal = () => {
        setIsOpen(false);
    };

    const changePassword = async () => {};

    const disableAccount = async () => {
        // await authProvider.disableAccount(user.id);
        navigate("/");
    };
    return (
        <section className="relative flex flex-col items-center bg-white w-full border border-blue-800 sm:rounded-xl overflow-clip shadow-lg">
            <div className="absolute w-full h-36 bg-blue-800 shadow-md"></div>
            <div className="flex flex-col justify-center items-center mt-16 z-10 w-36 h-36 bg-gray-100 rounded-full border-2 border-blue-800 overflow-hidden shadow-lg">
                <div className="mt-20 p-8 bg-blue-700 rounded-full shadow-lg"></div>
                <div className="mt-0.5 p-14 bg-blue-700 rounded-full shadow-lg"></div>
                <img src="" className="" />
            </div>
            <div className="flex flex-col justify-center p-6 pt-0 w-full bg-white divide-blue-800 divide-y gap-3">
                <div className="p-4 text-4xl self-center text-blue-800 font-bold">
                    {user.username}
                </div>
                <div className="flex flex-col py-6 px-4 gap-3">
                    <h2 className="text-2xl text-blue-800 font-bold">
                        Mon contenu
                    </h2>
                    <div className="flex flex-col px-4 gap-3">
                        <div className="flex items-center w-full justify-between">
                            <p className="text-lg">X posts</p>
                            <Link
                                to={`/profile/${user.id}/posts`}
                                className="text-center w-1/6 font-bold text-blue-800"
                            >
                                Voir
                            </Link>
                        </div>
                        <div className="flex items-center w-full justify-between">
                            <p className="text-lg">X commentaires</p>
                            <Link
                                to={`/profile/${user.id}/comments`}
                                className="text-center w-1/6 font-bold text-blue-800"
                            >
                                Voir
                            </Link>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col py-6 px-4 gap-3">
                    <h2 className="text-2xl text-blue-800 font-bold">
                        Paramètres du compte
                    </h2>
                    <div className="flex flex-col px-4 gap-3">
                        <div className="flex items-center w-full justify-between">
                            <p className="text-lg">
                                <span>Adresse email :</span>
                                <span className="ml-10 font-bold text-blue-800">
                                    email@address.com
                                </span>
                            </p>
                            <Link
                                to={`/profile/${user.id}`}
                                className="text-center w-1/6 font-bold text-blue-800"
                            >
                                Modifier
                            </Link>
                        </div>
                        <div className="flex items-center w-full justify-between">
                            <p className="text-lg">
                                <span>Nom d'utilisateur :</span>
                                <span className="ml-10 font-bold text-blue-800">
                                    {user.username}
                                </span>
                            </p>
                            <Link
                                to={`/profile/${user.id}`}
                                className="text-center w-1/6 font-bold text-blue-800"
                            >
                                Modifier
                            </Link>
                        </div>
                    </div>{" "}
                </div>
                <div className="flex flex-col py-6 px-4 gap-3">
                    <h2 className="text-2xl text-blue-800 font-bold">
                        Sécurité
                    </h2>
                    <div className="flex flex-col px-4 gap-3">
                        <div className="flex items-center w-full justify-between">
                            <p className="text-lg">X posts</p>
                            <Link
                                to={`/profile/${user.id}`}
                                className="text-center w-1/6 font-bold text-blue-800"
                            >
                                Voir
                            </Link>
                        </div>
                        <div className="flex items-center w-full justify-between">
                            <p className="text-lg">X commentaires</p>
                            <Link
                                to={`/profile/${user.id}`}
                                className="text-center w-1/6 font-bold text-blue-800"
                            >
                                Voir
                            </Link>
                        </div>
                    </div>
                    <BlueOnClickButton
                        onClick={changePassword}
                        className="mt-4 w-1/2 self-center"
                    >
                        Changer mon mot de passe
                    </BlueOnClickButton>
                    <RedOnClickButton
                        onClick={openModal}
                        className="mt-4 w-1/2 self-center"
                    >
                        Désactiver mon compte
                    </RedOnClickButton>
                    <ConfirmDisableAccount
                        isOpen={isOpen}
                        disableAccount={disableAccount}
                        closeModal={closeModal}
                    />
                </div>
            </div>
        </section>
    );
}
