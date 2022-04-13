import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import BlueFormButton from "../../components/Buttons/BlueFormButton";
import FormInput from "../../components/Inputs/FormInput";
import { authProvider } from "../../domain/AuthProvider";
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
    const { setLoggedIn, createSession, navigate } = useContext(SessionContext);

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
    async function postContent(e: React.FormEvent<HTMLFormElement>) {
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
            const loginInfo = {
                email: form.email,
                username: form.username,
                password: form.password,
            };
            await authProvider.signup(loginInfo);
            const loginResponse = await authProvider.login(loginInfo);
            await setLoggedIn(true);
            await createSession(loginResponse.data);
            navigate("/");
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
                        setFormErrors({ ...formErrors, password: message });
                        break;
                    default:
                        return;
                }
            });
        }
    }

    return (
        <section className="flex flex-col sm:w-xl sm:mx-auto content-center justify-center border bg-gray-200 border-blue-900 rounded">
            <form onSubmit={postContent} className="flex flex-col p-5 gap-2">
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
                    errorMessage={formErrors.password}
                />
                <FormInput
                    type="password"
                    name="confirmPassword"
                    label="Confirmez le mot de passe"
                    inputValue={form.confirmPassword}
                    handleChange={() => changeConfirmPassword}
                    errorMessage={formErrors.confirmPassword}
                />
                <div className="flex mx-2 mt-4">
                    <BlueFormButton>Créer un compte</BlueFormButton>
                </div>
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
