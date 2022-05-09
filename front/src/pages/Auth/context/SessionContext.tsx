import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ShowMessageOverlay } from "../../../components/MessageOverlay";
import { authApiProvider } from "../../../providers/AuthApiProvider";
import { usersApiProvider } from "../../../providers/UsersApiProvider";
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
    const { clearUser, setUser } = useContext(UserContext);
    const { setMessage } = useContext(ShowMessageOverlay);
    const [loggedIn, setLoggedIn] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        if (!loggedIn) {
            const relog = async () => {
                const relog = await authApiProvider.relog();
                if (relog !== 401 && relog !== 403) {
                    const sessionInfos = await usersApiProvider.getProfile();
                    setUser(sessionInfos);
                    setLoggedIn(true);
                }
            };
            relog().catch((error) => {});
        }
    }, []);

    async function signup(loginInfo) {
        await authApiProvider.signup(loginInfo);
        await login(loginInfo);
        setMessage("signup");
    }

    async function login(loginInfo) {
        await authApiProvider.login(loginInfo);
        const sessionInfos = await usersApiProvider.getProfile();
        setLoggedIn(true);
        setUser(sessionInfos);
        navigate("/");
        setMessage("login");
    }

    async function logout() {
        await authApiProvider.logout();
        setLoggedIn(false);
        clearUser();
        navigate("/");
    }

    async function disableAccount() {
        await authApiProvider.disableAccount();
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
