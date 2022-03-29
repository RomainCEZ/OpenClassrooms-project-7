import { useState, useEffect, useContext } from "react"
import Loader from "../../components/Loader"
import BlueButton from "../../components/BlueButton"
import PostPreview from "./PostPreview"
import { Post } from "../../utils/interfaces/Post"
import { apiProvider } from "../../domain/ApiProvider"
import { SessionContext } from "../Auth/context/SessionContext"

export default function PostWrap() {

    const [posts, setPosts] = useState<Post[]>([])
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const { loggedIn } = useContext(SessionContext)
    
    const postsElements: JSX.Element[] = posts.map( (post: Post) => <PostPreview key={post.id} id={post.id} title={post.title} src={post.imageUrl} body={post.body} />)
    
    useEffect( () => {
        setIsLoading(true)
        apiProvider.getAllPosts().then( postsData => {
            setPosts(postsData)
            setIsLoading(false)
        })
    }, [])

    return (
        <>
            {loggedIn && <BlueButton path="newPost">Nouveau post</BlueButton>}
            {isLoading && <Loader />}
            <section className="flex flex-col gap-1 w-full">
                {postsElements}
            </section>
        </>
    )
}