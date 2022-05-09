import { useContext, useState } from "react";
import {
    AiFillDislike,
    AiFillLike,
    AiOutlineDislike,
    AiOutlineLike,
} from "react-icons/ai";
import { postsApiProvider } from "../../providers/PostsApiProvider";
import { UserContext } from "../Auth/context/UserContext";

export default function PostLikes({ likes, dislikes, postId }) {
    const { user } = useContext(UserContext);
    const [postLikes, setPostLikes] = useState(likes);
    const [postDislikes, setPostDislikes] = useState(dislikes);

    const handleLike = async () => {
        postLikes.includes(user.id)
            ? setPostLikes(postLikes.filter((userId) => userId !== user.id))
            : setPostLikes([...postLikes, user.id]);
        if (postDislikes.includes(user.id)) {
            setPostDislikes(
                postDislikes.filter((userId) => userId !== user.id)
            );
        }
        await postsApiProvider.likePost(postId);
    };
    const handleDislike = async () => {
        postDislikes.includes(user.id)
            ? setPostDislikes(
                  postDislikes.filter((userId) => userId !== user.id)
              )
            : setPostDislikes([...postDislikes, user.id]);
        if (postLikes.includes(user.id)) {
            setPostLikes(postLikes.filter((userId) => userId !== user.id));
        }
        await postsApiProvider.dislikePost(postId);
    };

    return (
        <div className="flex items-center ml-2 mt-3 sm:mt-2 font-bold text-blue-800 dark:text-gray-800">
            <button onClick={handleLike} className="flex p-2 btn-text-blue">
                <span className="mr-1 text-2xl">
                    {postLikes.includes(user.id) ? (
                        <AiFillLike />
                    ) : (
                        <AiOutlineLike />
                    )}
                </span>
                <span className="text-lg">{postLikes.length}</span>
            </button>
            <button
                onClick={handleDislike}
                className="flex ml-3 p-2 btn-text-red"
            >
                <span className="text-lg">{postDislikes.length}</span>
                <span className="ml-1 text-2xl">
                    {postDislikes.includes(user.id) ? (
                        <AiFillDislike />
                    ) : (
                        <AiOutlineDislike />
                    )}
                </span>
            </button>
        </div>
    );
}
