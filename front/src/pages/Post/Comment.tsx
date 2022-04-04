import ReactTimeAgo from "react-time-ago";

export default function Comment({ content, author, timestamp }) {
    return (
        <div className="flex divide-x bg-white divide-indigo-800 border border-indigo-800 rounded-sm">
            <div className="flex flex-col items-center gap-1 p-2">
                <div
                    className="border-[16px] border-transparent border-b-blue-700
                    hover:border-b-blue-500 focus:border-b-blue-500 active:border-b-blue-400 cursor-pointer transition-all"
                ></div>
                <p>+2</p>
                <div
                    className="border-[16px] border-transparent border-t-blue-700
                    hover:border-t-blue-500 focus:border-t-blue-500 active:border-t-blue-400 cursor-pointer transition-all"
                ></div>
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
        </div>
    );
}
