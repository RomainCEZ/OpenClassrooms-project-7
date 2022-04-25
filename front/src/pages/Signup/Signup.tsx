import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import FormSection from "../../components/FormSection";
import FormInput from "../../components/Inputs/FormInput";
import { SessionContext } from "../Auth/context/SessionContext";

export default function Signup() {
    interface ISignupForm {
        email: string;
        username: string;
        password: string;
        confirmPassword: string;
    }
    const signupForm: ISignupForm = {
        email: "",
        username: "",
        password: "",
        confirmPassword: "",
    };
    const { signup } = useContext(SessionContext);

    const [form, setForm] = useState(signupForm);
    const [formErrors, setFormErrors] = useState(signupForm);

    const resetFormErrors = () => {
        if (formErrors !== signupForm) {
            setFormErrors(signupForm);
        }
    };

    function changeEmail(event: React.ChangeEvent<HTMLInputElement>) {
        resetFormErrors();
        const value = event.target.value;
        setForm((form) => ({ ...form, email: value }));
    }
    function changeUsername(event: React.ChangeEvent<HTMLInputElement>) {
        resetFormErrors();
        const value = event.target.value;
        setForm((form) => ({ ...form, username: value }));
    }
    function changePassword(event: React.ChangeEvent<HTMLInputElement>) {
        resetFormErrors();
        const value = event.target.value;
        setForm((form) => ({ ...form, password: value }));
    }
    function changeConfirmPassword(event: React.ChangeEvent<HTMLInputElement>) {
        resetFormErrors();
        const value = event.target.value;
        setForm((form) => ({ ...form, confirmPassword: value }));
    }
    async function submitSignup(e: React.FormEvent<HTMLFormElement>) {
        resetFormErrors();
        e.preventDefault();
        if (form.password !== form.confirmPassword) {
            setFormErrors({
                ...formErrors,
                password: "Veuillez saisir 2 mots de passe identiques !",
                confirmPassword: "Veuillez saisir 2 mots de passe identiques !",
            });
            return;
        }
        try {
            const signupInfo = {
                email: form.email,
                username: form.username,
                password: form.password,
            };
            await signup(signupInfo);
        } catch (error) {
            error.message.forEach((message) => {
                switch (true) {
                    case message.includes("adresse email"):
                        setFormErrors({ ...formErrors, email: message });
                        break;
                    case message.includes("nom d'utilisateur"):
                        setFormErrors({ ...formErrors, username: message });
                        break;
                    case message.includes("mot de passe"):
                        setFormErrors({
                            ...formErrors,
                            confirmPassword: message,
                        });
                        break;
                    default:
                        return;
                }
            });
        }
    }

    return (
        <FormSection>
            <form
                id="signup"
                onSubmit={submitSignup}
                className="flex flex-col p-5 gap-2"
            >
                <FormInput
                    type="email"
                    name="email"
                    label="Email"
                    inputValue={form.email}
                    handleChange={() => changeEmail}
                    errorMessage={formErrors.email}
                />
                <FormInput
                    type=""
                    name="username"
                    label="Nom d'utilisateur"
                    inputValue={form.username}
                    handleChange={() => changeUsername}
                    errorMessage={formErrors.username}
                />
                <FormInput
                    type="password"
                    name="password"
                    label="Mot de passe"
                    inputValue={form.password}
                    handleChange={() => changePassword}
                    errorMessage=""
                />
                <FormInput
                    type="password"
                    name="confirmPassword"
                    label="Confirmez le mot de passe"
                    inputValue={form.confirmPassword}
                    handleChange={() => changeConfirmPassword}
                    errorMessage={formErrors.confirmPassword}
                />
                <div className="flex mx-2 mt-8">
                    <button
                        type="submit"
                        formTarget="signup"
                        className="btn-blue flex-grow"
                    >
                        Créer un compte
                    </button>
                </div>
                <Link to="/login" className="btn-text-blue m-3">
                    Vous avez déjà un compte ? Cliquez ici pour vous connecter.
                </Link>
            </form>
        </FormSection>
    );
}
