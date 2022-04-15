import { useState, useEffect, useContext } from "react";
import BlueLinkButton from "../../components/Buttons/Link/BlueLinkButton";
import { PostProps } from "../../utils/interfaces/PostProps";
import { apiProvider } from "../../domain/ApiProvider";
import { useNavigate } from "react-router-dom";
import {
    EditorState,
    convertToRaw,
    convertFromRaw,
    ContentState,
} from "draft-js";
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
    const rawEditorContent = convertToRaw(editorState.getCurrentContent());

    const [post, setPost] = useState<PostProps>({
        title: "",
        content: "",
        imageUrl: "",
    });
    const [form, setForm] = useState<PostProps>({
        title: "",
        content: "",
        file: null,
        imageUrl: null,
    });
    const [image, setImage] = useState(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [preview, setPreview] = useState(false);

    const id = document.location.pathname.split("/")[2];
    const navigate = useNavigate();

    useEffect(() => {
        apiProvider.getPostById(id).then((postData) => {
            setPost({
                title: postData.title,
                content: postData.content,
                imageUrl: postData.imageUrl,
            });
            setForm({
                title: postData.title,
                content: postData.content,
                imageUrl: postData.imageUrl,
            });
            setIsLoading(false);
        });
        apiProvider.getPostById(id).then((postData) => {
            if (typeof postData.content === "string") {
                const contentState = ContentState.createFromText(
                    postData.content
                );
                const editorState = EditorState.createWithContent(contentState);
                setEditorState(editorState);
                setPost({
                    id: postData.id,
                    title: postData.title,
                    content: "",
                    imageUrl: postData.imageUrl,
                });
            } else {
                const contentState = convertFromRaw(postData.content);
                const editorState = EditorState.createWithContent(contentState);
                setEditorState(editorState);
                setPost({
                    id: postData.id,
                    title: postData.title,
                    content: "",
                    imageUrl: postData.imageUrl,
                });
            }
            setIsLoading(false);
        });
        return;
    }, []);

    function changeTitle(event: React.ChangeEvent<HTMLInputElement>) {
        const value = event.target.value;
        setForm((form: PostProps) => ({ ...form, title: value }));
    }

    function changeBody(event: React.ChangeEvent<HTMLTextAreaElement>) {
        const value = event.target.value;
        setForm((form: PostProps) => ({ ...form, content: value }));
    }

    function changeImage(event: React.ChangeEvent<HTMLInputElement>) {
        const file = event.target.files[0];
        const imageUrl = URL.createObjectURL(event.target.files[0]);
        setImage(file);
        setForm((form: PostProps) => ({ ...form, imageUrl }));
    }

    async function editPost(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        if (form.title && form.content) {
            let data = new FormData();
            data.append(
                "data",
                JSON.stringify({
                    title: form.title,
                    content: rawEditorContent,
                })
            );
            if (image) {
                data.append("file", image);
            }
            await apiProvider.editPost(id, data);
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
                    {form.imageUrl && (
                        <img src={form.imageUrl} className="pt-3 w-full" />
                    )}
                    <DraftjsView editorState={editorState} />
                </div>
            ) : (
                <form
                    id="editpost"
                    onSubmit={editPost}
                    className="flex flex-col mt-2 p-4 gap-3 border shadow-md bg-gray-200 border-blue-900 rounded"
                >
                    <>
                        <input
                            name="title"
                            placeholder="Titre"
                            className="p-2 border border-blue-900 rounded shadow-inner"
                            onChange={(event) => changeTitle(event)}
                            value={form.title}
                            required
                        />
                        <DraftjsEditor
                            editorState={editorState}
                            setEditorState={setEditorState}
                        />
                        {form.imageUrl && (
                            <img src={form.imageUrl} className="pt-3 w-full" />
                        )}
                        {/* <input
                            name="image"
                            type="file"
                            className=""
                            accept="image/png, image/jpeg"
                            onChange={(event) => changeImage(event)}
                        /> */}
                    </>
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
