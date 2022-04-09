import { useContext } from "react";
import ReactTimeAgo from "react-time-ago";
import { apiProvider } from "../../domain/ApiProvider";
import { SessionContext } from "../Auth/context/SessionContext";

export default function Comment({
    content,
    author,
    authorId,
    timestamp,
    deleteComment,
}) {
    const { user } = useContext(SessionContext);
    return (
        <div className="flex divide-x bg-white divide-indigo-800 border border-indigo-800 rounded-sm">
            <div className="flex flex-col items-center gap-1 p-2">
                <div
                    className="border-[16px] border-transparent border-b-blue-700
                    hover:border-b-blue-500 focus:border-b-blue-500 active:border-b-blue-400 cursor-pointer transition-all"
                ></div>
                <p>+2</p>
                <div
                    className="border-[16px] border-transparent border-t-blue-700
                    hover:border-t-blue-500 focus:border-t-blue-500 active:border-t-blue-400 cursor-pointer transition-all"
                ></div>
            </div>
            <div className="w-full flex flex-col items-around p-4 pb-0">
                <p>{content}</p>
                <div className="flex text-sm mt-auto border-t border-gray-400 pl-2 py-2 divide-x divide-gray-400">
                    <p className="first-letter:capitalize">
                        <ReactTimeAgo
                            date={timestamp}
                            locale="fr-FR"
                            className="font-bold"
                        />{" "}
                        par <span className="font-bold">{author}</span>
                    </p>
                    {(user.id === authorId || user.role === "admin") && (
                        <>
                            <button className="ml-auto px-3 font-bold text-blue-800 hover:text-blue-400 focus:text-blue-400 active:text-blue-300 underline underline-offset-2 decoration-2">
                                Éditer
                            </button>
                            <button
                                className="px-3 font-bold text-blue-800 hover:text-red-700 focus:text-red-700 active:text-red-500 underline underline-offset-2 decoration-2 border-r border-gray-500"
                                onClick={deleteComment}
                            >
                                Supprimer
                            </button>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}
