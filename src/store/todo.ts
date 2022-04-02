import { makeAutoObservable } from "mobx";
import makeInspectable from "mobx-devtools-mst";

type todoType = {
  id: number;
  title: string;
  completed: boolean;
};

class Todo {
  todos: todoType[] = [];

  constructor() {
    makeAutoObservable(this);
  }

  addTodo(title: string) {
    this.todos.push({
      id: this.todos.length + 1,
      title,
      completed: false,
    });
  }

  removeTodo(id: number) {
    this.todos = this.todos.filter((todo) => todo.id !== id);
  }

  completeTodo(todo: todoType) {
    todo.completed = !todo.completed;
  }

  checkAll(completed: boolean) {
    this.todos.map((todo) => (todo.completed = completed));
  }

  deleteAll() {
    this.todos = [];
  }

  async fetchTodos() {
    return await fetch("https://jsonplaceholder.typicode.com/todos")
      .then((response) => response.json())
      .then((json) => (this.todos = [...this.todos, ...json]));
  }
}

const TodoInstance = new Todo();
makeInspectable(TodoInstance);
export default TodoInstance;
