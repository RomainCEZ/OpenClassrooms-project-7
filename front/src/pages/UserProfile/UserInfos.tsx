import { useContext, useState } from "react";
import { UserContext } from "../Auth/context/UserContext";
import ChangeUsername from "./ChangeUsername";

export default function UserInfos() {
    const { user } = useContext(UserContext);
    const [changeUsernameModal, setChangeUsernameModal] = useState(false);

    return (
        <div className="flex flex-col py-8 px-2 sm:px-4 gap-3">
            <h2 className="mb-2 text-2xl text-blue-800 dark:text-gray-800">
                Paramètres du compte
            </h2>
            <div className="flex flex-col px-2 sm:px-4 gap-3">
                <div className="flex items-center w-full justify-between">
                    <p className="flex flex-col sm:flex-row gap-2">
                        <span>Adresse email :</span>
                        <span className="ml-4 text-blue-800 dark:text-gray-800">
                            {user.email}
                        </span>
                    </p>
                </div>
                <div className="flex items-center w-full justify-between">
                    <p className="flex flex-col sm:flex-row gap-2">
                        <span>Nom d'utilisateur :</span>
                        <span className="ml-4 text-blue-800 dark:text-gray-800">
                            {user.username}
                        </span>
                    </p>
                    <button
                        onClick={() => setChangeUsernameModal(true)}
                        className="text-center w-1/5 btn-text-blue"
                    >
                        Modifier
                    </button>
                </div>
                {changeUsernameModal && (
                    <ChangeUsername
                        isOpen={changeUsernameModal}
                        closeModal={() => setChangeUsernameModal(false)}
                    />
                )}
            </div>
        </div>
    );
}
