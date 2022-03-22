import { createContext, useEffect, useState } from "react";
import { useLocalStorage } from "react-use";

export const SessionContext = createContext({
    loggedIn: false,
    setLoggedIn: null,
    user: { username: null, token: null },
    createSession: null,
    logout: null,
});

export const SessionProvider = ({ children }) => {
    const [session, setSession, removeSession] = useLocalStorage("session", {
        username: null,
        token: null,
    });
    const [loggedIn, setLoggedIn] = useState(false);
    const [user, setUser] = useState(session);

    function createSession(sessionInfo) {
        setSession(sessionInfo);
        setUser(sessionInfo);
    }

    useEffect(() => {
        if (session.username !== null && session.token !== null) {
            setLoggedIn(true);
        } else {
            setLoggedIn(false);
        }
    }, []);

    function logout() {
        removeSession();
        setLoggedIn(false);
    }

    return (
        <SessionContext.Provider
            value={{ loggedIn, setLoggedIn, user, createSession, logout }}
        >
            {children}
        </SessionContext.Provider>
    );
};
