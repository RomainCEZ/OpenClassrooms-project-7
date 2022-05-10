import { Editor } from "react-draft-wysiwyg";
import { RichUtils } from "draft-js";
import { insertNewUnstyledBlock } from "draftjs-utils";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import "./DraftjsEditor.css";

export default function DraftjsEditor({ editorState, setEditorState }) {
    return (
        <Editor
            editorState={editorState}
            onEditorStateChange={setEditorState}
            stripPastedStyles={true}
            textAlignment={screenLeft}
            wrapperClassName="flex flex-col bg-gray-200 dark:bg-gray-400 min-h-[400px] rounded gap-2"
            editorClassName="px-4 bg-white border border-gray-500 rounded leading-5 flex-grow shadow-inner"
            toolbarClassName="bg-white dark:bg-gray-200 border border-gray-500 rounded"
            localization={{
                locale: "fr",
            }}
            toolbar={{
                options: [
                    "inline",
                    "blockType",
                    "fontSize",
                    "fontFamily",
                    "list",
                    "textAlign",
                    "colorPicker",
                    "link",
                    "embedded",
                    "emoji",
                    "image",
                    "remove",
                ],
                blockType: {
                    options: ["Normal", "Blockquote", "Code", "Link"],
                },
                inline: { inDropdown: true },
                list: { inDropdown: true },
                textAlign: { inDropdown: true },
                history: { inDropdown: true },
                link: {
                    showOpenOptionOnHoverme: false,
                },
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
            handleReturn={(event) => {
                // override behavior for enter key
                var newEditorState = null;
                if (event.keyCode === 13 && event.shiftKey) {
                    // with shift, make a new block
                    newEditorState = insertNewUnstyledBlock(editorState);
                } else if (event.keyCode === 13 && !event.shiftKey) {
                    // without shift, just a normal line break
                    newEditorState = RichUtils.insertSoftNewline(editorState);
                }
                if (newEditorState) {
                    setEditorState(newEditorState);
                    return true;
                }
                return false;
            }}
        />
    );
}
