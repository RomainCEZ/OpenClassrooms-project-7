import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useContext, useState } from "react";
import SubmitButton from "../../components/Buttons/SubmitButton";
import DarkmodeWrapper from "../../components/Darkmode/DarkmodeWrapper";
import FormInput from "../../components/Inputs/FormInput";
import { ShowMessageOverlay } from "../../components/MessageOverlay";
import { authApiProvider } from "../../providers/AuthApiProvider";
import { UserContext } from "../Auth/context/UserContext";

const ChangeUsername = ({ isOpen, closeModal }) => {
    const { user, setUser } = useContext(UserContext);
    const { setMessage } = useContext(ShowMessageOverlay);
    const [newUsername, setNewUsername] = useState<string>("");
    const [errorMessage, setErrorMessage] = useState("");

    const resetErrorMessage = () => {
        if (errorMessage !== "") {
            setErrorMessage("");
        }
    };

    const changeNewUsername = (e) => {
        resetErrorMessage();
        setNewUsername(e.target.value);
    };

    async function changeUsername(e: React.FormEvent<HTMLFormElement>) {
        resetErrorMessage();
        if (newUsername) {
            try {
                const responseData = await authApiProvider.changeUsername({
                    username: newUsername,
                });
                await setUser({ ...user, username: responseData.newUsername });
                closeModal();
                setMessage("change username");
            } catch (error) {
                const messages = [error.message];
                messages.forEach((message: string) => {
                    setErrorMessage(message);
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
                className="flex flex-col justify-center items-center h-fit w-full sm:w-fit m-auto fixed inset-0 z-10"
                onClose={closeModal}
            >
                <DarkmodeWrapper>
                    <Dialog.Overlay />
                    <Dialog.Title className="mt-14 mb-4 font-bold text-xl">
                        Changer mon nom d'utilisateur
                    </Dialog.Title>
                    <form className="flex flex-col w-11/12 min-w-fit sm:w-fit p-2 gap-3">
                        <FormInput
                            type="text"
                            name="username"
                            label="Nouveau nom d'utilisateur"
                            inputValue={newUsername}
                            handleChange={() => changeNewUsername}
                            errorMessage={errorMessage}
                        />
                        <SubmitButton
                            onClick={changeUsername}
                            className="btn blue mx-2 mt-4 mb-10"
                        >
                            Changer le nom d'utilisateur
                        </SubmitButton>
                    </form>
                </DarkmodeWrapper>
            </Dialog>
        </Transition>
    );
};
export default ChangeUsername;
