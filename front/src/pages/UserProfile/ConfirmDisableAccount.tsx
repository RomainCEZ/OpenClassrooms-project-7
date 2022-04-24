import { Fragment, useContext } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { SessionContext } from "../Auth/context/SessionContext";

export default function ConfirmDisableAccount({ isOpen, closeModal }) {
    const { disableAccount } = useContext(SessionContext);

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
                className="flex flex-col justify-center items-center h-fit w-full px-6 sm:w-fit sm:px-20 m-auto py-14 fixed inset-0 z-10 bg-white/90 rounded border border-indigo-900 shadow-xl"
                onClose={closeModal}
            >
                <Dialog.Overlay />
                <Dialog.Title className="mb-4 font-bold text-xl">
                    Voulez-vous vraiment désactiver votre compte ?
                </Dialog.Title>
                <Dialog.Description className="mb-6 font-bold text-xl text-red-800">
                    Attention, cette action est définitive !
                </Dialog.Description>
                <div className="flex justify-center items-center w-11/12 gap-8">
                    <button onClick={disableAccount} className="btn-red w-1/2">
                        Confirmer
                    </button>
                    <button onClick={closeModal} className="btn-blue w-1/2">
                        Annuler
                    </button>
                </div>
            </Dialog>
        </Transition>
    );
}
