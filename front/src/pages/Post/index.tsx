import { useState, useEffect } from "react"
import Loader from "../../components/Loader"
import BlueButton from "../../components/BlueButton"
import {Post} from "../../utils/interfaces/Post"
import { apiProvider } from "../../domain/ApiProvider"

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
            <div className="p-2 rounded h-80 bg-white border border-indigo-900">
                <h2 className="text-xl font-semibold p-2 border-b-2 border-blue-900">{post.title}</h2>
                <p className="p-3">{post.body}</p>
            </div>
        </section>
    )
}