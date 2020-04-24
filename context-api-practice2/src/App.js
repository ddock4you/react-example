import React from "react";
import { StoreProvider } from "./context";
import TestComponent from "./TestComponent";

function App() {
    return (
        <StoreProvider>
            <TestComponent />
        </StoreProvider>
    );
}

export default App;
