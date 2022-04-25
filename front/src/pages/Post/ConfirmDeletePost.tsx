import { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import DarkmodeWrapper from "../../components/DarkmodeWrapper";

export default function ConfirmDeletePost({ isOpen, closeModal, deletePost }) {
    return (
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
                className="flex flex-col justify-center items-center h-fit w-full sm:w-fit sm:px-20 m-auto py-14 fixed inset-0 z-10 bg-white/80 rounded border border-indigo-900"
                onClose={closeModal}
            >
                <DarkmodeWrapper>
                    <Dialog.Overlay />
                    <Dialog.Title className="font-bold mb-7">
                        Voulez-vous vraiment supprimer ce post ?
                    </Dialog.Title>
                    <div className="flex justify-center items-center w-11/12 gap-8">
                        <button onClick={deletePost} className="btn-red w-1/2">
                            Confirmer
                        </button>
                        <button onClick={closeModal} className="btn-blue w-1/2">
                            Annuler
                        </button>
                    </div>
                </DarkmodeWrapper>
            </Dialog>
        </Transition>
    );
}
