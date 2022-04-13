import { Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";

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
                <Dialog.Overlay />
                <Dialog.Title className="font-bold mb-7">
                    Voulez-vous vraiment supprimer ce post ?
                </Dialog.Title>
                <div className="flex justify-center items-center gap-8">
                    <button
                        className="flex justify-center p-2 px-6 text-white font-bold rounded bg-red-800 hover:bg-red-600 hover:shadow focus:bg-red-600 focus:shadow active:bg-red-500 transition-all"
                        onClick={deletePost}
                    >
                        Confirmer
                    </button>
                    <button
                        className="flex justify-center p-2 px-8 text-white font-bold rounded bg-blue-700
                            hover:bg-blue-600 focus:bg-blue-600 focus:shadow active:bg-blue-500 active:shadow
                            transition-all"
                        onClick={closeModal}
                    >
                        Annuler
                    </button>
                </div>
            </Dialog>
        </Transition>
    );
}
