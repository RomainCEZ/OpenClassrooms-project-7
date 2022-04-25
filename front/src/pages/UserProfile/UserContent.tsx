import { useContext } from "react";
import { Link } from "react-router-dom";
import { SessionContext } from "../Auth/context/SessionContext";

export default function UserContent({ profile }) {
    const { user } = useContext(SessionContext);

    return (
        <div className="flex flex-col py-8 px-2 sm:px-4 gap-3">
            <h2 className="mb-2 text-2xl text-blue-800 dark:text-gray-800">
                Mon contenu
            </h2>
            <div className="flex flex-col px-2 sm:px-4 gap-4">
                <div className="flex items-center w-full justify-between">
                    <p>{profile.postsCount} publications</p>
                    <Link
                        to={`/profile/${user.id}/posts`}
                        className="text-center w-1/5 btn-text-blue"
                    >
                        Voir
                    </Link>
                </div>
                <div className="flex items-center w-full justify-between">
                    <p>{profile.commentsCount} commentaires</p>
                    <Link
                        to={`/profile/${user.id}/comments`}
                        className="text-center w-1/5 btn-text-blue"
                    >
                        Voir
                    </Link>
                </div>
            </div>
        </div>
    );
}
