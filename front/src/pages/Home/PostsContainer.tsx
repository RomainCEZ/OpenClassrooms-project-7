import { useContext } from "react"
import { Link } from 'react-router-dom'
import PostPreview from "./PostPreview"
import { ApiDataContext } from "../../utils/context/ApiDatas"


export default function PostWrap() {
    const {posts} = useContext(ApiDataContext)
    const postsData: { id: number; title: string; body: string }[] = posts.map( (post: { id: number; title: string; body: string }) => <PostPreview key={post.id} id={post.id} title={post.title} body={post.body} />)

    return (
        <>
            <Link to="newpost" className="flex justify-center p-2 mb-3 rounded bg-blue-900 text-white">Nouveau Post</Link>
            <section className="flex flex-col gap-1 w-full">
                {postsData}
            </section>
        </>
    )
}