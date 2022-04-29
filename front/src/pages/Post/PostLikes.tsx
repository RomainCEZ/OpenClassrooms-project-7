import { useContext, useState } from "react";
import {
    AiFillDislike,
    AiFillLike,
    AiOutlineDislike,
    AiOutlineLike,
} from "react-icons/ai";
import { apiProvider } from "../../providers/ApiProvider";
import { SessionContext } from "../Auth/context/SessionContext";

export default function PostLikes({ likes, dislikes, postId }) {
    const { user } = useContext(SessionContext);
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
        await apiProvider.likePost(postId);
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
        await apiProvider.dislikePost(postId);
    };

    return (
        <div className="flex items-center ml-4 mt-3 sm:mt-2 font-bold text-blue-800 dark:text-gray-800">
            <button onClick={handleLike} className="flex btn-text-blue">
                <span className="mr-1 text-3xl sm:text-[1.7rem]">
                    {postLikes.includes(user.id) ? (
                        <AiFillLike />
                    ) : (
                        <AiOutlineLike />
                    )}
                </span>
                <span className="text-xl sm:text-lg">{postLikes.length}</span>
            </button>
            <button onClick={handleDislike} className="flex ml-5 btn-text-red">
                <span className="mr-1 text-3xl sm:text-[1.7rem]">
                    {postDislikes.includes(user.id) ? (
                        <AiFillDislike />
                    ) : (
                        <AiOutlineDislike />
                    )}
                </span>
                <span className="text-xl sm:text-lg">
                    {postDislikes.length}
                </span>
            </button>
        </div>
    );
}
