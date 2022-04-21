import { Link } from "react-router-dom";
import { EditorState, convertFromRaw } from "draft-js";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { useEffect, useRef, useState } from "react";
import ReactTimeAgo from "react-time-ago";
import DraftjsView from "../../components/Draftjs/DraftjsView";

export default function PostPreview({
    id,
    title,
    content,
    src,
    author,
    timestamp,
    commentsNumber,
}) {
    const [editorState, setEditorState] = useState<EditorState>(() =>
        EditorState.createEmpty()
    );
    const [height, setHeight] = useState<number>(0);
    const contentOverlay =
        height > 478
            ? `before:absolute before:bottom-4 before:left-[42%] sm:before:left-[45%] before:font-bold before:decoration-2 before:underline before:text-blue-800 before:z-20 before:content-['Afficher'] group-hover:before:text-blue-500 after:absolute after:content-[''] after:text-sm after:text-black after:bg-gradient-to-b after:from-transparent after:via-transparent after:to-white after:bottom-0 after:left-0 after:w-full after:h-1/2 after:z-10 group-hover:after:to-blue-100 group-hover:after:text-blue-600`
            : "";

    const contentRef = useRef<HTMLDivElement>(null);
    useEffect(() => {
        const contentState = convertFromRaw(content);
        setEditorState(EditorState.createWithContent(contentState));
        setTimeout(() => {
            setHeight(contentRef.current.clientHeight);
        }, 50);
        return;
    }, []);

    return (
        <Link
            to={`/post/${id}`}
            aria-label={title}
            className="group flex flex-col px-5 py-4 bg-white w-full border border-indigo-900 rounded shadow-md hover:border-blue-600 hover:shadow-blue-300/70 transition-all"
        >
            <article>
                <div className="pb-2 border-b-2 border-indigo-900 group-hover:border-indigo-600 transition-all">
                    <h2 className="flex mb-2 text-xl font-semibold decoration-2 underline underline-offset-2 break-words text-blue-800 group-hover:text-blue-500 transition-all">
                        {title}
                    </h2>
                    <p className="text-sm ml-2 group-hover:text-gray-600 transition-all first-letter:capitalize">
                        <ReactTimeAgo
                            date={timestamp}
                            locale="fr-FR"
                            className="font-bold group-hover:text-gray-600 transition-all"
                        />{" "}
                        par <span className="font-bold">{author}</span>
                    </p>
                </div>
                <div
                    ref={contentRef}
                    className={`relative max-h-[30rem] border-b border-indigo-900 group-hover:border-indigo-600 transition-all overflow-clip ${contentOverlay}`}
                >
                    {src ? (
                        <img src={src} className="pt-3 w-full object-contain" />
                    ) : (
                        <DraftjsView editorState={editorState} />
                    )}
                </div>
                <p className="text-sm px-2 pt-4 group-hover:text-gray-600 transition-all">
                    {commentsNumber > 1
                        ? `${commentsNumber} commentaires`
                        : `${commentsNumber} commentaire`}
                </p>
            </article>
        </Link>
    );
}
