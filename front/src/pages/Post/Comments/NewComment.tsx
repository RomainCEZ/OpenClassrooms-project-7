import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { apiProvider } from "../../../providers/ApiProvider";
import { SessionContext } from "../../Auth/context/SessionContext";

export default function NewComment({ postId, getComments }) {
    const { loggedIn } = useContext(SessionContext);
    const [newComment, setNewComment] = useState({ content: "" });

    const postComment = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        await apiProvider.createComment(postId, newComment);
        getComments();
        setNewComment({ content: "" });
    };
    return (
        <>
            {loggedIn ? (
                <form
                    id="newcomment"
                    onSubmit={postComment}
                    className="flex flex-col"
                >
                    <div className="relative mt-10 shadow-md">
                        <p className="absolute right-4 bottom-1 select-none text-gray-700">
                            {newComment.content.length}/255
                        </p>
                        <textarea
                            id="newcomment"
                            maxLength={255}
                            className="flex p-3 h-20 w-full rounded-sm border border-indigo-900 shadow-inner"
                            placeholder="Laissez un commentaire !"
                            onChange={(e) =>
                                setNewComment({ content: e.target.value })
                            }
                            value={newComment.content}
                        />
                    </div>
                    <div className="ml-auto m-2">
                        <button type="submit" className="btn-blue px-7">
                            Envoyer
                        </button>
                    </div>
                </form>
            ) : (
                <p className="flex flex-col sm:flex-row items-center justify-center my-4 p-2 rounded bg-white border border-indigo-900 px-6 shadow-md">
                    <span>
                        <Link
                            to="/login"
                            className="text-blue-700 hover:text-blue-400 underline font-bold transition-all"
                        >
                            Connectez-vous
                        </Link>
                        &nbsp;ou&nbsp;
                        <Link
                            to="/signup"
                            className="text-blue-700 hover:text-blue-400 underline font-bold transition-all"
                        >
                            enregistrez-vous
                        </Link>
                    </span>
                    &nbsp;pour laisser un commentaire !
                </p>
            )}
        </>
    );
}
