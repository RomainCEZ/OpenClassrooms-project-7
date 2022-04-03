export default function Comment({ title, author }) {
    return (
        <div className="h-20 bg-white rounded">
            {title}
            {author}
        </div>
    );
}
