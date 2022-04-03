import { Link } from "react-router-dom";
import { EditorState, convertFromRaw, ContentState } from "draft-js";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { useEffect, useState } from "react";
import ReactTimeAgo from "react-time-ago";
import DraftjsView from "../../components/Draftjs/DraftjsView";

export default function PostPreview({
    id,
    title,
    body,
    src,
    author,
    timestamp,
}) {
    const [editorState, setEditorState] = useState(() =>
        EditorState.createEmpty()
    );

    useEffect(() => {
        if (typeof body === "string") {
            const contentState = ContentState.createFromText(body);
            setEditorState(EditorState.createWithContent(contentState));
        } else {
            const contentState = convertFromRaw(body);
            setEditorState(EditorState.createWithContent(contentState));
        }

        return;
    }, []);
    return (
        <Link
            to={`/post/${id}`}
            className="group flex flex-col px-5 py-4 bg-white w-full border border-indigo-900 rounded hover:border-indigo-700 hover:shadow hover:shadow-indigo-500 transition-all"
        >
            <article>
                <div className="mb-3 pb-2 border-b-2 border-indigo-900 group-hover:border-indigo-600 transition-all">
                    <h2 className="mb-2 text-lg font-semibold decoration-2 underline underline-offset-2  text-blue-800 group-hover:text-blue-500 transition-all">
                        {title}
                    </h2>
                    <p className="text-sm ml-2 group-hover:text-gray-600 transition-all">
                        <ReactTimeAgo
                            date={timestamp}
                            locale="fr-FR"
                            className="font-bold group-hover:text-gray-600 transition-all"
                        />{" "}
                        par <span className="font-bold">{author}</span>
                    </p>
                </div>
                <div className="pb-2 border-b-[1px] border-indigo-900 group-hover:border-indigo-600 transition-all">
                    {src ? (
                        <img src={src} className="pt-3 w-full object-contain" />
                    ) : (
                        <DraftjsView editorState={editorState} />
                    )}
                </div>
                <p className="text-sm px-2 pt-4 group-hover:text-gray-600 transition-all">
                    x commentaires
                </p>
            </article>
        </Link>
    );
}
