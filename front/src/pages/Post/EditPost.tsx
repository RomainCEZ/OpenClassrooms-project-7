import { useState, useEffect, useContext } from "react";
import BlueLinkButton from "../../components/Buttons/Link/BlueLinkButton";
import { apiProvider } from "../../providers/ApiProvider";
import { useNavigate } from "react-router-dom";
import { EditorState, convertToRaw, convertFromRaw } from "draft-js";
import DraftjsView from "../../components/Draftjs/DraftjsView";
import DraftjsEditor from "../../components/Draftjs/DraftjsEditor";
import BlueFormButton from "../../components/Buttons/FormSubmit/BlueFormButton";
import ReactTimeAgo from "react-time-ago";
import { SessionContext } from "../Auth/context/SessionContext";
import WhiteOnClickButton from "../../components/Buttons/OnClick/WhiteOnClickButton";

export default function EditPost() {
    const { user } = useContext(SessionContext);

    const [editorState, setEditorState] = useState(() =>
        EditorState.createEmpty()
    );

    const [title, setTitle] = useState<string>("");
    const [preview, setPreview] = useState(false);

    const id = document.location.pathname.split("/")[2];
    const navigate = useNavigate();

    useEffect(() => {
        apiProvider.getPostById(id).then((postData) => {
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
        e.preventDefault();
        if (title) {
            const rawEditorContent = convertToRaw(
                editorState.getCurrentContent()
            );
            const post = {
                title,
                content: rawEditorContent,
            };
            await apiProvider.editPost(id, post);
            navigate(`/post/${id}`);
        } else {
            console.log("erreur");
        }
    }

    return (
        <section>
            <BlueLinkButton path={`/post/${id}`}>Retour</BlueLinkButton>
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
                    id="editpost"
                    onSubmit={editPost}
                    className="flex flex-col mt-2 p-4 gap-3 border shadow-md bg-gray-200 border-blue-900 rounded"
                >
                    <input
                        name="title"
                        placeholder="Titre"
                        className="p-2 border border-blue-900 rounded shadow-inner"
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
                <BlueFormButton target="editpost">Publier</BlueFormButton>
                <WhiteOnClickButton onClick={() => setPreview(!preview)}>
                    {preview ? "Éditer" : "Aperçu"}
                </WhiteOnClickButton>
            </div>
        </section>
    );
}
