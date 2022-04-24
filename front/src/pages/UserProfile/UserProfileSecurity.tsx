import { useState } from "react";
import BlueOnClickButton from "../../components/Buttons/OnClick/BlueOnClickButton";
import RedOnClickButton from "../../components/Buttons/OnClick/RedOnClickButton";
import ChangePassword from "./ChangePassword";
import ConfirmDisableAccount from "./ConfirmDisableAccount";

export default function UserProfileSecurity() {
    const [disableAccountModal, setDisableAccountModal] = useState(false);
    const [changePasswordModal, setChangePasswordModal] = useState(false);

    return (
        <div className="flex flex-col py-8 px-2 sm:px-4 gap-3">
            <h2 className="mb-4 text-2xl text-blue-800">Sécurité</h2>
            <BlueOnClickButton
                onClick={() => setChangePasswordModal(true)}
                className="w-11/12 sm:w-3/5 xl:w-1/2 self-center"
            >
                Changer mon mot de passe
            </BlueOnClickButton>
            <ChangePassword
                isOpen={changePasswordModal}
                closeModal={() => setChangePasswordModal(false)}
            />
            <RedOnClickButton
                onClick={() => setDisableAccountModal(true)}
                className="mt-4 w-11/12 sm:w-3/5 xl:w-1/2 self-center"
            >
                Désactiver mon compte
            </RedOnClickButton>
            <ConfirmDisableAccount
                isOpen={disableAccountModal}
                closeModal={() => setDisableAccountModal(false)}
            />
        </div>
    );
}
