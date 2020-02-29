import React from "react";
import AddTodo from "./components/AddTodo";
import TodoList from "./components/TodoList";
import VisibilityFilters from "./components/VisibilityFilters";
import PropertyViewer from "./components/PropertyViewer";
import "./styles.css";

export default function TodoApp() {
  return (
    <div className="todo-app">
      <h1>Todo List</h1>
      <PropertyViewer />
      <AddTodo />
      <TodoList />
      <VisibilityFilters />
    </div>
  );
}
