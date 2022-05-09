import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaPen } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import ConfirmDeletePost from "./ConfirmDeletePost";
import { ShowMessageOverlay } from "../../components/MessageOverlay";
import { postsApiProvider } from "../../providers/PostsApiProvider";

export default function PostButtons() {
    const { setMessage } = useContext(ShowMessageOverlay);
    const navigate = useNavigate();
    const id = document.location.pathname.split("/post/")[1];
    const [isOpen, setIsOpen] = useState(false);
    const openModal = () => {
        setIsOpen(true);
    };
    const closeModal = () => {
        setIsOpen(false);
    };
    const deletePost = async () => {
        await postsApiProvider.deletePost(id);
        navigate("/");
        setMessage("delete post");
    };

    return (
        <div className="flex justify-end items-center gap-3">
            <Link to={`/post/${id}/edit`} className="btn blue">
                <span className="flex items-center px-2 h-[30px] text-xl sm:hidden">
                    <FaPen />
                </span>
                <span className="px-10 hidden sm:block">Éditer</span>
            </Link>
            <button onClick={openModal} className="btn red">
                <span className="px-1 text-3xl sm:hidden">
                    <MdDeleteForever />
                </span>
                <span className="px-5 hidden sm:block">Supprimer</span>
            </button>
            <ConfirmDeletePost
                isOpen={isOpen}
                closeModal={closeModal}
                deletePost={deletePost}
            />
        </div>
    );
}
