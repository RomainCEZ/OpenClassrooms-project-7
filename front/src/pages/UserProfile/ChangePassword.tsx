import { Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import FormInput from "../../components/Inputs/FormInput";
import { authProvider } from "../../providers/AuthProvider";
import DarkmodeWrapper from "../../components/DarkmodeWrapper";

export default function ChangePassword({ isOpen, closeModal }) {
    const [currentPassword, setCurrentPassword] = useState<string>("");
    const [newPassword, setNewPassword] = useState<string>("");
    const [confirmNewPassword, setNewConfirmPassword] = useState<string>("");
    const [formErrors, setFormErrors] = useState({
        currentPassword: "",
        newPassword: "",
    });

    const resetFormErrors = () => {
        if (formErrors !== { currentPassword: "", newPassword: "" }) {
            setFormErrors({ currentPassword: "", newPassword: "" });
        }
    };

    function changeCurrentPassword(event: React.ChangeEvent<HTMLInputElement>) {
        resetFormErrors();
        setCurrentPassword(event.target.value);
    }
    function changeNewPassword(event: React.ChangeEvent<HTMLInputElement>) {
        resetFormErrors();
        setNewPassword(event.target.value);
    }
    function changeNewConfirmPassword(
        event: React.ChangeEvent<HTMLInputElement>
    ) {
        resetFormErrors();
        setNewConfirmPassword(event.target.value);
    }

    async function changePassword(e: React.FormEvent<HTMLFormElement>) {
        resetFormErrors();
        e.preventDefault();
        if (newPassword !== confirmNewPassword) {
            setFormErrors({
                ...formErrors,
                newPassword: "Veuillez saisir 2 mots de passe identiques !",
            });
            return;
        }
        if (
            currentPassword &&
            newPassword &&
            newPassword === confirmNewPassword
        ) {
            try {
                await authProvider.changePassword({
                    currentPassword,
                    newPassword,
                });
                closeModal();
            } catch (error) {
                if (error.statusCode === 401) {
                    setFormErrors({
                        ...formErrors,
                        currentPassword: error.message,
                    });
                } else {
                    const messages = [error.message];
                    messages.forEach((message: string) => {
                        setFormErrors({ ...formErrors, newPassword: message });
                    });
                }
            }
        }
    }

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
                        Changement de mot de passe
                    </Dialog.Title>
                    <form
                        id="resetpassword"
                        onSubmit={changePassword}
                        className="flex flex-col p-2 gap-2"
                    >
                        <FormInput
                            type="password"
                            name="password"
                            label="Mot de passe actuel"
                            inputValue={currentPassword}
                            handleChange={() => changeCurrentPassword}
                            errorMessage={formErrors.currentPassword}
                        />
                        <FormInput
                            type="password"
                            name="password"
                            label="Nouveau mot de passe"
                            inputValue={newPassword}
                            handleChange={() => changeNewPassword}
                            errorMessage=""
                        />
                        <FormInput
                            type="password"
                            name="password"
                            label="Confirmez le nouveau mot de passe"
                            inputValue={confirmNewPassword}
                            handleChange={() => changeNewConfirmPassword}
                            errorMessage={formErrors.newPassword}
                        />
                        <button type="submit" className="btn-blue mx-2 my-10">
                            Changer le mot de passe
                        </button>
                    </form>
                </DarkmodeWrapper>
            </Dialog>
        </Transition>
    );
}
