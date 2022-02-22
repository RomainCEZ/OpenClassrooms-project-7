import { useContext } from "react"
import { Link } from "react-router-dom"
import { ApiDataContext } from "../../utils/context/ApiDatas"

export default function Post() {

    const {posts} = useContext(ApiDataContext)
    const id = document.location.pathname.split("/")[1]
    console.log(id)
    const post = posts.filter( post => Number(id) === post.id).pop()

    return ( 
        <section>
            <Link to="/" className="flex justify-center p-2 mb-3 rounded bg-blue-900 text-white">Retour</Link>
            <div className="p-2 border h-80">
                <h2 className="text-xl p-2 border-b-2 border-blue-900">{post.title}</h2>
                <p className="p-3">{post.body}</p>
            </div>
        </section>
    )
}