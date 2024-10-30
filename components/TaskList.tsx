// components/TodoList.tsx
"use client";
import { useState, useEffect } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface Todo {
  text: string;
  completed: boolean;
  priority: number; // 0 for no priority, 1 for high priority
}

const TodoList = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [inputValue, setInputValue] = useState<string>('');

  // Load todos from local storage when the component mounts
  useEffect(() => {
    const savedTodos = localStorage.getItem('todos');
    if (savedTodos) {
      setTodos(JSON.parse(savedTodos) as Todo[]);
    }
  }, []);

  // Save todos to local storage whenever they change
  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const addTodo = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmedInput = inputValue.trim();
    if (trimmedInput === '') return;

    // Check for duplicate task
    if (todos.some(todo => todo.text === trimmedInput)) {
      toast.error("Task already exists!"); // Show toast notification
      return;
    }

    // Add the new task
    setTodos(prevTodos => [...prevTodos, { text: trimmedInput, completed: false, priority: 0 }]);
    setInputValue('');
  };

  const toggleTodo = (text: string) => {
    setTodos(prevTodos => prevTodos.map(todo =>
      todo.text === text ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  const deleteTodo = (text: string) => {
    if (window.confirm("Are you sure you want to delete this task?")) {
      setTodos(prevTodos => prevTodos.filter(todo => todo.text !== text));
    }
  };

  const updatePriority = (text: string) => {
    setTodos(prevTodos => prevTodos.map(todo =>
      todo.text === text ? { ...todo, priority: todo.priority === 1 ? 0 : 1 } : todo
    ));
  };

  const clearCompleted = () => {
    setTodos(prevTodos => prevTodos.filter(todo => !todo.completed));
  };

  // Sort todos based on priority (high priority first)
  const sortedTodos = [...todos].sort((a, b) => b.priority - a.priority);

  return (
    <div className="max-w-md mx-auto mt-10 p-5 border rounded-lg shadow-lg bg-white">
      <h1 className="text-2xl font-bold text-center mb-5">Todo List</h1>
      <form onSubmit={addTodo} className="flex mb-5">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          className="flex-grow p-2 border rounded-l-lg"
          placeholder="Add a new task"
        />
        <button type="submit" className="bg-blue-500 text-white p-2 rounded-r-lg">
          Add
        </button>
      </form>
      <ul className="space-y-2">
        {sortedTodos.map((todo) => (
          <li
            key={todo.text}
            className={`flex justify-between items-center p-2 border rounded ${todo.completed ? 'bg-green-100' : 'bg-gray-100'}`}
          >
            <span
              onClick={() => toggleTodo(todo.text)}
              className={`cursor-pointer ${todo.completed ? 'line-through text-gray-500' : ''}`}
              tabIndex={0}
              onKeyDown={(e) => e.key === 'Enter' && toggleTodo(todo.text)}
            >
              {todo.text}
            </span>
            <div className="flex items-center ml-2">
              <svg
                onClick={() => updatePriority(todo.text)}
                className={`w-6 h-6 cursor-pointer ${todo.priority === 1 ? 'text-yellow-500' : 'text-gray-300'}`}
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M10 15.27L16.18 19l-1.64-7.03L20 8.24l-7.19-.61L10 1 7.19 7.63 0 8.24l5.46 3.73L3.82 19z" />
              </svg>
            </div>
            <button onClick={() => deleteTodo(todo.text)} className="text-red-500">
              Delete
            </button>
          </li>
        ))}
      </ul>
      <button onClick={clearCompleted} className="mt-5 bg-red-500 text-white p-2 rounded">
        Clear Completed
      </button>
      <ToastContainer />
    </div>
  );
};

export default TodoList;
