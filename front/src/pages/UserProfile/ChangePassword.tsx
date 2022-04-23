import { Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import FormInput from "../../components/Inputs/FormInput";
import BlueFormButton from "../../components/Buttons/FormSubmit/BlueFormButton";
import { useNavigate } from "react-router-dom";
import { authProvider } from "../../providers/AuthProvider";

export default function ChangePassword({ isOpen, closeModal }) {
    const navigate = useNavigate();

    const [previousPassword, setPreviousPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmNewPassword, setNewConfirmPassword] = useState("");
    const [formErrors, setFormErrors] = useState("");

    const resetFormErrors = () => {
        if (formErrors !== "") {
            setFormErrors("");
        }
    };

    function changePreviousPassword(
        event: React.ChangeEvent<HTMLInputElement>
    ) {
        resetFormErrors();
        const value = event.target.value;
        setPreviousPassword(value);
    }
    function changeNewPassword(event: React.ChangeEvent<HTMLInputElement>) {
        resetFormErrors();
        const value = event.target.value;
        setNewPassword(value);
    }
    function changeNewConfirmPassword(
        event: React.ChangeEvent<HTMLInputElement>
    ) {
        resetFormErrors();
        const value = event.target.value;
        setNewConfirmPassword(value);
    }

    async function changePassword(e: React.FormEvent<HTMLFormElement>) {
        resetFormErrors();
        e.preventDefault();
        if (newPassword !== confirmNewPassword) {
            setFormErrors("Veuillez saisir 2 mots de passe identiques !");
            return;
        }
        const resetToken = new URLSearchParams(location.search).get("token");
        const userId = new URLSearchParams(location.search).get("id");
        if (
            resetToken &&
            userId &&
            newPassword &&
            newPassword === confirmNewPassword
        ) {
            try {
                await authProvider.changePassword({
                    previousPassword,
                    newPassword,
                    userId,
                });
            } catch (error) {
                const messages = [error.message];
                messages.forEach((message: string) => {
                    setFormErrors(message);
                });
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
                className="flex flex-col justify-center items-center h-fit w-full px-6 sm:w-fit sm:px-20 m-auto pt-14 fixed inset-0 z-10 bg-white/90 rounded border border-indigo-900 shadow-xl"
                onClose={closeModal}
            >
                <Dialog.Overlay />
                <Dialog.Title className="mb-4 font-bold text-xl">
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
                        label="Ancien mot de passe"
                        inputValue={previousPassword}
                        handleChange={() => changePreviousPassword}
                        errorMessage=""
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
                        errorMessage={formErrors}
                    />
                    <BlueFormButton
                        target="resetpassword"
                        className="mx-2 my-10"
                    >
                        Changer le mot de passe
                    </BlueFormButton>
                </form>
            </Dialog>
        </Transition>
    );
}
