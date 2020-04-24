import React, { useContext } from "react";
import { Store } from "./context";

const TestComponent = () => {
    const { state } = useContext(Store);
    return <div>{state.testNum}</div>;
};

export default TestComponent;
