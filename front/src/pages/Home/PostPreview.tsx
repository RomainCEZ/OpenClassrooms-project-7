import { Link } from "react-router-dom"

export default function PostPreview({ id, title, body, src }) {
    
    return (
        <Link to={`/${id}`} className="flex flex-col p-5 bg-white hover:bg-blue-200 w-full border border-indigo-900 rounded">
            <article>
                <h2 className="borderb text-lg font-semibold">{title}</h2>
                {src ? <img src={src} className="pt-3 cover w-full" />:
                <p className="mt-4">{body}</p>}
            </article>
        </Link>
    )
}