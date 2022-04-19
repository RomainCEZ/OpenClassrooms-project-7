import { useState } from "react";
import { Link } from "react-router-dom";
import BlueFormButton from "../../components/Buttons/FormSubmit/BlueFormButton";
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
        <section className="flex flex-col sm:min-w-[540px] sm:mx-auto content-center justify-center border bg-gray-200 border-blue-900 rounded shadow-md">
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
                    <BlueFormButton target="requestpasswordreset">
                        Réinitialiser mon mot de passe
                    </BlueFormButton>
                </div>
                <Link
                    to="/login"
                    className="m-3 text-blue-700 hover:text-blue-400 font-bold"
                >
                    Retour à la page de connexion.
                </Link>
            </form>
        </section>
    );
}
