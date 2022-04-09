import { useState } from "react";
import { apiProvider } from "../../domain/ApiProvider";
import BlueLinkButton from "../../components/Buttons/BlueLinkButton";
import { PostProps } from "../../utils/interfaces/PostProps";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { EditorState, convertToRaw } from "draft-js";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import DraftjsEditor from "../../components/Draftjs/DraftjsEditor";
import DraftjsView from "../../components/Draftjs/DraftjsView";
import BlueFormButton from "../../components/Buttons/BlueFormButton";

export default function NewPost() {
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
    const {
        register,
        watch,
        handleSubmit,
        formState: { errors },
    } = useForm({
        reValidateMode: "onBlur",
        defaultValues: {
            title: "",
            content: "",
            image: null,
        },
    });

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
            <form
                onSubmit={postContent}
                className="flex flex-col mt-2 p-4 gap-3 border bg-gray-200 border-blue-900 rounded"
            >
                <input
                    {...register("title")}
                    placeholder="Titre"
                    className="p-2 border border-gray-500 rounded"
                    onChange={(event) => changeTitle(event)}
                    value={form.title}
                    required
                />
                <DraftjsEditor
                    editorState={editorState}
                    setEditorState={setEditorState}
                />{" "}
                <input
                    {...register("image")}
                    type="file"
                    className=""
                    accept="image/png, image/jpeg"
                    onChange={(event) => changeImage(event)}
                />
                <div className="flex w-full gap-4">
                    <BlueFormButton>Publier</BlueFormButton>
                    <div
                        className="text-center font-bold p-2 px-10 border bg-white border-blue-900 rounded cursor-pointer"
                        onClick={() =>
                            setPreview((prevPreview) => !prevPreview)
                        }
                    >
                        Aperçu
                    </div>
                </div>
            </form>

            {preview && (
                <div className="mt-2 p-2 rounded min-h-80 h-fit bg-white border border-indigo-900 divide-blue-900 divide-y-2">
                    <h2 className="text-xl font-bold p-2 border-blue-900">
                        {form.title}
                    </h2>
                    {image && (
                        <img src={form.imageUrl} className="pt-3 w-full" />
                    )}
                    <DraftjsView editorState={editorState} />
                </div>
            )}
        </section>
    );
}
