import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ShowMessageOverlay } from "../../../components/MessageOverlay";
import { apiProvider } from "../../../providers/ApiProvider";
import { authProvider } from "../../../providers/AuthProvider";
import { UserContext } from "./UserContext";

export const SessionContext = createContext({
    loggedIn: false,
    logout: null,
    disableAccount: null,
    checkLogin: null,
    signup: null,
    login: null,
});

export const SessionProvider = ({ children }) => {
    const { resetUser, setUser } = useContext(UserContext);
    const { setMessage } = useContext(ShowMessageOverlay);
    const [loggedIn, setLoggedIn] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        if (!loggedIn) {
            const relog = async () => {
                const relog = await authProvider.relog();
                if (relog !== 401 && relog !== 403) {
                    const sessionInfos = await apiProvider.getProfile();
                    setUser(sessionInfos);
                    setLoggedIn(true);
                }
            };
            relog().catch((error) => {});
        }
    }, []);

    async function signup(loginInfo) {
        await authProvider.signup(loginInfo);
        await login(loginInfo);
        setMessage("signup");
    }

    async function login(loginInfo) {
        await authProvider.login(loginInfo);
        const sessionInfos = await apiProvider.getProfile();
        setLoggedIn(true);
        setUser(sessionInfos);
        navigate("/");
        setMessage("login");
    }

    async function logout() {
        await authProvider.logout();
        setLoggedIn(false);
        resetUser();
        navigate("/");
    }

    async function disableAccount() {
        await authProvider.disableAccount();
        await logout();
    }

    function checkLogin() {
        if (!loggedIn) {
            navigate("/");
        }
    }
    return (
        <SessionContext.Provider
            value={{
                loggedIn,
                logout,
                disableAccount,
                checkLogin,
                signup,
                login,
            }}
        >
            {children}
        </SessionContext.Provider>
    );
};
