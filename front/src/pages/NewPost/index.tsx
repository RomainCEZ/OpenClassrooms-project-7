import { useState } from "react"
import { apiProvider } from "../../domain/ApiProvider";
import BlueButton from "../../components/BlueButton";
import {Post} from "../../utils/interfaces/Post";
import { useNavigate } from "react-router-dom";
import {useForm} from "react-hook-form"
import axios from "axios";

export default function NewPost() {
    const [form, setForm] = useState({ title: "", body: "", file: null, src: null })
    const [image, setImage] = useState(null)
    const [preview, setPreview] = useState(false)
    const { register, watch, handleSubmit, formState: { errors } } = useForm({
        reValidateMode: "onBlur",
        defaultValues: {
            id: Date.now(),
            title: "",
            body: "",
            image: null
        }
     })
    
    const navigate = useNavigate();
        
    
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
        const src = URL.createObjectURL(event.target.files[0]);
        setImage(file)
        setForm( (form: Post) => ({ ...form, src }) )
    }
    async function postContent(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        if (form.title && form.body) {

                let formData = new FormData()
                formData.append("data", JSON.stringify({
                    id: Date.now(),
                    title: form.title,
                    body: form.body
                }))
                formData.append("file", image)
                await apiProvider.createPost(formData)
            
            navigate('/');
        } else {
            console.log("erreur")
        }
    }

    return (
        <section className='flex flex-col content-center justify-center rounded'>
            <BlueButton path="/">Retour</BlueButton>
            {/* <form onSubmit={postContent} className="flex flex-col p-4 gap-3 border bg-gray-300 border-blue-900 rounded"> */}
            <form onSubmit={postContent} className="flex flex-col p-4 gap-3 border bg-gray-300 border-blue-900 rounded">
                <input {...register("title")} placeholder="Titre" className='p-2 border border-blue-900 rounded'onChange={(event) => changeTitle(event)} value={form.title} required />
                <textarea {...register("body")} placeholder="Tapez votre message ici !" className='p-2 h-40 border border-blue-900 rounded' onChange={(event) => changeBody(event)} value={form.body} required />
                    <input {...register("image")} type="file" className="" accept="image/png, image/jpeg" onChange={(event) => changeImage(event)} />
                <div className="flex justify-between gap-2">
                    <button className='text-white bg-blue-900 p-2 w-3/4 rounded'>Publier</button>
                    <div className='text-center flex-grow p-2 border bg-white border-blue-900 rounded cursor-pointer' onClick={() => setPreview(prevPreview => !prevPreview)}>Aperçu</div>
                </div>
            </form>
            {preview && <div className="mt-2 p-2 rounded min-h-80 h-fit bg-white border border-indigo-900 divide-blue-900 divide-y-2">
                <h2 className="text-xl font-semibold p-2 border-blue-900">{form.title}</h2>
                {image && <img src={form.src} className="pt-3 w-full" />}
                <p className="p-3">{form.body}</p>
            </div> }       
        </section>
    )
}