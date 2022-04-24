import { useContext } from "react";
import { Link } from "react-router-dom";
import { SessionContext } from "../Auth/context/SessionContext";

export default function UserContent() {
    const { user } = useContext(SessionContext);

    return (
        <div className="flex flex-col py-8 px-2 sm:px-4 gap-3">
            <h2 className="mb-2 text-2xl text-blue-800">Mon contenu</h2>
            <div className="flex flex-col px-2 sm:px-4 gap-4">
                <div className="flex items-center w-full justify-between">
                    <p>{user.postsCount} publications</p>
                    <Link
                        to={`/profile/${user.id}/posts`}
                        className="text-center w-1/5 text-blue-800 hover:text-blue-600 focus:text-blue-600 active:text-blue-400"
                    >
                        Voir
                    </Link>
                </div>
                <div className="flex items-center w-full justify-between">
                    <p>{user.commentsCount} commentaires</p>
                    <Link
                        to={`/profile/${user.id}/comments`}
                        className="text-center w-1/5 text-blue-800 hover:text-blue-600 focus:text-blue-600 active:text-blue-400"
                    >
                        Voir
                    </Link>
                </div>
            </div>
        </div>
    );
}
