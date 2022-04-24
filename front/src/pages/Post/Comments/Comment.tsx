import { useContext, useState } from "react";
import ReactTimeAgo from "react-time-ago";
import { apiProvider } from "../../../providers/ApiProvider";
import { SessionContext } from "../../Auth/context/SessionContext";

export default function Comment({
    commentId,
    content,
    author,
    authorId,
    timestamp,
    getComments,
}) {
    const { user } = useContext(SessionContext);
    const [editing, setEditing] = useState<boolean>(false);
    const [editedComment, setEditedComment] = useState<{ content: string }>({
        content,
    });

    const editComment = async () => {
        await apiProvider.updateComment(commentId, editedComment);
        getComments();
        setEditing(false);
    };

    const cancelUpdateComment = () => {
        setEditedComment({ content });
        setEditing(false);
    };

    const deleteComment = async () => {
        await apiProvider.deleteComment(commentId);
        getComments();
    };

    return (
        <div className="flex divide-x w-full bg-white divide-indigo-800 border border-indigo-800 rounded-sm shadow-md overflow-hidden">
            <div className="flex flex-col w-[8.5%] md:w-1/12 xl:w-[7.2%] justify-center items-center gap-1 p-2">
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
            <div className="flex flex-col w-[91.5%] md:w-11/12 xl:w-[92.8%] p-4 pb-0 break-words">
                {editing ? (
                    <div className="flex relative">
                        <textarea
                            maxLength={255}
                            className="flex-grow mb-2 p-2 rounded-sm border border-indigo-900 shadow-inner"
                            placeholder="Laissez un commentaire !"
                            onChange={(e) =>
                                setEditedComment({
                                    content: e.target.value,
                                })
                            }
                            value={editedComment.content}
                        />{" "}
                        <p className="absolute right-4 bottom-2 select-none text-gray-600">
                            {editedComment.content.length}/255
                        </p>
                    </div>
                ) : (
                    <p className="mb-2">{content}</p>
                )}
                <div className="flex text-sm mt-auto border-t border-gray-400 pl-2 py-2 divide-x divide-gray-400">
                    <p className="first-letter:capitalize">
                        <ReactTimeAgo
                            date={timestamp}
                            locale="fr-FR"
                            className="font-bold"
                        />{" "}
                        par <span className="font-bold">{author}</span>
                    </p>
                    {(user.id === authorId || user.role === "admin") &&
                        (editing ? (
                            <>
                                <button
                                    onClick={editComment}
                                    className="btn-text-blue ml-auto px-4 underline underline-offset-2 decoration-2"
                                >
                                    Valider
                                </button>
                                <button
                                    className="btn-text-blue px-4 underline underline-offset-2 decoration-2"
                                    onClick={cancelUpdateComment}
                                >
                                    Annuler
                                </button>
                            </>
                        ) : (
                            <>
                                <button
                                    onClick={() => setEditing(true)}
                                    className="btn-text-blue ml-auto px-5 underline underline-offset-2 decoration-2"
                                >
                                    Éditer
                                </button>
                                <button
                                    className="btn-text-blue px-3 underline underline-offset-2 decoration-2"
                                    onClick={deleteComment}
                                >
                                    Supprimer
                                </button>
                            </>
                        ))}
                </div>
            </div>
        </div>
    );
}
