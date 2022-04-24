import { useContext, useState } from "react";
import { apiProvider } from "../../providers/ApiProvider";
import { Link, useNavigate } from "react-router-dom";
import { EditorState, convertToRaw } from "draft-js";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import DraftjsEditor from "../../components/Draftjs/DraftjsEditor";
import DraftjsView from "../../components/Draftjs/DraftjsView";
import { SessionContext } from "../Auth/context/SessionContext";
import ReactTimeAgo from "react-time-ago";

export default function NewPost() {
    const { user } = useContext(SessionContext);
    const [editorState, setEditorState] = useState(() =>
        EditorState.createEmpty()
    );
    const rawEditorContent = convertToRaw(editorState.getCurrentContent());
    const [title, setTitle] = useState<string>("");
    const [preview, setPreview] = useState(false);

    const navigate = useNavigate();

    function changeTitle(event: React.ChangeEvent<HTMLInputElement>) {
        setTitle(event.target.value);
    }

    async function postContent(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        if (title && editorState) {
            const post = {
                title,
                content: rawEditorContent,
            };
            await apiProvider.createPost(post);
            navigate("/");
        } else {
            console.log("erreur");
        }
    }

    return (
        <section className="flex flex-col content-center justify-center rounded">
            <Link to="/" className="btn-blue">
                Retour
            </Link>
            {preview ? (
                <div className="mt-3 p-2 sm:px-5 rounded min-h-80 h-fit bg-white border border-indigo-900 shadow-md">
                    <div className="mb-3 pb-2 border-b-2 border-indigo-900">
                        <h2 className="text-xl font-bold overflow-hidden p-2 sm:px-0 decoration-2 underline underline-offset-2 text-blue-800">
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
                <form
                    id="newpost"
                    onSubmit={postContent}
                    className="flex flex-col mt-2 p-4 gap-3 border bg-gray-200 border-blue-900 rounded shadow-md"
                >
                    <input
                        placeholder="Titre"
                        className="p-2 border border-gray-500 rounded shadow-inner"
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
                <button
                    type="submit"
                    formTarget="newpost"
                    className="btn-blue flex-grow"
                >
                    Publier
                </button>
                <button
                    onClick={() => setPreview(!preview)}
                    className="btn-white w-2/5 sm:w-1/4"
                >
                    {preview ? "Éditer" : "Aperçu"}
                </button>
            </div>
        </section>
    );
}
