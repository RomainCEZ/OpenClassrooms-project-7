import { useState, useEffect, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { EditorState, convertToRaw, convertFromRaw } from "draft-js";
import DraftjsView from "../../components/Draftjs/DraftjsView";
import DraftjsEditor from "../../components/Draftjs/DraftjsEditor";
import ReactTimeAgo from "react-time-ago";
import { ShowMessageOverlay } from "../../components/MessageOverlay";
import { UserContext } from "../Auth/context/UserContext";
import SubmitButton from "../../components/Buttons/SubmitButton";
import { postsApiProvider } from "../../providers/PostsApiProvider";

export default function EditPost() {
    const { setMessage } = useContext(ShowMessageOverlay);
    const { user } = useContext(UserContext);

    const [editorState, setEditorState] = useState(() =>
        EditorState.createEmpty()
    );

    const [title, setTitle] = useState<string>("");
    const [preview, setPreview] = useState(false);

    const id = document.location.pathname.split("/")[2];
    const navigate = useNavigate();

    useEffect(() => {
        postsApiProvider.getPostById(id).then((postData) => {
            const contentState = convertFromRaw(postData.content);
            const editorState = EditorState.createWithContent(contentState);
            setEditorState(editorState);
            setTitle(postData.title);
        });
        return;
    }, []);

    function changeTitle(event: React.ChangeEvent<HTMLInputElement>) {
        setTitle(event.target.value);
    }

    async function editPost(e: React.FormEvent<HTMLFormElement>) {
        if (title) {
            const rawEditorContent = convertToRaw(
                editorState.getCurrentContent()
            );
            const post = {
                title,
                content: rawEditorContent,
            };
            await postsApiProvider.editPost(id, post);
            navigate(`/post/${id}`);
            setMessage("edit post");
        } else {
            console.log("erreur");
        }
    }

    return (
        <section>
            <Link to={`/post/${id}`} className="btn blue">
                Retour
            </Link>
            {preview ? (
                <div className="mt-3 p-2 sm:px-5 sm:rounded min-h-80 h-fit bg-white dark:bg-gray-400 sm:border border-indigo-900 shadow-md">
                    <div className="mb-3 pb-2 border-b-2 border-indigo-900 dark:border-gray-300">
                        <h2 className="text-xl font-bold overflow-hidden p-2 sm:px-0 decoration-2 underline underline-offset-2 text-blue-800 dark:text-gray-800">
                            {title}
                        </h2>
                        <p className="text-sm ml-2 first-letter:capitalize">
                            <ReactTimeAgo
                                date={Date.now()}
                                locale="fr-FR"
                                className="font-bold"
                            />{" "}
                            par{" "}
                            <span className="font-bold">{user.username}</span>
                        </p>
                    </div>
                    <DraftjsView editorState={editorState} />
                </div>
            ) : (
                <form className="flex flex-col mt-2 p-4 gap-3 sm:border shadow-md bg-gray-200 dark:bg-gray-400 border-blue-900 dark:border-gray-300 sm:rounded">
                    <input
                        name="title"
                        placeholder="Titre"
                        className="p-2 border border-blue-900 dark:border-gray-300 rounded shadow-inner"
                        onChange={(event) => changeTitle(event)}
                        value={title}
                        required
                    />
                    <DraftjsEditor
                        editorState={editorState}
                        setEditorState={setEditorState}
                    />
                </form>
            )}
            <div className="flex w-full gap-4 mt-3">
                <SubmitButton onClick={editPost} className="btn blue flex-grow">
                    Publier
                </SubmitButton>
                <button
                    onClick={() => setPreview(!preview)}
                    className="btn white w-2/5 sm:w-1/4"
                >
                    {preview ? "Éditer" : "Aperçu"}
                </button>
            </div>
        </section>
    );
}
