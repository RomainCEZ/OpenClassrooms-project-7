import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import SubmitButton from "../../components/Buttons/SubmitButton";
import FormSection from "../../components/FormSection";
import FormInput from "../../components/Inputs/FormInput";
import { ShowMessageOverlay } from "../../components/MessageOverlay";
import { authProvider } from "../../providers/AuthProvider";

export default function RequestPasswordReset() {
    const { setMessage } = useContext(ShowMessageOverlay);
    const [email, setEmail] = useState("");

    function changeEmail(event: React.ChangeEvent<HTMLInputElement>) {
        const email = event.target.value;
        setEmail(email);
    }

    async function requestpasswordreset(e: React.FormEvent<HTMLFormElement>) {
        try {
            await authProvider.requestpasswordreset({ email });
            setEmail("");
            setMessage("reset password");
        } catch (error) {}
    }

    return (
        <FormSection>
            <form className="flex flex-col p-5 gap-2">
                <FormInput
                    type="email"
                    name="email"
                    label="Email"
                    inputValue={email}
                    handleChange={() => changeEmail}
                    errorMessage=""
                />
                <div className="flex mx-2 mt-4">
                    <SubmitButton
                        onClick={requestpasswordreset}
                        className="btn blue flex-grow"
                    >
                        Réinitialiser mon mot de passe
                    </SubmitButton>
                </div>
                <Link to="/login" className="m-3 btn-text-blue">
                    Retour à la page de connexion.
                </Link>
            </form>
        </FormSection>
    );
}
