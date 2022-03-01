import { useState } from "react"
import { apiProvider } from "../../domain/ApiProvider";
import BlueButton from "../../components/BlueButton";
import {Post} from "../../utils/interfaces/Post";
import { useNavigate } from "react-router-dom";

export default function NewPost() {
    const [form, setForm] = useState({ title: "", body: "" })
    const navigate = useNavigate();

    function changeTitle(event: React.ChangeEvent<HTMLInputElement>) {
        const value = event.target.value
        setForm( (form: Post) => ({ ...form, title: value }) )
    }

    function changeBody(event: React.ChangeEvent<HTMLTextAreaElement>) {
        const value = event.target.value
        setForm( (form: Post) => ({ ...form, body: value }) )
    }

    async function postContent(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault()
        if (form.title && form.body) {
            const postData = {
                id: Date.now(),
                title: form.title,
                body: form.body
            }
            await apiProvider.createPost(postData)
            navigate('/');
        } else {
            console.log("erreur")
        }
    }

    return (
        <section className='flex flex-col content-center justify-center border-indigo-900 rounded'>
            <BlueButton path="/">Retour</BlueButton>
            <form onSubmit={postContent} className="flex flex-col h-80 p-4 gap-3 bg-blue-900 rounded">
                <input type="text" placeholder="Titre" className='p-2 rounded' onChange={(event) => changeTitle(event)} value={form.title} required />
                <textarea placeholder="Tapez votre message ici !" className='p-2 h-4/5 rounded' onChange={(event) => changeBody(event)} value={form.body} required />
                <button className='text-white'>Publier</button>
            </form>
        </section>
    )
}