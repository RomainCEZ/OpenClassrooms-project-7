import {
    createContext,
    useContext,
    useEffect,
    useReducer,
    useRef,
    useState,
} from "react";
import { UserContext } from "../pages/Auth/context/UserContext";

export const ShowMessageOverlay = createContext({
    setMessage: null,
});

export function MessageOverlay({ children }) {
    const { user } = useContext(UserContext);
    const [visible, setVisible] = useState(false);
    const [message, setMessage] = useReducer(chooseMessage, "");

    function chooseMessage(message: string, action: string) {
        switch (action) {
            case "login":
                return `Bonjour, ${user.username} !`;
            case "signup":
                return `Bienvenue, ${user.username} !`;

            case "darkmode":
                return "Mode sombre";
            case "lightmode":
                return "Mode clair";

            case "new post":
                return "Message publié !";
            case "edit post":
                return "Message édité !";
            case "delete post":
                return "Message supprimé !";

            case "new comment":
                return "Commentaire publié !";
            case "edit comment":
                return "Commentaire édité !";
            case "delete comment":
                return "Commentaire supprimé !";

            case "change username":
                return `Vous êtes maintenant ${user.username} !`;
            case "change password":
                return "Mot de passe modifié !";
            case "reset password":
                return "Un email a été envoyé pour réinitialiser votre mot de passe !";
            case "change profile picture":
                return "Image de profil modifiée !";
            default:
                return "";
        }
    }

    const timer = useRef(null);

    useEffect(() => {
        setVisible(true);
        clearTimeout(timer.current);
        timer.current = setTimeout(() => {
            setVisible(false);
        }, 3000);
    }, [message]);

    useEffect(() => {
        setVisible(false);
    }, []);

    return (
        <ShowMessageOverlay.Provider
            value={{
                setMessage,
            }}
        >
            <div
                className={`fixed flex justify-center items-center mx-auto bottom-4 w-full z-10 pointer-events-none transition-all ${
                    visible ? "" : "opacity-0"
                }`}
            >
                <span
                    className={`py-2.5 px-8 border rounded font-bold max-w-full text-lg text-blue-800 dark:text-gray-800 bg-white dark:bg-gray-400 border-blue-800 dark:border-gray-200 transition-all ${
                        visible ? "" : "opacity-0 scale-150"
                    }`}
                >
                    {message}
                </span>
            </div>
            {children}
        </ShowMessageOverlay.Provider>
    );
}
