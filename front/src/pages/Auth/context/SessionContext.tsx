import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { authProvider } from "../../../domain/AuthProvider";

export const SessionContext = createContext({
    loggedIn: false,
    setLoggedIn: null,
    user: { id: null, username: null, role: null },
    createSession: null,
    logout: null,
    navigate: null,
});

export const SessionProvider = ({ children }) => {
    const [loggedIn, setLoggedIn] = useState(false);
    const [user, setUser] = useState({ id: null, username: null, role: null });
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
                navigate("/");
            }
        };
        relog().catch((error) => {});
    }, []);

    function logout() {
        authProvider.logout();
        setLoggedIn(false);
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
            }}
        >
            {children}
        </SessionContext.Provider>
    );
};
