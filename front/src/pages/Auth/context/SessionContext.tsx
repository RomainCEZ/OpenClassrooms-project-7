import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { authProvider } from "../../../domain/AuthProvider";

export const SessionContext = createContext({
    loggedIn: false,
    setLoggedIn: null,
    user: { id: null, username: null, role: null },
    createSession: null,
    logout: null,
});

export const SessionProvider = ({ children }) => {
    const [loggedIn, setLoggedIn] = useState(false);
    const [user, setUser] = useState({ id: null, username: null, role: null });
    const navigate = useNavigate()
    
    function createSession(sessionInfo) {
        setUser(sessionInfo);
    }
    useEffect(() => {
        const relog = async () => {
            const userInfo = await authProvider.relog()
            console.log(userInfo)
            switch (userInfo) {
                case 401:
                case 403:
                    navigate("/login")
                    break;
                default:
                    if (userInfo) {
                        setUser(userInfo)
                        setLoggedIn(true)
                        navigate("/")
                    }
                    break;
            }
        }
            relog().catch(
                error => {
                    if ((location.pathname !== '/login' && location.pathname !== '/signup')) {
                        navigate('/login')
                }
            })
        // }
    }, []);

    function logout() {
        authProvider.logout();
        setLoggedIn(false);
        navigate("/login")
    }

    return (
        <SessionContext.Provider
            value={{ loggedIn, setLoggedIn, user, createSession, logout }}
        >
            {children}
        </SessionContext.Provider>
    );
};
