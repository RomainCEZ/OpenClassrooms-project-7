import { createContext, useState } from "react";

interface IUserSession {
    id: string;
    email: string;
    username: string;
    role: string;
    timestamp: number;
    postsCount: number;
    commentsCount: number;
    profilePicture: string;
}

const UserInitValues: IUserSession = {
    id: null,
    email: null,
    username: null,
    role: null,
    timestamp: null,
    postsCount: null,
    commentsCount: null,
    profilePicture: null,
};

export const UserContext = createContext({
    user: UserInitValues,
    setUser: null,
    clearUser: null,
});

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(UserInitValues);
    const clearUser = () => {
        setUser(UserInitValues);
    };

    return (
        <UserContext.Provider value={{ user, setUser, clearUser }}>
            {children}
        </UserContext.Provider>
    );
};
