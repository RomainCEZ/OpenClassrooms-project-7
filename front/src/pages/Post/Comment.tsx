import ReactTimeAgo from "react-time-ago";

export default function Comment({ content, author, timestamp }) {
    return (
        <>
            <div className="flex flex-col items-center gap-1 p-2">
                <div className="border-[16px] border-white border-b-blue-800 hover:border-b-blue-500 cursor-pointer transition-colors"></div>
                <p>+2</p>
                <div className="border-[16px] border-white border-t-blue-800 hover:border-t-blue-500 cursor-pointer transition-colors"></div>
            </div>
            <div className="w-full flex flex-col items-around p-4 pb-0">
                <p>{content}</p>
                <p className="border-t border-gray-400 text-sm mt-auto p-2 first-letter:capitalize">
                    <ReactTimeAgo
                        date={timestamp}
                        locale="fr-FR"
                        className="font-bold"
                    />{" "}
                    par <span className="font-bold">{author}</span>
                </p>
            </div>
        </>
    );
}
