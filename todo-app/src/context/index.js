import React, { createContext, useState } from "react";

const Store = createContext();

const StoreProvider = ({ children }) => {
    const [testNum, setTestNum] = useState(100);

    const value = {
        state: { testNum },
        setState: { setTestNum },
    };

    return <Store.Provider value={value}>{children}</Store.Provider>;
};

export default StoreProvider;
