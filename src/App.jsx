import { useState } from 'react'
import rocket from './assets/rocket.jpg';
import { useEffect } from 'react';
import TodoList from './components/TodoList';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import useTodoStore from './store'
import toast, { Toaster } from 'react-hot-toast';
import './App.css'


const schema = z.object({
  taskTitle: z.string().min(3).nonempty(),
});

const App = () => {
  const todoStore = useTodoStore();
  const { register, handleSubmit, reset, formState: { errors } } = useForm({
    resolver: zodResolver(schema),
  });

  useEffect(() => {
    if (errors.taskTitle) {
      toast.error('Todo cannot be empty or less than 3 characters!');
    }
  }, [errors]);

  const onSubmit = (data) => {
    const newTodo = {
      id: todoStore.todos.length + 1,
      text: data.taskTitle,
      completed: false,
    };
    todoStore.addTodo(newTodo);
    toast.success('Todo added successfully!');
    reset();
  };

  return (
    <div>
      <div className='todo-list'>
        <form onSubmit={handleSubmit(onSubmit)} className="todo-form">
          <input
            type="text"
            {...register('taskTitle')}
            className="todo-input"
            placeholder="Start Typing..."
          />
          <button type="submit" className="todo-submit">Submit</button>
        </form>
        {
          todoStore.todos.length === 0
          &&
          <div className='noting-todo'>
            <img src={rocket} alt="rocket" width={40} height={40} />
            You have nothing to do!
          </div>
        }
        {todoStore.todos.length > 0 && (
          <TodoList todoStore={todoStore} />
        )}
      </div>
      <Toaster position='Bottom center' />
    </div>
  );
};

export default App
