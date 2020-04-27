import React from "react";
import Counter from "./components/Counter";
import Todos from "./components/Todos";
import CounterContainer from "./containers/CounterContainer";

function App() {
    return (
        <div>
            {/* <Counter number={0} /> */}
            <CounterContainer />
            <hr />
            <Todos />
        </div>
    );
}

export default App;
