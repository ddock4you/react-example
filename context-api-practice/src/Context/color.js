import React, { createContext, useState } from "react";

const ColorContext = createContext({
    state: { color: "black", subcolor: "red" },
    actions: {
        setColor: () => {},
        setSubcolor: () => {},
    },
});

// createContext 기본값과 Provider의 value에 넣는 객체 형태를 같게,
// 1. Context를 볼 때 내부값이 어떻게 구성되어 있는지 파악하기 쉬움.
// 2. (실수로)Provider를 사용하지 않았을 때 리액트 애플리케이션에서 에러가 발생하지 않음.
const ColorProvider = ({ children }) => {
    const [color, setColor] = useState("black");
    const [subcolor, setSubcolor] = useState("red");

    const value = {
        state: { color, subcolor },
        actions: { setColor, setSubcolor },
    };
    return (
        <ColorContext.Provider value={value}>{children}</ColorContext.Provider>
    );
};

// const ColorConsumer = ColorContext.Consumer와 같은 의미
const { Consumer: ColorConsumer } = ColorContext;

// ColorProvider와 Colorconsumer 내보내기
export { ColorProvider, ColorConsumer };

export default ColorContext;
