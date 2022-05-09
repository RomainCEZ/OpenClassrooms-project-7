import { Link } from "react-router-dom";

export default function Error() {
    return (
        <div className="flex flex-col justify-center items-center p-10 h">
            <Link
                to="/"
                className="font-bold text-3xl mb-8 underline underline-offset-2 decoration-2
                text-blue-800 hover:text-blue-600 focus:text-blue-600 active:text-blue-500 dark:text-gray-400 dark:hover:text-gray-500 dark:active:text-gray-200 transition"
            >
                Retour à l'accueil
            </Link>
            <span className="mb-5 text-9xl font-black text-blue-800 dark:text-gray-400">
                404
            </span>
            <p className="text-4xl font-bold text-blue-800 dark:text-gray-400">
                Cette page n'existe pas !
            </p>
        </div>
    );
}
