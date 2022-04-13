import { useContext, useState } from "react";
import BlueLinkButton from "../../components/Buttons/BlueLinkButton";
import { apiProvider } from "../../domain/ApiProvider";
import { SessionContext } from "../Auth/context/SessionContext";
import ConfirmDeletePost from "./ConfirmDeletePost";

export default function PostButtons() {
    const { navigate } = useContext(SessionContext);
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
            <BlueLinkButton path={`/post/${id}/edit`}>Éditer</BlueLinkButton>
            <button
                className="flex justify-center p-2 px-5 text-white font-bold rounded bg-red-800 hover:bg-red-600 hover:shadow focus:bg-red-600 focus:shadow active:bg-red-500 transition-all"
                onClick={openModal}
            >
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
