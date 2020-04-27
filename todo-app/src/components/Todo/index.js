import React, { useRef, useState, useCallback, useContext } from "react";
import TodoTemplate from "./TodoTemplate";
import TodoInsert from "./TodoInsert";
import TodoList from "./TodoList";
import { Store } from "../../context";

function createBulkTodos() {
    const array = [];
    for (let i = 1; i <= 5; i++) {
        array.push({
            id: i,
            text: `할 일 ${i}`,
            checked: false,
            isModifying: false,
        });
    }
    return array;
}

const Todo = () => {
    const [todos, setTodos] = useState(createBulkTodos);
    const [value, setValue] = useState("");
    const insertRef = useRef(null);

    const { state } = useContext(Store);

    // 고유 값으로 사용 될 id
    // ref 를 사용하여 변수 담기
    const nextId = useRef(4);

    const onInsert = useCallback(
        (text) => {
            if (!state.isLogin) {
                alert("로그인을 해야만 등록할 수 있습니다.");
                return;
            }
            const todo = {
                id: nextId.current,
                text,
                checked: false,
                isModifying: false,
            };
            setTodos((todos) => todos.concat(todo));
            nextId.current += 1; // nextId 1 씩 더하기
        },
        [state.isLogin]
    );

    const onRemove = useCallback(
        (id) => {
            if (!state.isLogin) {
                alert("로그인을 해야만 삭제할 수 있습니다.");
                return;
            }
            setTodos((todos) => todos.filter((todo) => todo.id !== id));
        },
        [state.isLogin]
    );

    const onToggle = useCallback(
        (id) => {
            if (!state.isLogin) {
                alert("로그인을 해야만 완료처리할 수 있습니다.");
                return;
            }
            setTodos((todos) =>
                todos.map((todo) =>
                    todo.id === id ? { ...todo, checked: !todo.checked } : todo
                )
            );
        },
        [state.isLogin]
    );

    const onModify = useCallback(
        (id, text, isModifying) => {
            if (!state.isLogin) {
                alert("로그인을 해야만 수정할 수 있습니다.");
                return;
            }
            if (isModifying === false) {
                setTodos((todos) =>
                    todos.map((todo) =>
                        todo.id === id
                            ? { ...todo, isModifying: !todo.isModifying }
                            : { ...todo, isModifying: false }
                    )
                );
                setValue(text);
                insertRef.current.focus();
            } else {
                setValue("");
                setTodos(
                    todos.map((todo) =>
                        todo.id === id
                            ? {
                                  ...todo,
                                  text: value,
                                  isModifying: !todo.isModifying,
                              }
                            : { ...todo }
                    )
                );
            }
        },
        [todos, value, state.isLogin]
    );

    return (
        <TodoTemplate>
            <TodoInsert
                onInsert={onInsert}
                value={value}
                setValue={setValue}
                insertRef={insertRef}
            />
            <TodoList
                todos={todos}
                onRemove={onRemove}
                onToggle={onToggle}
                onModify={onModify}
            />
        </TodoTemplate>
    );
};

export default Todo;
