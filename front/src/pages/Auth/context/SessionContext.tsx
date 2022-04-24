import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { authProvider } from "../../../providers/AuthProvider";

interface IUserSession {
    id: string;
    username: string;
    role: string;
    timestamp: number;
    postsCount: number;
    commentsCount: number;
}

const UserInitValues: IUserSession = {
    id: null,
    username: null,
    role: null,
    timestamp: null,
    postsCount: null,
    commentsCount: null,
};

export const SessionContext = createContext({
    loggedIn: false,
    setLoggedIn: null,
    user: UserInitValues,
    createSession: null,
    logout: null,
    navigate: null,
    disableAccount: null,
    checkLogin: null,
});

export const SessionProvider = ({ children }) => {
    const [loggedIn, setLoggedIn] = useState(false);
    const [user, setUser] = useState(UserInitValues);
    const navigate = useNavigate();

    function createSession(sessionInfo) {
        setUser(sessionInfo);
    }

    useEffect(() => {
        const relog = async () => {
            const userInfo = await authProvider.relog();
            if (userInfo !== 401 && userInfo !== 403) {
                setUser(userInfo);
                setLoggedIn(true);
            }
        };
        relog().catch((error) => {});
    }, []);

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
                setLoggedIn,
                user,
                createSession,
                logout,
                navigate,
                disableAccount,
                checkLogin,
            }}
        >
            {children}
        </SessionContext.Provider>
    );
};
