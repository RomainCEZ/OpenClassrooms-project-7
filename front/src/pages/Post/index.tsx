import { useState, useEffect } from "react"
import Loader from "../../components/Loader"
import BlueButton from "../../components/BlueButton"
import {Post} from "../../utils/interfaces/Post"
import { apiProvider } from "../../domain/ApiProvider"
import { Link } from "react-router-dom"

export default function Thread() {

    const [post, setPost] = useState<Post>({id: 0, title: "", body: ""})
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const id = Number(document.location.pathname.split("/")[1])



    useEffect( () => {
        setIsLoading(true)
        apiProvider.getPostById(id).then(
            postData => {
                setPost(postData)
                setIsLoading(false)
            })
    }, [])

    return ( 
        <section>
            <BlueButton path="/">Retour</BlueButton>
            {isLoading && <Loader />}
            <div className="mt-2 p-2 sm:px-5 rounded min-h-80 h-fit bg-white border border-indigo-900 divide-blue-900 divide-y-2">
                <h2 className="text-xl font-semibold p-2 sm:px-0">{post.title}</h2>
                {post.imageUrl && <img src={post.imageUrl} className="pt-3 w-full" />}
                <p className="p-2">{post.body}</p>
            </div>
            <div className="flex justify-end items-center p-2 gap-2">
                <BlueButton path={`/${id}/edit`}>Éditer</BlueButton>
                <Link to="/" className="flex justify-center p-2 px-6 mb-3 rounded bg-red-900 text-white" onClick={() => apiProvider.deletePost(id)}>Supprimer</Link>
            </div>
        </section>
    )
}