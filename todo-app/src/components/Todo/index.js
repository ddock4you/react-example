import React, { useRef, useState, useCallback } from 'react';
import TodoTemplate from './TodoTemplate';
import TodoInsert from './TodoInsert';
import TodoList from './TodoList';

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
  const [value, setValue] = useState('');
  const insertRef = useRef(null);

  // 고유 값으로 사용 될 id
  // ref 를 사용하여 변수 담기
  const nextId = useRef(4);

  const onInsert = useCallback((text) => {
    const todo = {
      id: nextId.current,
      text,
      checked: false,
      isModifying: false,
    };
    setTodos((todos) => todos.concat(todo));
    nextId.current += 1; // nextId 1 씩 더하기
  }, []);

  const onRemove = useCallback((id) => {
    setTodos((todos) => todos.filter((todo) => todo.id !== id));
  }, []);

  const onToggle = useCallback((id) => {
    setTodos((todos) =>
      todos.map((todo) =>
        todo.id === id ? { ...todo, checked: !todo.checked } : todo,
      ),
    );
  }, []);

  const onModify = useCallback(
    (id, text, isModifying) => {
      // alert(`${text}, ${id}, ${isModifying}`);
      if (isModifying === false) {
        setTodos((todos) =>
          todos.map((todo) =>
            todo.id === id
              ? { ...todo, isModifying: !todo.isModifying }
              : { ...todo, isModifying: false },
          ),
        );
        setValue(text);
        insertRef.current.focus();
      } else {
        setValue('');
        setTodos(
          todos.map((todo) =>
            todo.id === id
              ? { ...todo, text: value, isModifying: !todo.isModifying }
              : { ...todo },
          ),
        );
      }
    },
    [todos, value],
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
