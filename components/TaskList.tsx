// components/TodoList.tsx
"use client";
import { useState, useEffect } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface Todo {
  task_name: string;
  status: boolean;
  priority: number; // 0 for no priority, 1 for high priority
  task_limit: number;
}

const TodoList = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [inputValue, setInputValue] = useState<string>('');
  const [taskLimit, setTaskLimit] = useState<number>(0);

  // Load todos from the backend on component mount
  const fetchTodos = async () => {
    console.log("running fetch");
    
    try {
      const response = await fetch('https://digital-detox-y73b.onrender.com/toDoList', {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
        credentials: "include",
      });
      const data = await response.json();
      if (response.ok) {
        const todosWithPriority = Array.isArray(data.tasks) ? data.tasks : [];
        setTodos(todosWithPriority);
        console.log("Fetched todos with priority status:", todosWithPriority);
        console.log("fetch ",todos);
      } else {
        toast.error("Failed to fetch tasks.");
        console.log("error in fetch is ",data.message);
      }
    } catch (error) {
      toast.error("An error occurred while fetching tasks.");
    }
  };
  
  useEffect(() => {
    fetchTodos();
  }, []);

  const addTodo = async (e: React.FormEvent) => {
    e.preventDefault();
    const trimmedInput = inputValue.trim();

    if (trimmedInput === '' || taskLimit <= 0) {
      toast.info("Please fill the input correctly.");
      return;
    }
    if (todos.some(todo => todo.task_name === trimmedInput)) {
      toast.error("Task already exists!");
      return;
    }

    const newTodo: Todo = { task_name: trimmedInput, status: false, priority: 0, task_limit: taskLimit };
    try {
      const response = await fetch('https://digital-detox-y73b.onrender.com/toDoList', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          task_name: newTodo.task_name,
          task_limit: newTodo.task_limit,
          priority: newTodo.priority,
          status:newTodo.status
        }),
        credentials: "include",
      });
      
      const result = await response.json();
      if (response.ok) {
        setTodos(prevTodos => [...prevTodos, newTodo]);
        toast.success("Task added successfully!");
      } else {
        toast.error("Failed to add task.");
        console.log("POST Error",result.message);
        console.log("POST Error",newTodo);
        
      }
    } catch (error) {
      toast.error("An error occurred while adding the task.");
    }

    setInputValue('');
    setTaskLimit(0);
  };

  const toggleTodo = async (text: string) => {
    setTodos(prevTodos =>
      prevTodos.map(todo =>
        todo.task_name === text ? { ...todo, status: !todo.status } : todo
      )
    );
  };

  const deleteTodo = async (text: string) => {
    try {
      const response = await fetch(`https://digital-detox-y73b.onrender.com/toDoList`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ task_name:text }),
        credentials: "include",
      });

      const res= await response.json();

      if (response.ok) {
        setTodos(prevTodos => prevTodos.filter(todo => todo.task_name !== text));
        toast.success("Task deleted successfully.");
        
      } else {
        toast.error("Failed to delete task.");
        console.log("delete ",res.message);
      }
    } catch (error) {
      toast.error("An error occurred while deleting the task.");
    }
  };

  const updatePriority = async (text: string) => {
    const updatedPriority = todos.find(todo => todo.task_name === text)?.priority === 1 ? 0 : 1;
    const complete = todos.find(todo => todo.task_name === text)?.status ? 1 : 0;
    const obj={
      task_name:text,
      priority: updatedPriority,
      status:complete 
    }
    
    try {
      const response = await fetch(`https://digital-detox-y73b.onrender.com/toDoList`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(obj),
        credentials: "include",
      });
      const result = await response.json();
      if (response.ok) {
        setTodos(prevTodos =>
          prevTodos.map(todo =>
            todo.task_name === text ? { ...todo, priority: updatedPriority } : todo
            )
            );
        console.log("data is ",obj);
        toast.success("Priority updated successfully!");
      } else {
        toast.error("Failed to update priority.");
        console.log("from update priority",result.message);
        console.log("data is ",obj);
      }
    } catch (error) {
      toast.error("An error occurred while updating priority.");
    }
  };

  const clearCompleted = () => {
    if (todos.length === 0) {
      toast.error("No Completed Tasks!");
      return;
    }

    const hasCompletedTasks = todos.some(todo => todo.status);
    if (!hasCompletedTasks) {
      toast.info("No completed tasks to clear!");
      return;
    }

    setTodos(prevTodos => prevTodos.filter(todo => !todo.status));
    toast.success("Completed tasks cleared successfully!");
  };

  const sortedTodos = [...todos].sort((a, b) => b.priority - a.priority);

  return (
    <div className="max-w-full mx-10 mt-10 p-10 border rounded-lg shadow-lg bg-white">
      <h1 className="text-4xl font-bold text-center mb-10">Todo List</h1>
      <form onSubmit={addTodo} className="flex w-full sm:flex-row flex-col space-x-5 justify-center items-center mb-5">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          className="p-2 w-full ml-[20px] mb-4 border rounded-lg"
          placeholder="Task name"
        />
        <input
          type="number"
          value={taskLimit}
          onChange={(e) => setTaskLimit(Number(e.target.value))}
          className="p-2 border mb-4 w-full rounded-lg"
          placeholder="Time limit (minutes)"
        />
        <button type="submit" className="bg-blue-500 w-full mb-4 focus:ring-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 hover:bg-blue-700 text-white p-2 rounded-md sm:rounded-md">
          Add Task
        </button>
      </form>
      <ul className="space-y-2">
        {sortedTodos.map((todo) => (
          <li
            key={todo.task_name}
            className={`flex justify-between items-center p-2 border rounded ${todo.status ? 'bg-green-100' : 'bg-gray-100'}`}
          >
            <span
              onClick={() => toggleTodo(todo.task_name)}
              className={`cursor-pointer ${todo.status ? 'line-through text-gray-500' : ''}`}
              tabIndex={0}
              onKeyDown={(e) => e.key === 'Enter' && toggleTodo(todo.task_name)}
            >
              {todo.task_name}
            </span>
            <div className="flex items-center ml-2 space-x-5">
              <svg
                onClick={() => updatePriority(todo.task_name)}
                className={`w-6 h-6 cursor-pointer ${todo.priority === 1 ? 'text-yellow-500' : 'text-gray-300'}`}
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M10 15.27L16.18 19l-1.64-7.03L20 8.24l-7.19-.61L10 1 7.19 7.63 0 8.24l5.46 3.73L3.82 19z" />
              </svg>
              <button onClick={() => deleteTodo(todo.task_name)} className="text-red-500">
                <img src="/delete.svg" alt="Delete" className="w-[25px]" />
              </button>
            </div>
          </li>
        ))}
      </ul>
      <button onClick={clearCompleted} className="mt-5 bg-red-500 focus:ring-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 hover:bg-red-600 text-white p-2 rounded-[5px]">
        Clear Completed Tasks
      </button>
      <ToastContainer />
    </div>
  );
};

export default TodoList;
