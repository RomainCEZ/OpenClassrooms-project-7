import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
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
            <Link to={`/post/${id}/edit`} className="btn blue px-10 sm:w-1/4">
                Éditer
            </Link>
            <button onClick={openModal} className="btn red px-5 sm:w-1/4">
                Supprimer
            </button>
            <ConfirmDeletePost
                isOpen={isOpen}
                closeModal={closeModal}
                deletePost={deletePost}
            />
        </div>
    );
}
