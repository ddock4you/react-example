import React from "react";
import ColorBox from "./components/ColorBox";
import { ColorProvider } from "./Context/color";
import SelectColors from "./components/SelectColor";
import SelectColorClass from "./components/SelectColorClass";

const App = () => {
    return (
        <ColorProvider>
            <div>
                <SelectColorClass />
                <ColorBox />
            </div>
        </ColorProvider>
    );
};

export default App;
