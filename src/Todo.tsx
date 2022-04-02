import { observer } from "mobx-react-lite";
import React, { useRef } from "react";
import todo from "./store/todo";

const Todo = observer(() => {
  const inputEl = useRef<HTMLInputElement>(null);
  const addNew = (event: React.SyntheticEvent) => {
    if (inputEl.current) {
      todo.addTodo(inputEl.current.value);
      inputEl.current.value = "";
    }
  };
  return (
    <div className="todos">
      <button onClick={() => todo.fetchTodos()}>load test todos</button>
      <div className="add-new">
        <input type="text" ref={inputEl} />
        <button onClick={addNew}>add</button>
      </div>

      <div>
        <div className="complete-all">
          <button
            onClick={() => {
              todo.checkAll(true);
            }}
          >
            complete all
          </button>
          <button
            onClick={() => {
              todo.checkAll(false);
            }}
          >
            uncomplete all
          </button>
          <button
            onClick={() => {
              todo.deleteAll();
            }}
          >
            delete All
          </button>
        </div>
      </div>

      <div className="todo-list">
        {todo.todos.map((t, i) => (
          <div className="todo" key={i}>
            <input
              type="checkbox"
              checked={t.completed}
              onChange={() => todo.completeTodo(t)}
            />
            <div className={`todo-title ${t.completed ? "done" : ""}`}>
              {t.title}
            </div>
            <button onClick={() => todo.removeTodo(t.id)}>X</button>
          </div>
        ))}
      </div>
    </div>
  );
});

export default Todo;
