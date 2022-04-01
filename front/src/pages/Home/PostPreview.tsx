import { Link } from "react-router-dom"
import { EditorState, convertFromRaw, ContentState } from 'draft-js';
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { useEffect, useState } from "react";
import DraftjsView from "../../components/Draftjs/DraftjsView";

export default function PostPreview({ id, title, body, src }) {

    const [editorState, setEditorState] = useState(
        () => EditorState.createEmpty(),
    );

    useEffect( () => {
        if (typeof body === "string") {
                    const contentState = ContentState.createFromText(body)
                    setEditorState(EditorState.createWithContent(contentState))
                } else {
                    const contentState = convertFromRaw(body)
                    setEditorState(EditorState.createWithContent(contentState))
                }
            
            return
    }, [])

    return (
        <Link to={`/${id}`} className="flex flex-col p-5 bg-white hover:bg-blue-200 w-full border border-indigo-900 rounded">
            <article>
                <h2 className="borderb text-lg font-semibold">{title}</h2>
                {src ? <img src={src} className="pt-3 cover w-full" />:
                    <DraftjsView
                        editorState={editorState}
                    />
                }
            </article>
        </Link>
    )
}