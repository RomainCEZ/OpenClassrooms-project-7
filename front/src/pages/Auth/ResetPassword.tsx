import { useState } from "react";
import { useNavigate } from "react-router-dom";
import FormSection from "../../components/FormSection";
import FormInput from "../../components/Inputs/FormInput";
import { authProvider } from "../../providers/AuthProvider";

export default function ResetPassword() {
    const navigate = useNavigate();
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
        <FormSection>
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
                    <button
                        type="submit"
                        formTarget="resetpassword"
                        className="btn-blue"
                    >
                        Réinitialiser mon mot de passe
                    </button>
                </div>
            </form>
        </FormSection>
    );
}
