import { useContext, useState } from "react";
import { BsCheckLg } from "react-icons/bs";
import { FaPen } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import { TiCancel } from "react-icons/ti";
import { Link } from "react-router-dom";
import ReactTimeAgo from "react-time-ago";
import { ShowMessageOverlay } from "../../components/MessageOverlay";
import { apiProvider } from "../../providers/ApiProvider";
import { UserContext } from "../Auth/context/UserContext";
import CommentLikes from "../Post/Comments/CommentLikes";

const MyComment = ({
    postId,
    commentId,
    content,
    author,
    authorId,
    timestamp,
    likes,
    dislikes,
}) => {
    const { setMessage } = useContext(ShowMessageOverlay);
    const { user } = useContext(UserContext);
    const [editing, setEditing] = useState<boolean>(false);
    const [editedComment, setEditedComment] = useState<{ content: string }>({
        content,
    });

    const editComment = async () => {
        await apiProvider.updateComment(commentId, editedComment);
        // await getComments();
        setEditing(false);
        setMessage("edit comment");
    };

    const cancelUpdateComment = () => {
        setEditedComment({ content });
        setEditing(false);
    };

    const deleteComment = async () => {
        await apiProvider.deleteComment(commentId);
        // await getComments();
        setMessage("delete comment");
    };

    return (
        <>
            <div className="mb-2 flex w-full bg-white dark:bg-gray-400 divide-indigo-800 dark:divide-gray-300 sm:border border-indigo-800 dark:border-gray-200 sm:rounded-sm shadow-md overflow-hidden">
                <CommentLikes
                    commentId={commentId}
                    likes={likes}
                    dislikes={dislikes}
                />
                <div className="flex flex-col mx-auto w-[86%] sm:w-11/12 xl:w-[92.8%] py-4 px-3 sm:px-4 pb-0 break-words">
                    {editing ? (
                        <div className="flex relative">
                            <textarea
                                maxLength={255}
                                className="flex-grow mb-2 p-2 rounded-sm border border-indigo-900 dark:border-gray-200 shadow-inner"
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
                    <div className="flex items-center text-sm mt-auto border-t border-gray-400 dark:border-gray-200 pl-2 py-1 sm:py-2 sm:divide-x divide-gray-400 dark:divide-gray-200">
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
                                        className="btn-text-blue ml-auto mr-4 sm:mr-0"
                                    >
                                        <span className="w-10 text-2xl sm:hidden">
                                            <BsCheckLg />
                                        </span>
                                        <span className="px-4 underline underline-offset-2 decoration-2 hidden sm:block">
                                            Valider
                                        </span>
                                    </button>
                                    <button
                                        className="btn-text-blue"
                                        onClick={cancelUpdateComment}
                                    >
                                        <span className="text-4xl sm:hidden btn-text-red">
                                            <TiCancel />
                                        </span>
                                        <span className="px-4 underline underline-offset-2 decoration-2 hidden sm:block">
                                            Annuler
                                        </span>
                                    </button>
                                </>
                            ) : (
                                <>
                                    <button
                                        onClick={() => setEditing(true)}
                                        className="btn-text-blue ml-auto mr-4 sm:mr-0"
                                    >
                                        <span className="text-2xl sm:hidden">
                                            <FaPen />
                                        </span>
                                        <span className="px-5 underline underline-offset-2 decoration-2 hidden sm:block">
                                            Éditer
                                        </span>
                                    </button>
                                    <button
                                        className="btn-text-blue"
                                        onClick={deleteComment}
                                    >
                                        <span className="text-4xl sm:hidden btn-text-red">
                                            <MdDeleteForever />
                                        </span>
                                        <span className="px-3 underline underline-offset-2 decoration-2 hidden sm:block">
                                            Supprimer
                                        </span>
                                    </button>
                                </>
                            ))}
                    </div>
                </div>
            </div>
            <Link
                to={`/post/${postId}`}
                className="p-4 font-bold underline decoration-2 underline-offset-2 text-blue-800 dark:text-gray-300"
            >
                Voir la discussion
            </Link>
        </>
    );
};
export default MyComment;
