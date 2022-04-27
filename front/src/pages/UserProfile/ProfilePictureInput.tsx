import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useContext, useState } from "react";
import DarkmodeWrapper from "../../components/Darkmode/DarkmodeWrapper";
import { apiProvider } from "../../providers/ApiProvider";
import { SessionContext } from "../Auth/context/SessionContext";
import ProfilePictureBox from "./ProfilePictureBox";

export default function ProfilePictureInput() {
    const { user, setUser } = useContext(SessionContext);
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
    };
    return (
        <>
            <button className="mt-16 w-36 h-36" onClick={openModal}>
                <ProfilePictureBox picture={user.profilePicture} />
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
