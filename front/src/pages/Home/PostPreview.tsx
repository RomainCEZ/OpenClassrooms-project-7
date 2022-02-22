import { Link } from "react-router-dom"

export default function PostPreview({ id, title, body }) {
    
    return (
        <Link to={`/${id}`} className="flex flex-col p-5 hover:bg-blue-200 w-full border border-indigo-900 rounded">
            <article>
                <h2 className="borderb  mb-4">{title}</h2>
                <p>{body}</p>
            </article>
        </Link>
    )
}