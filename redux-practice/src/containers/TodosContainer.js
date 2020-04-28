import React, { useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import Todos from "../components/Todos";
import { changeInput, insert, toggle, remove } from "../modules/todos";

const TodosContainer = () => {
    const { input, todos } = useSelector(({ todos }) => ({
        input: todos.input,
        todos: todos.todos,
    }));
    const dispatch = useDispatch();
    const onChangeInput = useCallback((input) => dispatch(changeInput(input)), [
        dispatch,
    ]);
    const onInsert = useCallback((text) => dispatch(insert(text)), [dispatch]);
    const onToggle = useCallback((id) => dispatch(toggle(id)), [dispatch]);
    const onRemove = useCallback((id) => dispatch(remove(id)), [dispatch]);

    return (
        <Todos
            input={input}
            todos={todos}
            onChangeInput={onChangeInput}
            onInsert={onInsert}
            onToggle={onToggle}
            onRemove={onRemove}
        />
    );
};

// mapStateToProps
// 리덕스 스토어 안의 상태를 컴포넌트의 props로 넘겨주기 위해 설정하는 함수

// mapDispatchToProps
// 액션 생성 함수를 컴포넌트의 props로 넘겨주기 위해 사용하는 함수

// export default connect(
//     // 비구조화 할당을 통해 todos를 분리하여
//     // state.todos.input 대신 todos.input을 사용
//     ({ todos }) => ({
//         input: todos.input,
//         todos: todos.todos,
//     }),
//     {
//         changeInput,
//         insert,
//         toggle,
//         remove,
//     }
// )(TodosContainer);

export default TodosContainer;
