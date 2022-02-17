import axios from "axios";
import { createContext, useState, useEffect } from "react";

axios.defaults.baseURL = "http://localhost:8000/api"

export const ApiDataContext = createContext()

export const ApiDatasProvider = ({children}) => {

    const [posts, setPosts] = useState([])

    useEffect(() => {
        axios.get("/forum")
            .then( res => setPosts( res.data ))
    }, [])

    return (
        <ApiDataContext.Provider value={{posts}} >
            {children}
        </ApiDataContext.Provider>
    )
}