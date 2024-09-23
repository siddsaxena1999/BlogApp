import { createContext, useState } from "react";

const userContext = createContext({});

export const UserContextProvider = ({ children }) => {
    const [userInfo, setUserInfo] = useState({});

    return (
        <userContext.Provider value={{ userInfo, setUserInfo }}>
            {children}
        </userContext.Provider>
    )
}

export default userContext;