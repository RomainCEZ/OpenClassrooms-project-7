import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import BlueOnClickButton from "../../components/Buttons/OnClick/BlueOnClickButton";
import RedOnClickButton from "../../components/Buttons/OnClick/RedOnClickButton";
import { SessionContext } from "../Auth/context/SessionContext";
import ChangePassword from "./ChangePassword";
import ConfirmDisableAccount from "./ConfirmDisableAccount";

export default function UserProfile() {
    const { user } = useContext(SessionContext);
    const [disableAccountModal, setDisableAccountModal] = useState(false);
    const [changePasswordModal, setChangePasswordModal] = useState(false);
    const date = new Date(user.timestamp);

    const months = {
        1: "Janvier",
        2: "Février",
        3: "Mars",
        4: "Avril",
        5: "Mai",
        6: "Juin",
        7: "Juillet",
        8: "Août",
        9: "Septembre",
        10: "Octobre",
        11: "Novembre",
        12: "Décembre",
    };

    const accountCreationDate = `${date.getDate()} ${
        months[date.getMonth()]
    } ${date.getFullYear()}`;

    return (
        <section className="relative flex flex-col items-center bg-white w-full border border-blue-800 sm:rounded-xl overflow-clip shadow-lg">
            <div className="absolute w-full h-36 bg-blue-800 shadow-md"></div>
            <div className="flex flex-col justify-center items-center mt-16 z-10 w-36 h-36 bg-gray-100 rounded-full border-2 border-blue-800 overflow-hidden shadow-lg">
                <div className="mt-20 p-8 bg-blue-700 rounded-full shadow-lg"></div>
                <div className="mt-0.5 p-14 bg-blue-700 rounded-full shadow-lg"></div>
                <img src="" className="" />
            </div>
            <div className="flex flex-col font-bold justify-center py-6 px-3 sm:px-6 pt-0 w-full bg-white divide-blue-800 divide-y">
                <div className="p-4 mb-2">
                    <p className="mb-2 text-center text-4xl text-blue-800 font-bold">
                        {user.username}
                    </p>
                    <p className="text-center">
                        Depuis le {accountCreationDate}
                    </p>
                </div>
                <div className="flex flex-col py-8 px-2 sm:px-4 gap-3">
                    <h2 className="mb-3 text-2xl text-blue-800 font-bold">
                        Mon contenu
                    </h2>
                    <div className="flex flex-col px-2 sm:px-4 gap-3">
                        <div className="flex items-center w-full justify-between">
                            <p>{user.postsCount} publications</p>
                            <Link
                                to={`/profile/${user.id}/posts`}
                                className="text-center w-1/5 font-bold text-blue-800 hover:text-blue-600 focus:text-blue-600 active:text-blue-400"
                            >
                                Voir
                            </Link>
                        </div>
                        <div className="flex items-center w-full justify-between">
                            <p>{user.commentsCount} commentaires</p>
                            <Link
                                to={`/profile/${user.id}/comments`}
                                className="text-center w-1/5 font-bold text-blue-800 hover:text-blue-600 focus:text-blue-600 active:text-blue-400"
                            >
                                Voir
                            </Link>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col py-8 px-2 sm:px-4 gap-3">
                    <h2 className="mb-3 text-2xl text-blue-800 font-bold">
                        Paramètres du compte
                    </h2>
                    <div className="flex flex-col px-2 sm:px-4 gap-3">
                        <div className="flex items-center w-full justify-between">
                            <p className="flex flex-col sm:flex-row gap-2">
                                <span>Adresse email :</span>
                                <span className="ml-4 sm:ml-10 font-bold text-blue-800">
                                    email@address.com
                                </span>
                            </p>
                            <Link
                                to={`/profile/${user.id}`}
                                className="text-center w-1/5 font-bold text-blue-800 hover:text-blue-600 focus:text-blue-600 active:text-blue-400"
                            >
                                Modifier
                            </Link>
                        </div>
                        <div className="flex items-center w-full justify-between">
                            <p className="flex flex-col sm:flex-row gap-2">
                                <span>Nom d'utilisateur :</span>
                                <span className="ml-4 sm:ml-10 font-bold text-blue-800">
                                    {user.username}
                                </span>
                            </p>
                            <Link
                                to={`/profile/${user.id}`}
                                className="text-center w-1/5 font-bold text-blue-800 hover:text-blue-600 focus:text-blue-600 active:text-blue-400"
                            >
                                Modifier
                            </Link>
                        </div>
                    </div>{" "}
                </div>
                <div className="flex flex-col py-8 px-2 sm:px-4 gap-3">
                    <h2 className="mb-4 text-2xl text-blue-800 font-bold">
                        Sécurité
                    </h2>
                    <BlueOnClickButton
                        onClick={() => setChangePasswordModal(true)}
                        className="w-11/12 sm:w-3/5 xl:w-1/2 self-center"
                    >
                        Changer mon mot de passe
                    </BlueOnClickButton>
                    <ChangePassword
                        isOpen={changePasswordModal}
                        closeModal={() => setChangePasswordModal(false)}
                    />
                    <RedOnClickButton
                        onClick={() => setDisableAccountModal(true)}
                        className="mt-4 w-11/12 sm:w-3/5 xl:w-1/2 self-center"
                    >
                        Désactiver mon compte
                    </RedOnClickButton>
                    <ConfirmDisableAccount
                        isOpen={disableAccountModal}
                        closeModal={() => setDisableAccountModal(false)}
                    />
                </div>
            </div>
        </section>
    );
}
