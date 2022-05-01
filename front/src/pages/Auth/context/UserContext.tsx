import { createContext, useState } from "react";

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

export const UserContext = createContext({
    user: UserInitValues,
    setUser: null,
    resetUser: null,
});

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(UserInitValues);
    const resetUser = () => {
        setUser(UserInitValues);
    };

    return (
        <UserContext.Provider value={{ user, setUser, resetUser }}>
            {children}
        </UserContext.Provider>
    );
};
