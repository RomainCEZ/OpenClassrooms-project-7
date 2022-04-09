import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

export default function DraftjsView({ editorState }) {
    return (
        <Editor
            readOnly
            toolbarHidden
            editorState={editorState}
            wrapperClassName="flex flex-col w-full"
            editorClassName="p-3 pb-5 w-full leading-3"
        />
    );
}
