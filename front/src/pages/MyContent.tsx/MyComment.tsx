import { Link } from "react-router-dom";
import ReactTimeAgo from "react-time-ago";
import CommentLikes from "../Post/Comments/CommentLikes";

const MyComment = ({
    postId,
    postTitle,
    commentId,
    content,
    author,
    authorId,
    timestamp,
    likes,
    dislikes,
}) => {
    return (
        <>
            <Link
                to={`/post/${postId}`}
                className="mb-2 flex w-full bg-white dark:bg-gray-400 divide-indigo-800 dark:divide-gray-300 sm:border border-indigo-800 dark:border-gray-200 sm:rounded-sm shadow-md overflow-hidden"
            >
                <CommentLikes
                    commentId={commentId}
                    likes={likes}
                    dislikes={dislikes}
                />
                <div className="flex flex-col mx-auto w-[86%] sm:w-11/12 xl:w-[92.8%] py-4 px-3 sm:px-4 pb-0 break-words">
                    <p className="mb-2">{content}</p>
                    <div className="flex items-center text-sm mt-auto border-t border-gray-400 dark:border-gray-200 pl-2 py-1 sm:py-2 sm:divide-x divide-gray-400 dark:divide-gray-200">
                        <p className="first-letter:capitalize">
                            <ReactTimeAgo
                                date={timestamp}
                                locale="fr-FR"
                                className="font-bold"
                            />{" "}
                            par <span className="font-bold">{author}</span>
                        </p>
                    </div>
                </div>
            </Link>
            <div className="flex justify-between flex-wrap mb-4 px-4 font-bold text-blue-800 dark:text-gray-300 gap-2">
                <span className="">
                    Dans{" "}
                    <Link
                        to={`/post/${postId}`}
                        className="text-lg underline decoration-2 underline-offset-2 hover:text-blue-400 dark:hover:text-gray-500 active:text-blue-400 dark:active:text-gray-400"
                    >
                        {postTitle}
                    </Link>
                </span>

                <Link
                    to={`/post/${postId}`}
                    className="ml-auto underline decoration-2 underline-offset-2 hover:text-blue-500 dark:hover:text-gray-500 active:text-blue-400 dark:active:text-gray-400"
                >
                    Voir la discussion
                </Link>
            </div>
        </>
    );
};
export default MyComment;
