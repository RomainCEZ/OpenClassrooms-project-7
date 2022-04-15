import { useContext, useState } from "react";
import { SessionContext } from "../Auth/context/SessionContext";
import { Link } from "react-router-dom";
import { authProvider } from "../../domain/AuthProvider";
import BlueFormButton from "../../components/Buttons/FormSubmit/BlueFormButton";
import FormInput from "../../components/Inputs/FormInput";

export default function Login() {
    interface ILoginForm {
        email: string;
        password: string;
    }
    const loginForm: ILoginForm = { email: "", password: "" };
    const [form, setForm] = useState(loginForm);
    const [formErrors, setFormErrors] = useState(loginForm);
    const { setLoggedIn, createSession, navigate } = useContext(SessionContext);

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
    async function login(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        resetFormErrors();
        try {
            const loginInfo = {
                email: form.email,
                password: form.password,
            };
            const loginResponse = await authProvider.login(loginInfo);
            await setLoggedIn(true);
            await createSession(loginResponse.data);
            navigate("/");
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
        <section className="flex flex-col sm:w-xl sm:mx-auto content-center justify-center border bg-gray-200 border-blue-900 rounded">
            <form
                id="login"
                onSubmit={login}
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
                    type="password"
                    name="password"
                    label="Mot de passe"
                    inputValue={form.password}
                    handleChange={() => changePassword}
                    errorMessage={formErrors.password}
                />
                <div className="flex mx-2 mt-4">
                    <BlueFormButton target="login">Se connecter</BlueFormButton>
                </div>
                <Link
                    to="/signup"
                    className="m-3 text-blue-700 hover:text-blue-400 font-bold"
                >
                    Pas encore enregistré ? Cliquez ici pour créer un compte.
                </Link>
            </form>
        </section>
    );
}
