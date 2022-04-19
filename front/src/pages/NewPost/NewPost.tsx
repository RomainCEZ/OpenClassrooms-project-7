import { useContext, useState } from "react";
import { apiProvider } from "../../providers/ApiProvider";
import BlueLinkButton from "../../components/Buttons/Link/BlueLinkButton";
import { PostProps } from "../../utils/interfaces/PostProps";
import { useNavigate } from "react-router-dom";
import { EditorState, convertToRaw } from "draft-js";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import DraftjsEditor from "../../components/Draftjs/DraftjsEditor";
import DraftjsView from "../../components/Draftjs/DraftjsView";
import BlueFormButton from "../../components/Buttons/FormSubmit/BlueFormButton";
import { SessionContext } from "../Auth/context/SessionContext";
import ReactTimeAgo from "react-time-ago";
import WhiteOnClickButton from "../../components/Buttons/OnClick/WhiteOnClickButton";

export default function NewPost() {
    const { user } = useContext(SessionContext);
    const [editorState, setEditorState] = useState(() =>
        EditorState.createEmpty()
    );
    const rawEditorContent = convertToRaw(editorState.getCurrentContent());
    const [form, setForm] = useState<PostProps>({
        title: "",
        content: "",
        file: null,
        imageUrl: null,
    });
    const [image, setImage] = useState(null);
    const [preview, setPreview] = useState(false);

    const navigate = useNavigate();

    function changeTitle(event: React.ChangeEvent<HTMLInputElement>) {
        const value = event.target.value;
        setForm((form: PostProps) => ({ ...form, title: value }));
    }

    function changeBody(event: React.ChangeEvent<HTMLTextAreaElement>) {
        const value = event.target.value;
        setForm((form: PostProps) => ({ ...form, content: editorState }));
    }

    function changeImage(event: React.ChangeEvent<HTMLInputElement>) {
        const file = event.target.files[0];
        const src = URL.createObjectURL(event.target.files[0]);
        setImage(file);
        setForm((form: PostProps) => ({ ...form, src }));
    }
    async function postContent(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        if (form.title && editorState) {
            let formData = new FormData();
            formData.append(
                "data",
                JSON.stringify({
                    title: form.title,
                    content: rawEditorContent,
                })
            );
            formData.append("file", image);
            await apiProvider.createPost(formData);
            navigate("/");
        } else {
            console.log("erreur");
        }
    }

    return (
        <section className="flex flex-col content-center justify-center rounded">
            <BlueLinkButton path="/">Retour</BlueLinkButton>
            {preview ? (
                <div className="mt-3 p-2 sm:px-5 rounded min-h-80 h-fit bg-white border border-indigo-900 shadow-md">
                    <div className="mb-3 pb-2 border-b-2 border-indigo-900">
                        <h2 className="text-xl font-bold overflow-hidden p-2 sm:px-0 decoration-2 underline underline-offset-2 text-blue-800">
                            {form.title}
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
                    {image && (
                        <img src={form.imageUrl} className="pt-3 w-full" />
                    )}
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
                        value={form.title}
                        required
                    />
                    <DraftjsEditor
                        editorState={editorState}
                        setEditorState={setEditorState}
                    />{" "}
                    {/* <input
                        type="file"
                        className=""
                        accept="image/png, image/jpeg"
                        onChange={(event) => changeImage(event)}
                    /> */}
                </form>
            )}
            <div className="flex w-full gap-4 mt-3">
                <BlueFormButton target="newpost">Publier</BlueFormButton>
                <WhiteOnClickButton onClick={() => setPreview(!preview)}>
                    {preview ? "Éditer" : "Aperçu"}
                </WhiteOnClickButton>
            </div>
        </section>
    );
}
