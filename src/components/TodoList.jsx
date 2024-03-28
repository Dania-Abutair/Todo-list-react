import React, { useState } from 'react';
import TodoItem from './TodoItem';

const TodoList = ({ todoStore }) => {
  return (
    <ul>
      {todoStore.todos.map((todo) => (
        <TodoItem key={todo.id} todo={todo} todoStore={todoStore} />
      ))}
    </ul>
  );
};;

export default TodoList