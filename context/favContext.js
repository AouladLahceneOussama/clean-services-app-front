import React, { createContext, useState, useContext } from "react";

const favContext = createContext();
const setfavContext = createContext();

export const useFav = () => {
    return useContext(favContext);
}

export const useSetFav = () => {
    return useContext(setfavContext);
}

export const FavProvider = ({ children }) => {

    const [addedToFav, setAddedToFav] = useState({
        "addedToFav": null,
        "idService":null
    });

    return (
        <favContext.Provider value={addedToFav}>
            <setfavContext.Provider value={setAddedToFav}>
                {children}
            </setfavContext.Provider>
        </favContext.Provider>
    )
}

export default FavProvider;