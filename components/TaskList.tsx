// components/TodoList.tsx
"use client";
import { useState, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Checkbox from "@mui/material/Checkbox";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import StarIcon from "@mui/icons-material/Star";

import './customStyles.css'
import { Table, Thead, Tbody, Tr, Th, Td } from "react-super-responsive-table";
import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css";
import LoadingCursor from "@/app/loading";

interface Todo {
  task_name: string;
  status: boolean;
  priority: boolean;
  task_limit: number;
}

const TodoList = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [inputValue, setInputValue] = useState<string>("");
  const [taskLimit, setTaskLimit] = useState<number>(0);
  const [loading, setloading] = useState(false);

  // Load todos from the backend on component mount
  const fetchTodos = async () => {
    console.log("started fetch of todolist");
    setloading(true);

    try {
      const response = await fetch(
        "https://digital-detox-y73b.onrender.com/toDoList",
        {
          method: "GET",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
        }
      );
      const data = await response.json();

      if (response.ok) {
        const sortedTodos = (Array.isArray(data.tasks) ? data.tasks : []).sort(
          (a: Todo, b: Todo) => {
            if (a.status !== b.status) return a.status ? 1 : -1; // Move completed tasks to the end
            return b.priority ? 1 : -1; // Among uncompleted tasks, prioritize those with priority
          }
        );
        setTodos(sortedTodos);
      } else {
        toast.error("Failed to fetch tasks.");
      }
    } catch (error) {
      toast.error("An error occurred while fetching tasks.");
    } finally {
      setloading(false);
      console.log("Ending fetch of todolist");
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  const addTodo = async (e: React.FormEvent) => {
    e.preventDefault();
    const trimmedInput = inputValue.trim();

    if (trimmedInput === "" || taskLimit <= 0) {
      toast.info("Please fill the input correctly.");
      return;
    }
    if (todos.some((todo) => todo.task_name === trimmedInput)) {
      toast.error("Task already exists!");
      return;
    }

    const newTodo: Todo = {
      task_name: trimmedInput,
      status: false,
      priority: false,
      task_limit: taskLimit,
    };

    try {
      const response = await fetch(
        "https://digital-detox-y73b.onrender.com/toDoList",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(newTodo),
          credentials: "include",
        }
      );
      if (response.ok) {
        setTodos((prevTodos) => [...prevTodos, newTodo]);
        toast.success("Task added successfully!");
        setInputValue("");
        setTaskLimit(0);
      } else {
        toast.error("Failed to add task.");
      }
    } catch (error) {
      toast.error("An error occurred while adding the task.");
    }
  };

  const toggleTodo = async (taskName: string) => {
    const updatedTodos = todos.map((todo) =>
      todo.task_name === taskName ? { ...todo, status: !todo.status } : todo
    );
    setTodos(updatedTodos);
    try {
      await fetch(`https://digital-detox-y73b.onrender.com/toDoList`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          task_name: taskName,
          status: updatedTodos.find((todo) => todo.task_name === taskName)
            ?.status,
        }),
        credentials: "include",
      });
      toast.success("Task status updated successfully!");
    } catch (error) {
      toast.error("An error occurred while toggling task status.");
    }

    setTodos(
      updatedTodos.sort((a, b) => {
        if (a.status !== b.status) return a.status ? 1 : -1;
        return b.priority ? 1 : -1;
      })
    );
  };

  const deleteTodo = async (taskName: string) => {
    try {
      const response = await fetch(
        `https://digital-detox-y73b.onrender.com/toDoList`,
        {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ task_name: taskName }),
          credentials: "include",
        }
      );

      if (response.ok) {
        setTodos((prevTodos) =>
          prevTodos.filter((todo) => todo.task_name !== taskName)
        );
        toast.success("Task deleted successfully.");
      } else {
        toast.error("Failed to delete task.");
        // console.log("delete ", res.message);
      }
    } catch (error) {
      toast.error("An error occurred while deleting the task.");
    }
  };

  const updatePriority = async (taskName: string) => {
    const updatedTodos = todos.map((todo) =>
      todo.task_name === taskName ? { ...todo, priority: !todo.priority } : todo
    );

    const currentTodo = todos.find((todo) => todo.task_name === taskName);
    if (currentTodo && currentTodo.status) {
      toast.info("Cannot update priority for completed tasks.");
      return; // Exit the function if the task is completed
    }

    setTodos(updatedTodos);

    try {
      await fetch("https://digital-detox-y73b.onrender.com/toDoList", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          task_name: taskName,
          priority: updatedTodos.find((todo) => todo.task_name === taskName)
            ?.priority,
        }),
        credentials: "include",
      });
      toast.success("Priority updated successfully!");
    } catch (error) {
      toast.error("An error occurred while updating priority.");
    }

    // Sort todos after priority change
    setTodos(
      updatedTodos.sort((a, b) => {
        if (a.status !== b.status) return a.status ? 1 : -1;
        return b.priority ? 1 : -1;
      })
    );
  };

  const sortedTodos = [...todos].sort(
    (a, b) => (b.priority ? 1 : 0) - (a.priority ? 1 : 0)
  );

  return (
    <div className="max-w-full min-h-[85vh] mx-5 md:mx-10 mt-5 md:mt-10 p-10 border rounded-lg shadow-lg bg-white">
      <h1 className="text-4xl font-bold text-center mb-10">Todo List</h1>
      <form
        onSubmit={addTodo}
        className="flex w-full sm:flex-row flex-col space-x-5 justify-center items-center mb-5"
      >
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
        <button
          type="submit"
          className="bg-blue-500 w-full mb-4 text-white p-2 rounded-md"
        >
          Add Task
        </button>
      </form>
      
      <h2 className="text-2xl font-bold mb-4">Tasks In Progress</h2>
      {loading ? (
        <div className="flex justify-center">
          <LoadingCursor w={100} h={100} />
        </div>
      ) : (
        <Table className="table-responsive mt-5">
          <Thead>
            <Tr>
              <Th className="bg-black text-white border border-white px-4 py-2">
                Task Name
              </Th>
              <Th
                align="center"
                className="bg-black text-white border border-white px-4 py-2"
              >
                Time Limit
              </Th>
              <Th
                align="center"
                className="bg-black text-white border border-white px-4 py-2"
              >
                Priority
              </Th>
              <Th
                align="center"
                className="bg-black text-white border border-white px-4 py-2"
              >
                Actions
              </Th>
            </Tr>
          </Thead>
          <Tbody>
            {todos
              .filter((todo) => !todo.status)
              .map((todo) => (
                <Tr key={todo.task_name} className="bg-white">
                  <Td className="border border-slate-300 px-4 py-2 flex items-center">
                    <Checkbox
                      checked={todo.status}
                      onChange={() => toggleTodo(todo.task_name)}
                      color="primary"
                    />
                    <span className="ml-2">{todo.task_name}</span>
                  </Td>
                  <Td
                    align="center"
                    className="border border-slate-300 px-4 py-2"
                  >
                    {todo.task_limit}
                  </Td>
                  <Td
                    align="center"
                    className="border border-slate-300 px-4 py-2"
                  >
                    <IconButton onClick={() => updatePriority(todo.task_name)}>
                      <StarIcon
                        style={{ color: todo.priority ? "#fbc02d" : "#b3b3b3" }}
                      />
                    </IconButton>
                  </Td>
                  <Td
                    align="center"
                    className="border border-slate-300 px-4 py-2"
                  >
                    <IconButton
                      onClick={() => deleteTodo(todo.task_name)}
                      color="error"
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Td>
                </Tr>
              ))}
          </Tbody>
        </Table>
      )}

      <h2 className="text-2xl font-bold mb-4 mt-10">Completed Tasks</h2>
      {loading ? (
        <div className="flex justify-center">
          <LoadingCursor w={100} h={100} />
        </div>
      ) : (
        <Table className="mt-5 border border-black">
          <Thead>
            <Tr>
              <Th className="bg-black text-white border border-white">
                Task Name
              </Th>
              <Th
                align="center"
                className="bg-black text-white border border-white"
              >
                Time Limit
              </Th>
              <Th
                align="center"
                className="bg-black text-white border border-white"
              >
                Priority
              </Th>
              <Th
                align="center"
                className="bg-black text-white border border-white"
              >
                Actions
              </Th>
            </Tr>
          </Thead>
          <Tbody>
            {todos
              .filter((todo) => todo.status)
              .map((todo) => (
                <Tr
                  key={todo.task_name}
                  className="bg-green-100 border border-slate-300"
                >
                  <Td>
                    <Checkbox
                      checked={todo.status}
                      onChange={() => toggleTodo(todo.task_name)}
                      color="primary"
                    />
                    {todo.task_name}
                  </Td>
                  <Td className="border border-slate-300" align="center">
                    {todo.task_limit}
                  </Td>
                  <Td align="center">
                    <IconButton onClick={() => updatePriority(todo.task_name)}>
                      <StarIcon
                        style={{ color: todo.priority ? "#fbc02d" : "#b3b3b3" }}
                      />
                    </IconButton>
                  </Td>
                  <Td align="center" className="border border-slate-300">
                    <IconButton
                      onClick={() => deleteTodo(todo.task_name)}
                      color="error"
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Td>
                </Tr>
              ))}
          </Tbody>
        </Table>
      )}
      <ToastContainer />
    </div>
  );
};

export default TodoList;
