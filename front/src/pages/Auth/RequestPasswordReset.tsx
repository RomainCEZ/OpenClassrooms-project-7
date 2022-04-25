import { useState } from "react";
import { Link } from "react-router-dom";
import FormSection from "../../components/FormSection";
import FormInput from "../../components/Inputs/FormInput";
import { authProvider } from "../../providers/AuthProvider";

export default function RequestPasswordReset() {
    const [email, setEmail] = useState("");

    function changeEmail(event: React.ChangeEvent<HTMLInputElement>) {
        const email = event.target.value;
        setEmail(email);
    }

    async function requestpasswordreset(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        try {
            await authProvider.requestpasswordreset({ email });
        } catch (error) {}
    }

    return (
        <FormSection>
            <form
                id="requestpasswordreset"
                onSubmit={requestpasswordreset}
                className="flex flex-col p-5 gap-2"
            >
                <FormInput
                    type="email"
                    name="email"
                    label="Email"
                    inputValue={email}
                    handleChange={() => changeEmail}
                    errorMessage=""
                />
                <div className="flex mx-2 mt-4">
                    <button
                        type="submit"
                        formTarget="requestpasswordreset"
                        className="btn-blue flex-grow"
                    >
                        Réinitialiser mon mot de passe
                    </button>
                </div>
                <Link to="/login" className="m-3 btn-text-blue">
                    Retour à la page de connexion.
                </Link>
            </form>
        </FormSection>
    );
}
