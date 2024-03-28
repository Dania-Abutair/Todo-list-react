import React, { useState } from 'react';
import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import toast, { Toaster } from 'react-hot-toast';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrashAlt, faCheckCircle, faUndo } from '@fortawesome/free-solid-svg-icons';

const schema = z.object({
  taskTitle: z.string().min(3).nonempty(),
});

const TodoItem = ({ todo, todoStore }) => {
  const [isEditing, setIsEditing] = useState(false);
  const { register, handleSubmit, formState: { errors }, setValue } = useForm({
    resolver: zodResolver(schema),
  });

  const handleDelete = () => {
    todoStore.deleteTodo(todo.id);
    toast.success('Todo deleted successfully!');
  };

  const handleComplete = () => {
    todoStore.completeTodo(todo.id);
  };

  const handleEdit = () => {
    setIsEditing(true);
    setValue('taskTitle', todo.text);
  };

  useEffect(() => {
    if (errors.taskTitle) {
      toast.error('Todo title cannot be empty or less than 3 characters!');
    }
  }, [errors]);

  const handleSave = (data) => {
    todoStore.editTodo(todo.id, data.taskTitle);
    setIsEditing(false);
    toast.success('Todo stauts updated successfully!');
  };

  return (
    <li className={`todo-item fade-in ${todo.completed ? 'completed' : ''}`}>
      {isEditing ? (
        <form onSubmit={handleSubmit(handleSave)}>
          <input
            type="text"
            {...register('taskTitle')}
            className="todo-update-input"
            placeholder=""
          />
          <button type="submit" className="todo-update-button">Update</button>
        </form>
      ) : (
        <>
          <div className='todo-item-content'>
            <span className={todo.completed ? 'completed' : 'none'}>
              {todo.text}
            </span>
            <div className='todo-item-buttons'>
              <button onClick={handleComplete} className="todo-button">
                {todo.completed ? (
                  <>
                    <FontAwesomeIcon icon={faUndo} /> Mark undone
                  </>
                ) : (
                  <>
                    <FontAwesomeIcon icon={faCheckCircle} /> Mark completed
                  </>
                )}
              </button>
              <div>
                <button onClick={handleEdit} className="todo-button">
                  <FontAwesomeIcon icon={faEdit} /> Edit
                </button>
                <button onClick={handleDelete} className="todo-button todo-button-delete">
                  <FontAwesomeIcon icon={faTrashAlt} /> Delete
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </li>
  );
};

export default TodoItem