import { useState, useEffect } from "react"
import Loader from "../../components/Loader"
import BlueButton from "../../components/BlueButton"
import { Post } from "../../utils/interfaces/Post"
import { apiProvider } from "../../domain/ApiProvider"
import { useNavigate } from "react-router-dom"
import { EditorState, convertToRaw, convertFromRaw, ContentState } from 'draft-js';
import DraftjsView from "../../components/Draftjs/DraftjsView"
import DraftjsEditor from "../../components/Draftjs/DraftjsEditor"


export default function EditPost() {
    const [editorState, setEditorState] = useState(
        () => EditorState.createEmpty(),
    );
    const rawEditorContent = convertToRaw(editorState.getCurrentContent())

    const [post, setPost] = useState<Post>({title: "", body: "", imageUrl: ""})
    const [form, setForm] = useState<Post>({ title: "", body: "", file: null, imageUrl: null })
    const [image, setImage] = useState(null)
    const [isLoading, setIsLoading] = useState<boolean>(true)
    const [preview, setPreview] = useState(false)

    const id = document.location.pathname.split("/")[1]
    const navigate = useNavigate()

    useEffect( () => {
        apiProvider.getPostById(id).then(
            postData => {
                setPost({
                    title: postData.title,
                    body: postData.body,
                    imageUrl: postData.imageUrl
                })
                setForm({
                    title: postData.title,
                    body: postData.body,
                    imageUrl: postData.imageUrl
                })
                setIsLoading(false)
            })
        apiProvider.getPostById(id).then(
            postData => {
                if (typeof postData.body === "string") {
                    const contentState = ContentState.createFromText(postData.body)
                    const editorState = EditorState.createWithContent(contentState)
                    setEditorState(editorState)
                    setPost({id: postData.id, title: postData.title, body: "",
                        imageUrl: postData.imageUrl})
                } else {
                    const contentState = convertFromRaw(postData.body)
                    const editorState = EditorState.createWithContent(contentState)
                    setEditorState(editorState)
                    setPost({id: postData.id, title: postData.title, body: "",
                        imageUrl: postData.imageUrl})
                }
                setIsLoading(false)
            })
            return
    }, [])
    
    function changeTitle(event: React.ChangeEvent<HTMLInputElement>) {
        const value = event.target.value
        setForm( (form: Post) => ({ ...form, title: value }) )
    }

    function changeBody(event: React.ChangeEvent<HTMLTextAreaElement>) {
        const value = event.target.value
        setForm( (form: Post) => ({ ...form, body: value }) ) 
    }

    function changeImage(event: React.ChangeEvent<HTMLInputElement>) {
        const file = event.target.files[0]
        const imageUrl = URL.createObjectURL(event.target.files[0]);
        setImage(file)
        setForm( (form: Post) => ({ ...form, imageUrl }) )
    }

    async function editPost(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        if (form.title && form.body) {
            let data = new FormData()
            data.append("data", JSON.stringify({
                title: form.title,
                body: rawEditorContent
            }))
            if (image) {
                data.append("file", image)
            }
            await apiProvider.editPost(id, data)
            navigate(`/${id}`);
        } else {
            console.log("erreur")
        }
    }
    

    return ( 
        <section>
            <BlueButton path={`/${id}`}>Retour</BlueButton>
            {isLoading && <Loader />}
            <form onSubmit={editPost} className="flex flex-col p-4 gap-3 border bg-gray-200 border-blue-900 rounded">
                <input name="title" placeholder="Titre" className='p-2 border border-blue-900 rounded'onChange={(event) => changeTitle(event)} value={form.title} required />
                <DraftjsEditor 
                    editorState={editorState}
                    setEditorState={setEditorState}
                />
                {form.imageUrl && <img src={form.imageUrl} className="pt-3 w-full" />}
                <input name="image" type="file" className="" accept="image/png, image/jpeg" onChange={(event) => changeImage(event)} />
                <div className="flex justify-between gap-2">
                    <button className='text-white bg-blue-900 p-2 w-3/4 rounded'>Éditer</button>
                    <div className='text-center flex-grow p-2 border bg-white border-blue-900 rounded cursor-pointer' onClick={() => setPreview(prevPreview => !prevPreview)}>Aperçu</div>
                </div>
            </form>
            {preview && <div className="mt-2 p-2 rounded min-h-80 h-fit bg-white border border-blue-900 divide-blue-900 divide-y-2">
                <h2 className="text-xl font-semibold p-2 border-blue-900">{form.title}</h2>
                {form.imageUrl && <img src={form.imageUrl} className="pt-3 w-full" />}
                <DraftjsView
                    editorState={editorState}
                />
            </div> }
        </section>
    )
}