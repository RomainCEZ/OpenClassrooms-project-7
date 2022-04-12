import { useContext, useState } from "react";
import { SessionContext } from "./context/SessionContext";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { authProvider } from "../../domain/AuthProvider";

export default function Login() {
    const loginForm = { email: "", password: "" };
    const [form, setForm] = useState(loginForm);
    const { loggedIn, setLoggedIn, createSession, navigate } =
        useContext(SessionContext);
    const [formErrors, setFormErrors] = useState(loginForm);
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
        resetFormErrors();
        e.preventDefault();
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
            <form onSubmit={login} className="flex flex-col p-5 gap-2">
                <label htmlFor="email" className="flex flex-col font-bold mt-1">
                    Email :
                </label>
                <input
                    type="email"
                    name="email"
                    className="mx-2 p-2 border border-blue-900 rounded"
                    onChange={(event) => changeEmail(event)}
                    value={form.email}
                    required
                />
                <p className="mx-4 h-6 font-bold text-red-700">
                    {formErrors.email}
                </p>

                <label htmlFor="password" className="flex flex-col font-bold">
                    Mot de passe :
                </label>
                <input
                    type="password"
                    name="password"
                    className="mx-2 p-2 border border-blue-900 rounded"
                    onChange={(event) => changePassword(event)}
                    value={form.password}
                    required
                />
                <p className="mx-4 h-6 font-bold text-red-700">
                    {formErrors.password}
                </p>
                <button className="text-white bg-blue-900 mx-2 mt-2 p-2 rounded hover:bg-blue-700 hover:shadow-sm hover:shadow-blue-800">
                    Se connecter
                </button>
                <Link
                    to="/signup"
                    className="m-3 text-blue-700 hover:text-blue-500 font-bold"
                >
                    Pas encore enregistré ? Cliquez ici pour créer un compte.
                </Link>
            </form>
        </section>
    );
}
