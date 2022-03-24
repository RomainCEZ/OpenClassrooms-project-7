import { useState } from "react";
import BlueButton from "../../components/BlueButton";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { authProvider } from "../../domain/AuthProvider";

export default function Signup() {
    const [form, setForm] = useState({
        email: "",
        username: "",
        password: "",
        confirmPassword: "",
    });
    const {
        register,
        watch,
        handleSubmit,
        formState: { errors },
    } = useForm({
        reValidateMode: "onBlur",
        defaultValues: {
            email: "",
            username: "",
            password: "",
            confirmPassword: "",
        },
    });

    const navigate = useNavigate();

    function changeEmail(event: React.ChangeEvent<HTMLInputElement>) {
        const value = event.target.value;
        setForm((form) => ({ ...form, email: value }));
    }
    function changeUsername(event: React.ChangeEvent<HTMLInputElement>) {
        const value = event.target.value;
        setForm((form) => ({ ...form, username: value }));
    }
    function changePassword(event: React.ChangeEvent<HTMLInputElement>) {
        const value = event.target.value;
        setForm((form) => ({ ...form, password: value }));
    }
    function changeConfirmPassword(event: React.ChangeEvent<HTMLInputElement>) {
        const value = event.target.value;
        setForm((form) => ({ ...form, confirmPassword: value }));
    }
    async function postContent(e: React.FormEvent<HTMLFormElement>) {
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
            // await apiProvider.login({email: form.email, password: form.password})
            navigate("/login");
        } else {
            console.log("erreur");
        }
    }

    return (
        <section className="flex flex-col content-center justify-center border bg-gray-200 border-blue-900 rounded">
            <form onSubmit={postContent} className="flex flex-col p-4 gap-3">
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
                    {...register("username")}
                    placeholder="Nom d'utilisateur"
                    className="p-2 border border-blue-900 rounded"
                    onChange={(event) => changeUsername(event)}
                    value={form.username}
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
                <input
                    {...register("confirmPassword")}
                    type="password"
                    placeholder="Confirmez le mot de passe"
                    className="p-2 border border-blue-900 rounded"
                    onChange={(event) => changeConfirmPassword(event)}
                    value={form.confirmPassword}
                    required
                />
                <button className="text-white bg-blue-900 p-2 rounded hover:bg-blue-700 hover:shadow-sm hover:shadow-blue-800">
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
