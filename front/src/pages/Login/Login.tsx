import { useContext, useState } from "react";
import { SessionContext } from "../Auth/context/SessionContext";
import { Link } from "react-router-dom";
import FormInput from "../../components/Inputs/FormInput";
import FormSection from "../../components/FormSection";
import SubmitButton from "../../components/Buttons/SubmitButton";

export default function Login() {
    interface ILoginForm {
        email: string;
        password: string;
    }
    const loginForm: ILoginForm = { email: "", password: "" };
    const [form, setForm] = useState(loginForm);
    const [formErrors, setFormErrors] = useState(loginForm);
    const { login } = useContext(SessionContext);

    const resetFormErrors = () => {
        if (formErrors !== loginForm) {
            setFormErrors(loginForm);
        }
    };

    function changeEmail(event: React.ChangeEvent<HTMLInputElement>) {
        resetFormErrors();
        const value = event.target.value;
        setForm((form) => ({ ...form, email: value }));
    }
    function changePassword(event: React.ChangeEvent<HTMLInputElement>) {
        resetFormErrors();
        const value = event.target.value;
        setForm((form) => ({ ...form, password: value }));
    }
    async function submitLogin(e: React.FormEvent<HTMLFormElement>) {
        resetFormErrors();
        try {
            const loginInfo = {
                email: form.email,
                password: form.password,
            };
            await login(loginInfo);
        } catch (error) {
            if (error.statusCode === 401) {
                setFormErrors({
                    ...formErrors,
                    password: `*${error.message}*`,
                });
            }
            if (error.statusCode === 404) {
                setFormErrors({ ...formErrors, email: `*${error.message}*` });
            }
        }
    }

    return (
        <FormSection>
            <form className="flex flex-col p-5 gap-2">
                <FormInput
                    type="email"
                    name="email"
                    label="Email"
                    inputValue={form.email}
                    handleChange={() => changeEmail}
                    errorMessage={formErrors.email}
                />
                <FormInput
                    type="password"
                    name="password"
                    label="Mot de passe"
                    inputValue={form.password}
                    handleChange={() => changePassword}
                    errorMessage={formErrors.password}
                />
                <Link
                    to="/login/requestpasswordreset"
                    className="btn-text-blue mx-3 mt-4 mb-1"
                >
                    Mot de passe oublié ?
                </Link>
                <div className="flex mx-2">
                    <SubmitButton
                        onClick={submitLogin}
                        className="btn blue flex-grow"
                    >
                        Se connecter
                    </SubmitButton>
                </div>
                <Link to="/signup" className="btn-text-blue m-3">
                    Pas encore enregistré ? Cliquez ici pour créer un compte.
                </Link>
            </form>
        </FormSection>
    );
}
