import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { apiProvider } from "../../../providers/ApiProvider";
import { authProvider } from "../../../providers/AuthProvider";

interface IUserSession {
    id: string;
    username: string;
    role: string;
    timestamp: number;
    postsCount: number;
    commentsCount: number;
    profilePicture: string;
}

const UserInitValues: IUserSession = {
    id: null,
    username: null,
    role: null,
    timestamp: null,
    postsCount: null,
    commentsCount: null,
    profilePicture: "",
};

export const SessionContext = createContext({
    loggedIn: false,
    user: UserInitValues,
    logout: null,
    disableAccount: null,
    checkLogin: null,
    signup: null,
    login: null,
});

export const SessionProvider = ({ children }) => {
    const [loggedIn, setLoggedIn] = useState(false);
    const [user, setUser] = useState(UserInitValues);
    const navigate = useNavigate();

    function createSession(sessionInfo: IUserSession) {
        setUser(sessionInfo);
    }

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
    }

    async function login(loginInfo) {
        await authProvider.login(loginInfo);
        const sessionInfos = await apiProvider.getProfile();
        setLoggedIn(true);
        createSession(sessionInfos);
        navigate("/");
    }

    async function logout() {
        await authProvider.logout();
        setLoggedIn(false);
        setUser(UserInitValues);
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
                user,
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
