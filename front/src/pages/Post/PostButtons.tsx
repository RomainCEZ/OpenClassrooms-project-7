import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaPen } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import { apiProvider } from "../../providers/ApiProvider";
import ConfirmDeletePost from "./ConfirmDeletePost";

export default function PostButtons() {
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
        await apiProvider.deletePost(id);
        navigate("/");
    };

    return (
        <div className="flex justify-end items-center gap-3">
            <Link to={`/post/${id}/edit`} className="btn blue sm:w-1/4">
                <span className="flex items-center px-2 h-[30px] text-xl sm:hidden">
                    <FaPen />
                </span>
                <span className="px-10 hidden sm:block">Éditer</span>
            </Link>
            <button onClick={openModal} className="btn red sm:w-1/4">
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
