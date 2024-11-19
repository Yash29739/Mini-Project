// components/TodoList.tsx
"use client";
import { useState, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Checkbox from "@mui/material/Checkbox";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import StarIcon from "@mui/icons-material/Star";
import { Table, Thead, Tbody, Tr, Th, Td } from "react-super-responsive-table";
import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css";
import LoadingCursor from "@/app/loading";

interface Todo {
  task_name: string;
  status: boolean;
  priority: boolean;
  due_date: string; // Updated to include due date
}

const TodoList = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [ctr, setCtr] = useState(0);
  const [inputValue, setInputValue] = useState<string>("");
  const [dueDate, setDueDate] = useState("");
  const [loading, setloading] = useState(false);

  // Fetching the todo list
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
        const sortedTodos = (Array.isArray(data.tasks) ? data.tasks : [])
          .map((task: Todo) => ({
            ...task,
            due_date: task.due_date.split("T")[0], // Extract only the date
          }))
          .sort((a: Todo, b: Todo) => {
            if (a.status !== b.status) return a.status ? 1 : -1; // Move completed tasks to the end
            return b.priority ? 1 : -1; // Among uncompleted tasks, prioritize those with priority
          });
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

    // Run fetch only once
    if (ctr === 0) {
      fetchTodos();
      setCtr(1);
    }

    //Check for notification permission
    if (Notification.permission !== "granted") {
      Notification.requestPermission();
    }

    const interval = setInterval(checkOverdueTasks, 60000); // Check every minute
    return () => clearInterval(interval); // Cleanup on component unmount
  }, [todos]);

  const checkOverdueTasks = () => {
    const currentDate = new Date();
    todos.forEach((todo) => {
      const dueDate = new Date(todo.due_date);

      if (!todo.status && dueDate < currentDate) {
        // Notify user if the task is overdue
        new Notification("Task Overdue", {
          body: `The task "${todo.task_name}" is overdue!`,
        });
      }
    });
  };

  const addTodo = async (e: React.FormEvent) => {
    e.preventDefault();
    const trimmedInput = inputValue.trim();

    if (trimmedInput === "" || dueDate === "") {
      toast.info("Please fill all fields correctly.");
      return;
    }

    const currentDate = new Date();
    const selectedDate = new Date(dueDate);

    if (selectedDate > currentDate) {
      toast.error("Due date cannot be in the past.");
      return;
    }

    const newTodo: Todo = {
      task_name: trimmedInput,
      status: false,
      priority: false,
      due_date: dueDate,
    };

    try {
      const response = await fetch("https://digital-detox-y73b.onrender.com/toDoList", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newTodo),
        credentials: "include",
      });

      if (response.ok) {
        setTodos((prevTodos) => [...prevTodos, newTodo]);
        setInputValue("");
        setDueDate("");
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
        credentials: "include"
      });
      console.log("Updated to do list");

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
      } else {
        console.log("deleted message");
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
      console.log("Error saving to do list");

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

  return (
    <div className="max-w-full min-h-[85vh] mx-5 md:mx-10 mt-5 md:mt-10 p-10 border rounded-lg shadow-lg bg-white">
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
          type="date" // Changed input type to date
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          className="p-2 border mb-4 w-full rounded-lg"
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
                Due Date
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
                <Tr
                  key={todo.task_name}
                  className="border border-slate-300"
                >
                  <Td className="border border-slate-300 px-4 py-2">
                    <Checkbox
                      checked={todo.status}
                      onChange={() => toggleTodo(todo.task_name)}
                      color="primary"
                    />{todo.task_name}
                  </Td>

                  <Td className="border border-slate-300" align="center">
                    {todo.due_date}
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

      <h2 className="text-2xl font-bold mb-4 mt-10">Completed Tasks</h2>
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
                Due Date
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
              .filter((todo) => todo.status)
              .map((todo) => (
                <Tr
                  key={todo.task_name}
                  className="bg-green-100 border border-slate-300"
                >
                  <Td className="border border-slate-300 px-4 py-2">
                    <Checkbox
                      checked={todo.status}
                      onChange={() => toggleTodo(todo.task_name)}
                      color="primary"
                    />{todo.task_name}
                  </Td>

                  <Td className="border border-slate-300" align="center">
                    {todo.due_date}
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
