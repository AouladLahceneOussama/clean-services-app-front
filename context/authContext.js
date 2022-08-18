import React, { createContext, useState, useContext } from "react";

const authContext = createContext();
const setAuthContext = createContext();

export const useAuth = () => {
    return useContext(authContext);
}

export const useSetAuth = () => {
    return useContext(setAuthContext);
}

export const AuthProvider = ({ children }) => {

    const [isLogged, setIsLogged] = useState({
        "isLogged": false,
        "isRegistred": false,
        "phone": ""
    });

    return (
        <authContext.Provider value={isLogged}>
            <setAuthContext.Provider value={setIsLogged}>
                {children}
            </setAuthContext.Provider>
        </authContext.Provider>
    )
}

export default AuthProvider;