import { useContext, useState } from "react";
import BlueLinkButton from "../../components/Buttons/Link/BlueLinkButton";
import RedOnClickButton from "../../components/Buttons/OnClick/RedOnClickButton";
import { apiProvider } from "../../providers/ApiProvider";
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
            <RedOnClickButton onClick={openModal}>Supprimer</RedOnClickButton>
            <ConfirmDeletePost
                isOpen={isOpen}
                closeModal={closeModal}
                deletePost={deletePost}
            />
        </div>
    );
}
