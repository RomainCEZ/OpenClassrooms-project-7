import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import BlueFormButton from "../../components/Buttons/BlueFormButton";
import { apiProvider } from "../../domain/ApiProvider";
import { SessionContext } from "../Auth/context/SessionContext";

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
                <form onSubmit={postComment} className="flex flex-col">
                    <textarea
                        className="flex mt-4 p-3 h-20 w-full rounded-sm border border-indigo-900"
                        placeholder="Laissez un commentaire !"
                        onChange={(e) =>
                            setNewComment({ content: e.target.value })
                        }
                        value={newComment.content}
                    />
                    <BlueFormButton>Envoyer</BlueFormButton>
                </form>
            ) : (
                <p className="flex flex-col sm:flex-row items-center justify-center my-4 p-2 rounded bg-white border border-indigo-900 px-6">
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
