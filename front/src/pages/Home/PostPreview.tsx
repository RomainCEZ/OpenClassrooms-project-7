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
            ? `before:absolute before:bottom-4 before:left-[42%] sm:before:left-[45%] before:font-bold before:decoration-2 before:underline before:text-blue-800 dark:before:text-gray-900 before:z-20 before:content-['Afficher'] group-hover:before:text-blue-500 dark:group-hover:before:text-gray-300 after:absolute after:content-[''] after:text-sm after:text-black after:bg-gradient-to-b after:from-transparent after:via-transparent after:to-white dark:after:to-gray-400 after:bottom-0 after:left-0 after:w-full after:h-1/2 after:z-10 group-hover:after:to-blue-100 dark:group-hover:after:to-gray-700 group-hover:after:text-blue-600`
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
        <Link to={`/post/${id}`} aria-label={title}>
            <article className="group flex flex-col px-5 py-4 dark:text-gray-900 bg-white dark:bg-gray-400 dark:hover:bg-gray-600 w-full border rounded shadow-md border-blue-900 hover:border-blue-600 dark:border-gray-300 dark:hover:border-gray-100 hover:shadow-blue-300/70 dark:hover:shadow-none transition">
                <div className="pb-2 border-b-2 border-blue-900 group-hover:border-blue-600 dark:border-gray-300 dark:group-hover:border-gray-100 transition">
                    <h2 className="mb-2 text-xl font-semibold decoration-2 underline underline-offset-2 break-words text-blue-800 group-hover:text-blue-500 dark:text-gray-900 dark:group-hover:text-gray-300 transition">
                        {title}
                    </h2>
                    <p className="text-sm ml-2 first-letter:capitalize">
                        <ReactTimeAgo
                            date={timestamp}
                            locale="fr-FR"
                            className="font-bold"
                        />{" "}
                        par <span className="font-bold">{author}</span>
                    </p>
                </div>
                <div
                    ref={contentRef}
                    className={`relative max-h-[30rem] border-b border-blue-900 group-hover:border-blue-600 dark:border-gray-300 dark:group-hover:border-gray-100 transition overflow-clip ${contentOverlay}`}
                >
                    <DraftjsView editorState={editorState} />
                </div>
                <p className="text-sm px-2 pt-4 font-bold">
                    {commentsNumber > 1
                        ? `${commentsNumber} commentaires`
                        : `${commentsNumber} commentaire`}
                </p>
            </article>
        </Link>
    );
}
