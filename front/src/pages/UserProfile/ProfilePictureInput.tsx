import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useContext, useState } from "react";
import { IoCameraReverseSharp } from "react-icons/io5";
import DarkmodeWrapper from "../../components/Darkmode/DarkmodeWrapper";
import { ShowMessageOverlay } from "../../components/MessageOverlay";
import { apiProvider } from "../../providers/ApiProvider";
import { UserContext } from "../Auth/context/UserContext";
import ProfilePictureBox from "./ProfilePictureBox";

export default function ProfilePictureInput() {
    const { setMessage } = useContext(ShowMessageOverlay);
    const { user, setUser } = useContext(UserContext);
    const [isOpen, setIsOpen] = useState(false);
    const [selectedImage, setSelectedImage] = useState("");
    const [previewImage, setPreviewImage] = useState(null);

    const openModal = () => {
        setPreviewImage(user.profilePicture);
        setIsOpen(true);
    };

    const closeModal = () => {
        setPreviewImage(null);
        setSelectedImage("");
        setIsOpen(false);
    };

    const handleFileChange = (e) => {
        const image = e.target.files[0];
        setSelectedImage(e.target.value);
        createPreview(image);
    };

    const createPreview = (image) => {
        const imageReader = new FileReader();
        imageReader.readAsDataURL(image);
        imageReader.onloadend = () => {
            setPreviewImage(imageReader.result);
        };
    };

    const uploadImage = async (e) => {
        e.preventDefault();
        if (!selectedImage) return;
        const newProfilePicture = await apiProvider.uploadProfilePicture(
            previewImage
        );
        setUser({ ...user, profilePicture: newProfilePicture });
        closeModal();
        setMessage("change profile picture");
    };
    return (
        <>
            <button
                className="group relative mt-16 w-36 h-36 rounded-full"
                onClick={openModal}
            >
                <ProfilePictureBox picture={user.profilePicture} />
                <span className="absolute ring ring-blue-800 dark:ring-gray-800 bg-white/80 dark:bg-gray-400/80 rounded-full p-0.5 text-blue-800 dark:text-gray-800 text-xl right-2.5 bottom-2.5 z-10 group-hover:scale-150 transition group-hover:opacity-0">
                    <IoCameraReverseSharp />
                </span>
            </button>
            {isOpen && (
                <Transition
                    appear
                    as={Fragment}
                    show={isOpen}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0 scale-95"
                    enterTo="opacity-100 scale-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100 scale-100"
                    leaveTo="opacity-0 scale-95"
                >
                    <Dialog
                        className="flex flex-col justify-center items-center h-fit w-full sm:w-fit m-auto fixed inset-0 z-10"
                        onClose={closeModal}
                    >
                        <DarkmodeWrapper>
                            <Dialog.Overlay />
                            <Dialog.Title className="mt-10 mb-4 font-bold text-xl">
                                Choisir une image de profil
                            </Dialog.Title>
                            <div className="h-36 w-36 rounded-full overflow-hidden mb-2 border-4 border-blue-700 dark:border-gray-800 bg-gray-200">
                                {previewImage && (
                                    <img
                                        src={previewImage}
                                        className="h-full w-full object-cover"
                                    />
                                )}
                            </div>
                            <form
                                onSubmit={uploadImage}
                                className="flex flex-col p-2"
                            >
                                <input
                                    type="file"
                                    accept="image/*"
                                    value={selectedImage}
                                    onChange={handleFileChange}
                                />
                                <button
                                    type="submit"
                                    className="btn blue mx-2 my-10"
                                >
                                    Envoyer l'image
                                </button>
                            </form>
                        </DarkmodeWrapper>
                    </Dialog>
                </Transition>
            )}
        </>
    );
}
