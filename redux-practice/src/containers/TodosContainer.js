import React, { useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { changeInput, insert, toggle, remove } from "../modules/todos";
import Todos from "../components/Todos";
import useAction from "../lib/useAction";

const TodosContainer = () => {
    const { input, todos } = useSelector(({ todos }) => ({
        input: todos.input,
        todos: todos.todos,
    }));
    const [onChangeInput, onInsert, onToggle, onRemove] = useAction(
        [changeInput, insert, toggle, remove],
        []
    );
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

// connect 함수를 사용할 경우 해당 컨테이너 컴포넌트의 부모컴포넌트가 리렌더링될 때
// 해당 컨테이너 컴포넌트의 props가 바뀌지 않았다면 리렌더링이 자동으로 방지되어
// 성능이 최적화 됨.

// useSelector를 사용하여 리덕스 상태를 조회했을 때는 이 최적화 작업이 자동으로
// 이루어지지 않으므로 성능 최적화를 위해서는 REact.memo를 컨테이너 컴포넌트에
// 사용해 주어야 합니다.
// 지금은 부모 컴포넌트인 App 컴포넌트가 리렌더링되는 일이 없으므로 불펼요한 성능 최적화임.

export default React.memo(TodosContainer);
