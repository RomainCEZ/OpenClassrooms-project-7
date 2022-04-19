import { use } from "passport";
import { useContext, useState } from "react";
import BlueFormButton from "../../components/Buttons/FormSubmit/BlueFormButton";
import FormInput from "../../components/Inputs/FormInput";
import { authProvider } from "../../providers/AuthProvider";
import { SessionContext } from "./context/SessionContext";

export default function ResetPassword() {
    const { navigate } = useContext(SessionContext);
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [formErrors, setFormErrors] = useState("");

    const resetFormErrors = () => {
        if (formErrors !== "") {
            setFormErrors("");
        }
    };
    function changePassword(event: React.ChangeEvent<HTMLInputElement>) {
        resetFormErrors();
        const value = event.target.value;
        setPassword(value);
    }
    function changeConfirmPassword(event: React.ChangeEvent<HTMLInputElement>) {
        resetFormErrors();
        const value = event.target.value;
        setConfirmPassword(value);
    }

    async function resetPassword(e: React.FormEvent<HTMLFormElement>) {
        resetFormErrors();
        e.preventDefault();
        if (password !== confirmPassword) {
            setFormErrors("Veuillez saisir 2 mots de passe identiques !");
            return;
        }
        const resetToken = new URLSearchParams(location.search).get("token");
        const userId = new URLSearchParams(location.search).get("id");
        if (resetToken && userId && password && password === confirmPassword) {
            try {
                await authProvider.resetPassword({
                    password,
                    resetToken,
                    userId,
                });
                navigate("/login");
            } catch (error) {
                const messages = [error.message];
                messages.forEach((message: string) => {
                    setFormErrors(message);
                });
            }
        }
    }
    return (
        <section className="flex flex-col sm:min-w-[540px] sm:mx-auto content-center justify-center border bg-gray-200 border-blue-900 rounded shadow-md">
            <form
                id="resetpassword"
                onSubmit={resetPassword}
                className="flex flex-col p-5 gap-2"
            >
                <FormInput
                    type="password"
                    name="password"
                    label="Nouveau mot de passe"
                    inputValue={password}
                    handleChange={() => changePassword}
                    errorMessage=""
                />
                <FormInput
                    type="password"
                    name="password"
                    label="Confirmez le nouveau mot de passe"
                    inputValue={confirmPassword}
                    handleChange={() => changeConfirmPassword}
                    errorMessage={formErrors}
                />
                <div className="flex mx-2 my-4">
                    <BlueFormButton target="resetpassword">
                        Réinitialiser mon mot de passe
                    </BlueFormButton>
                </div>
            </form>
        </section>
    );
}
