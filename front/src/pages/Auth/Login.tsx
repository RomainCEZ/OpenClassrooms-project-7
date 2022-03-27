import { useContext, useState } from "react";
import { SessionContext } from "./context/SessionContext";
import BlueButton from "../../components/BlueButton";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { authProvider } from "../../domain/AuthProvider";

export default function Login() {
    const [form, setForm] = useState({ email: "", password: "" });
    const { loggedIn, setLoggedIn, createSession } = useContext(SessionContext);
    const {
        register,
        watch,
        handleSubmit,
        formState: { errors },
    } = useForm({
        reValidateMode: "onBlur",
        defaultValues: {
            email: "",
            password: "",
        },
    });

    const navigate = useNavigate();

    function changeEmail(event: React.ChangeEvent<HTMLInputElement>) {
        const value = event.target.value;
        setForm((form) => ({ ...form, email: value }));
    }
    function changePassword(event: React.ChangeEvent<HTMLInputElement>) {
        const value = event.target.value;
        setForm((form) => ({ ...form, password: value }));
    }
    async function postContent(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        if (form.email && form.password) {
            const loginInfo = {
                email: form.email,
                password: form.password,
            };
            const loginResponse = await authProvider.login(loginInfo);
            await setLoggedIn(true);
            await createSession(loginResponse.data);
            navigate("/");
        } else {
            console.log("erreur");
        }
    }

    return (
        <section className="flex flex-col content-center justify-center rounded">
            <form
                onSubmit={postContent}
                className="flex flex-col p-4 gap-3 border bg-gray-200 border-blue-900 rounded"
            >
                <input
                    {...register("email")}
                    type="email"
                    placeholder="Email"
                    className="p-2 border border-blue-900 rounded"
                    onChange={(event) => changeEmail(event)}
                    value={form.email}
                    required
                />
                <input
                    {...register("password")}
                    type="password"
                    placeholder="Mot de passe"
                    className="p-2 border border-blue-900 rounded"
                    onChange={(event) => changePassword(event)}
                    value={form.password}
                    required
                />
                <button className="text-white bg-blue-900 p-2 rounded hover:bg-blue-700 hover:shadow-sm hover:shadow-blue-800">
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
