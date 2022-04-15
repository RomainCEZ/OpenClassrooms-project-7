import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

export default function DraftjsEditor({ editorState, setEditorState }) {
    return (
        <Editor
            editorState={editorState}
            onEditorStateChange={setEditorState}
            stripPastedStyles={true}
            textAlignment={screenLeft}
            wrapperClassName="flex flex-col bg-gray-200 min-h-[400px] rounded gap-2"
            editorClassName="editor-class px-4 bg-white border border-gray-500 rounded leading-3 flex-grow shadow-inner"
            toolbarClassName="toolbar-class bg-white border border-gray-500 rounded"
            localization={{
                locale: "fr",
            }}
            toolbar={{
                // options: "",
                inline: { inDropdown: true },
                list: { inDropdown: true },
                textAlign: { inDropdown: true },
                link: {
                    inDropdown: true,
                    className: "underline text-blue-600 bg-blue-600",
                },
                history: { inDropdown: true },
                embedded: {
                    className: undefined,
                    component: undefined,
                    popupClassName: undefined,
                    embedCallback: undefined,
                    defaultSize: {
                        height: "350",
                        width: "100%",
                    },
                },
            }}
        />
    );
}
