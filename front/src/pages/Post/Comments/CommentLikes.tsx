import { useContext, useState } from "react";
import { VscTriangleDown, VscTriangleUp } from "react-icons/vsc";
import { commentsApiProvider } from "../../../providers/CommentsApiProvider";
import { UserContext } from "../../Auth/context/UserContext";

export default function CommentLikes({ commentId, likes, dislikes }) {
    const { user } = useContext(UserContext);
    const [commentLikes, setCommentLikes] = useState(likes);
    const [commentDislikes, setCommentDislikes] = useState(dislikes);
    const upvotes = commentLikes.length - commentDislikes.length;

    const handleLike = async () => {
        commentLikes.includes(user.id)
            ? setCommentLikes(
                  commentLikes.filter((userId) => userId !== user.id)
              )
            : setCommentLikes([...commentLikes, user.id]);
        if (commentDislikes.includes(user.id)) {
            setCommentDislikes(
                commentDislikes.filter((userId) => userId !== user.id)
            );
        }
        await commentsApiProvider.likeComment(commentId);
    };
    const handleDislike = async () => {
        commentDislikes.includes(user.id)
            ? setCommentDislikes(
                  commentDislikes.filter((userId) => userId !== user.id)
              )
            : setCommentDislikes([...commentDislikes, user.id]);
        if (commentLikes.includes(user.id)) {
            setCommentLikes(
                commentLikes.filter((userId) => userId !== user.id)
            );
        }
        await commentsApiProvider.dislikeComment(commentId);
    };

    return (
        <div className="flex flex-col justify-center border-r border-gray-200 items-center p-1.5">
            <button
                onClick={handleLike}
                className={`${
                    commentLikes.includes(user.id)
                        ? "text-blue-700 dark:text-gray-800 hover:text-blue-500 dark:hover:text-gray-600 active:text-blue-400 dark:active:text-gray-300"
                        : "text-blue-400/60 dark:text-gray-500 hover:text-blue-500 dark:hover:text-gray-600 active:text-blue-400 dark:active:text-gray-300"
                } cursor-pointer scale-110 text-4xl transition`}
            >
                <VscTriangleUp />
            </button>
            <span>
                {upvotes >= 1 ? "+" : ""}
                {upvotes}
            </span>
            <button
                onClick={handleDislike}
                className={`${
                    commentDislikes.includes(user.id)
                        ? "text-blue-700 dark:text-gray-800 hover:text-blue-500 dark:hover:text-gray-600 active:text-blue-400 dark:active:text-gray-300"
                        : "text-blue-400/60 dark:text-gray-500 hover:text-blue-500 dark:hover:text-gray-600 active:text-blue-400 dark:active:text-gray-300"
                } cursor-pointer scale-110 text-4xl transition`}
            >
                <VscTriangleDown />
            </button>
        </div>
    );
}
