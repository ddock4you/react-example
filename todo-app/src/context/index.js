import React, { useState, createContext } from "react";

const Store = createContext();

const StoreProvider = ({ children }) => {
    const [isLogin, setIsLogin] = useState(null);

    const value = {
        state: { isLogin },
        setState: { setIsLogin },
    };

    return <Store.Provider value={value}>{children}</Store.Provider>;
};

export { Store, StoreProvider };
