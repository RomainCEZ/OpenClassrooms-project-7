import { useState, useEffect, useContext } from "react"
import BlueButton from "../../components/BlueButton"
import PostPreview from "./PostPreview"
import { Post } from "../../utils/interfaces/Post"
import { apiProvider } from "../../domain/ApiProvider"
import { SessionContext } from "../Auth/context/SessionContext"
import PostPreviewLoader from "./PostPreviewLoader"
import { Link } from "react-router-dom"

export default function PostWrap() {

    const [posts, setPosts] = useState<Post[]>([])
    const [isLoading, setIsLoading] = useState<boolean>(true)
    const { loggedIn } = useContext(SessionContext)
    
    const postsElements: JSX.Element[] = posts.map( (post: Post) => <PostPreview key={post.id} id={post.id} title={post.title} src={post.imageUrl} body={post.body} />)
    
    useEffect( () => {
        apiProvider.getAllPosts().then( postsData => {
            setPosts(postsData)
            setIsLoading(false)
        })
    }, [])

    return (
        <>
            {
                loggedIn ? 
                <BlueButton path="newPost">Nouveau post</BlueButton> : 
                <div className="flex justify-center p-2 mb-3 rounded bg-white border border-indigo-900 px-6">
                    <Link to='/login' className="text-blue-700 hover:text-blue-400 underline font-bold">Connectez-vous</Link>
                    <span>ou</span>
                    <Link to='/signup' className="text-blue-700 hover:text-blue-400 underline font-bold">enregistrez-vous</Link> pour publier votre contenu !
                </div>
            }
            <section className="flex flex-col gap-1 w-full">
                {isLoading ? <><PostPreviewLoader /><PostPreviewLoader /><PostPreviewLoader /><PostPreviewLoader /></> :
                postsElements}
            </section>
        </>
    )
}