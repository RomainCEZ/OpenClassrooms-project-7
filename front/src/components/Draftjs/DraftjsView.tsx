import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import "./DraftjsEditor.css";

export default function DraftjsView({ editorState }) {
    return (
        <Editor
            readOnly
            toolbarHidden
            editorState={editorState}
            wrapperClassName="flex flex-col w-full"
            editorClassName="px-3 w-full leading-5 break-words"
        />
    );
}
