import { Link } from 'react-router-dom'
import axios from "axios";
import { useState } from "react"

export default function NewPost() {

    const [form, setForm] = useState({ title: "", body: "" })
    
    function changeTitle(event: React.ChangeEvent<HTMLInputElement>) {
        const value = event.target.value
        setForm( (form: { title: String, body: String }) => ({ ...form, title: value }) )
    }

    function changeBody(event: React.ChangeEvent<HTMLTextAreaElement>) {
        const value = event.target.value
        setForm( (form: { title: String, body: String }) => ({ ...form, body: value }) )
    }

    function postContent(e) {
        e.preventDefault()
        if (form.title && form.body) {
            const postData = {
                id: Date.now(),
                title: form.title,
                body: form.body
            }
            axios.post("http://localhost:8000/api/forum/", postData).then(res => console.log(res.status))
        } else {
            console.log("erreur")
        }
    }

    return (
        <section className='flex flex-col align-center justify-center border-indigo-900 rounded'>
            <Link to="/" className="flex justify-center p-2 mb-3 rounded bg-blue-900 text-white">Retour</Link>
            <form className="flex flex-col h-80 p-4 gap-3 bg-blue-900 rounded">
                <input type="text" placeholder="Titre" className='p-2 rounded' onChange={(event) => changeTitle(event)} value={form.title} required />
                <textarea placeholder="Tapez votre message ici !" className='p-2 h-4/5 rounded' onChange={(event) => changeBody(event)} value={form.body} required />
                <button className='text-white' onClick={postContent}>Publier</button>
            </form>
        </section>
    )
}