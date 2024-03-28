import { create } from 'zustand'

const useTodoStore = create((set) => ({
    todos: JSON.parse(localStorage.getItem('todos')) || [],
    addTodo: (newTodo) =>
        set((state) => {
            const updatedTodos = [...state.todos, newTodo];
            localStorage.setItem('todos', JSON.stringify(updatedTodos));
            return { todos: updatedTodos };
        }),
    deleteTodo: (id) =>
        set((state) => {
            const updatedTodos = state.todos.filter((todo) => todo.id !== id);
            // Regenerate IDs to ensure uniqueness
            const updatedTodosWithUniqueIds = updatedTodos.map((todo, index) => ({
                ...todo,
                id: index + 1,
            }));
            localStorage.setItem('todos', JSON.stringify(updatedTodosWithUniqueIds));
            return { todos: updatedTodosWithUniqueIds };
        }),
    editTodo: (id, newText) =>
        set((state) => {
            const updatedTodos = state.todos.map((todo) =>
                todo.id === id ? { ...todo, text: newText } : todo
            );
            localStorage.setItem('todos', JSON.stringify(updatedTodos));
            return { todos: updatedTodos };
        }),
    completeTodo: (id) =>
        set((state) => {
            const updatedTodos = state.todos.map((todo) =>
                todo.id === id ? { ...todo, completed: !todo.completed } : todo
            );
            localStorage.setItem('todos', JSON.stringify(updatedTodos));
            return { todos: updatedTodos };
        }),
}));

export default useTodoStore;