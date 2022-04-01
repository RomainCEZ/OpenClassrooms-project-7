import { useState, useEffect, useContext } from "react"
import Loader from "../../components/Loader"
import BlueButton from "../../components/BlueButton"
import {Post} from "../../utils/interfaces/Post"
import { apiProvider } from "../../domain/ApiProvider"
import { Link } from "react-router-dom"
import { SessionContext } from "../Auth/context/SessionContext"
import PostLoader from "./PostLoader"
import { EditorState, convertFromRaw, ContentState } from 'draft-js';
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";


export default function Thread() {
    
    const [post, setPost] = useState<Post>({id: "", title: "", body: "", editorContent: ""})
    const [isLoading, setIsLoading] = useState<boolean>(true)
    const { user } = useContext(SessionContext)
    const id = document.location.pathname.split("/")[1]

    useEffect( () => {
        apiProvider.getPostById(id).then(
            postData => {
                if (typeof postData.body === "string") {
                    const contentState = ContentState.createFromText(postData.body)
                    const editorState = EditorState.createWithContent(contentState)
                    setPost({id: postData.id, title: postData.title, body: editorState})
                } else {
                    const contentState = convertFromRaw(postData.body)
                    const editorState = EditorState.createWithContent(contentState)
                    setPost({id: postData.id, title: postData.title, body: editorState})
                }
                setIsLoading(false)
            })
            return
    }, [])

    return ( 
        <section>
            <BlueButton path="/">Retour</BlueButton>
            {isLoading ? <PostLoader /> :
            <div className="flex flex-col mt-2 p-2 sm:px-5 rounded min-h-80 h-fit bg-white border border-indigo-900 divide-blue-900 divide-y-2">
                <h2 className="text-xl font-semibold p-2 sm:px-0">{post.title}</h2>
                <div className="flex w-full p-2">
                    {post.imageUrl && <img src={post.imageUrl} className="pt-3 w-full" />}
                    <Editor
                        readOnly
                        toolbarHidden
                        textAlignment="left"
                        editorState={post.body}
                        wrapperClassName="flex flex-col h-full w-full wrapper-class bg-gray-200 "
                        editorClassName="editor-class px-3 bg-white"
                    />
                </div>
            </div>}
            {((user.id === post.userId) || user.role === "admin") &&
            <div className="flex justify-end items-center p-2 gap-2">
                <BlueButton path={`/${id}/edit`}>Éditer</BlueButton>
                <Link to="/" className="flex justify-center p-2 px-6 mb-3 rounded bg-red-900 text-white" onClick={() => apiProvider.deletePost(id)}>Supprimer</Link>
            </div>}
        </section>
    )
}