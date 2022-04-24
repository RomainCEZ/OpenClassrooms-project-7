import { useContext } from "react";
import { Link } from "react-router-dom";
import { SessionContext } from "../Auth/context/SessionContext";

export default function UserInfos() {
    const { user } = useContext(SessionContext);

    return (
        <div className="flex flex-col py-8 px-2 sm:px-4 gap-3">
            <h2 className="mb-2 text-2xl text-blue-800">
                Paramètres du compte
            </h2>
            <div className="flex flex-col px-2 sm:px-4 gap-3">
                <div className="flex items-center w-full justify-between">
                    <p className="flex flex-col sm:flex-row gap-2">
                        <span>Adresse email :</span>
                        <span className="ml-4 text-blue-800">
                            email@address.com
                        </span>
                    </p>
                    <Link
                        to={`/profile/${user.id}`}
                        className="text-center w-1/5 text-blue-800 hover:text-blue-600 focus:text-blue-600 active:text-blue-400"
                    >
                        Modifier
                    </Link>
                </div>
                <div className="flex items-center w-full justify-between">
                    <p className="flex flex-col sm:flex-row gap-2">
                        <span>Nom d'utilisateur :</span>
                        <span className="ml-4 text-blue-800">
                            {user.username}
                        </span>
                    </p>
                    <Link
                        to={`/profile/${user.id}`}
                        className="text-center w-1/5 text-blue-800 hover:text-blue-600 focus:text-blue-600 active:text-blue-400"
                    >
                        Modifier
                    </Link>
                </div>
            </div>
        </div>
    );
}
