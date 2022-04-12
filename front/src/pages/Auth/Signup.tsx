import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { authProvider } from "../../domain/AuthProvider";
import { SessionContext } from "./context/SessionContext";

export default function Signup() {
    const signupForm = {
        email: "",
        username: "",
        password: "",
        confirmPassword: "",
    };
    const { setLoggedIn, createSession } = useContext(SessionContext);

    const [form, setForm] = useState(signupForm);
    const [formErrors, setFormErrors] = useState(signupForm);

    const resetFormErrors = () => {
        if (formErrors !== signupForm) {
            setFormErrors(signupForm);
        }
    };
    const navigate = useNavigate();

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
    async function postContent(e: React.FormEvent<HTMLFormElement>) {
        resetFormErrors();
        e.preventDefault();
        if (
            form.email &&
            form.username &&
            form.password === form.confirmPassword
        ) {
            const loginInfo = {
                email: form.email,
                username: form.username,
                password: form.password,
            };
            const signupResponse = await authProvider.signup(loginInfo);
            const loginResponse = await authProvider.login(loginInfo);
            await setLoggedIn(true);
            await createSession(loginResponse.data);
            navigate("/");
        } else {
            console.log("erreur");
        }
    }

    return (
        <section className="flex flex-col sm:w-xl sm:mx-auto content-center justify-center border bg-gray-200 border-blue-900 rounded">
            <form onSubmit={postContent} className="flex flex-col p-5 gap-2">
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
                <label
                    htmlFor="username"
                    className="flex flex-col font-bold mt-1"
                >
                    Nom d'utilisateur :
                </label>
                <input
                    name="username"
                    className="mx-2 p-2 border border-blue-900 rounded"
                    onChange={(event) => changeUsername(event)}
                    value={form.username}
                    required
                />
                <p className="mx-4 h-6 font-bold text-red-700">
                    {formErrors.username}
                </p>
                <label
                    htmlFor="password"
                    className="flex flex-col font-bold mt-1"
                >
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
                <label
                    htmlFor="confirm-password"
                    className="flex flex-col font-bold mt-1"
                >
                    Confirmez le mot de passe :
                </label>
                <input
                    type="password"
                    name="confirm-password"
                    className="mx-2 p-2 border border-blue-900 rounded"
                    onChange={(event) => changeConfirmPassword(event)}
                    value={form.confirmPassword}
                    required
                />
                <p className="mx-4 h-6 font-bold text-red-700">
                    {formErrors.confirmPassword}
                </p>
                <button className="text-white bg-blue-900 mx-2 mt-2 p-2 rounded hover:bg-blue-700 hover:shadow-sm hover:shadow-blue-800">
                    Créer un compte
                </button>
                <Link
                    to="/login"
                    className="m-3 text-blue-700 hover:text-blue-500 font-bold"
                >
                    Vous avez déjà un compte ? Cliquez ici pour vous connecter.
                </Link>
            </form>
        </section>
    );
}
