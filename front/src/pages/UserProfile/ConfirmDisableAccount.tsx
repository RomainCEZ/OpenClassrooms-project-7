import { Fragment, useContext } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { SessionContext } from "../Auth/context/SessionContext";
import DarkmodeWrapper from "../../components/Darkmode/DarkmodeWrapper";
import SubmitButton from "../../components/Buttons/SubmitButton";

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
                className="flex flex-col justify-center items-center h-fit w-full sm:w-fit m-auto fixed inset-0 z-10"
                onClose={closeModal}
            >
                <DarkmodeWrapper>
                    <Dialog.Overlay />
                    <Dialog.Title className="mt-14 mb-4 font-bold text-xl">
                        Voulez-vous vraiment désactiver votre compte ?
                    </Dialog.Title>
                    <Dialog.Description className="mb-6 font-bold text-center text-xl text-red-800 dark:text-red-900">
                        Attention, cette action est définitive !
                    </Dialog.Description>
                    <div className="flex justify-center items-center w-11/12 mb-14 gap-8">
                        <SubmitButton
                            onClick={disableAccount}
                            className="btn red w-1/2"
                        >
                            Confirmer
                        </SubmitButton>
                        <button onClick={closeModal} className="btn blue w-1/2">
                            Annuler
                        </button>
                    </div>
                </DarkmodeWrapper>
            </Dialog>
        </Transition>
    );
}
