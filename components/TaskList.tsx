// components/TodoList.tsx
"use client";
import { useState, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import StarIcon from '@mui/icons-material/Star';

interface Todo {
  task_name: string;
  status: boolean;
  priority: boolean; // 0 for no priority, 1 for high priority
  task_limit: number;
}

const TodoList = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [inputValue, setInputValue] = useState<string>("");
  const [taskLimit, setTaskLimit] = useState<number>(0);

  // Load todos from the backend on component mount
  const fetchTodos = async () => {
    console.log("running fetch");

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
        const todosWithPriority = Array.isArray(data.tasks) ? data.tasks : [];
        setTodos(todosWithPriority);
        console.log("Fetched todos with priority status:", todosWithPriority);
        console.log("fetch ", todos);
      } else {
        toast.error("Failed to fetch tasks.");
        console.log("error in fetch is ", data.message);
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

      const result = await response.json();
      if (response.ok) {
        setTodos((prevTodos) => [...prevTodos, newTodo]);
        toast.success("Task added successfully!");
        setInputValue("");
        setTaskLimit(0);
      } else {
        toast.error("Failed to add task.");
        console.log("POST Error", result.message);
        console.log("POST Error", newTodo);
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
  };

  const deleteTodo = async (text: string) => {
    try {
      const response = await fetch(
        `https://digital-detox-y73b.onrender.com/toDoList`,
        {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ task_name: text }),
          credentials: "include",
        }
      );

      const res = await response.json();

      if (response.ok) {
        setTodos((prevTodos) =>
          prevTodos.filter((todo) => todo.task_name !== text)
        );
        toast.success("Task deleted successfully.");
      } else {
        toast.error("Failed to delete task.");
        console.log("delete ", res.message);
      }
    } catch (error) {
      toast.error("An error occurred while deleting the task.");
    }
  };

  const updatePriority = async (taskName: string) => {
    const updatedTodos = todos.map((todo) =>
      todo.task_name === taskName ? { ...todo, priority: !todo.priority } : todo
    );
    setTodos(updatedTodos);

    try {
      await fetch(`https://digital-detox-y73b.onrender.com/toDoList`, {
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
  };

  const deleteCompleteTodos = async () => {
    try {
      const response = await fetch(
        `https://digital-detox-y73b.onrender.com/toDoList`,
        {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ status: true }), // Specify condition to delete incomplete tasks
          credentials: "include",
        }
      );
  
      const res = await response.json();
  
      if (response.ok) {
        // Filter out tasks with status as false and update the state
        setTodos((prevTodos) => prevTodos.filter((todo) => !todo.status));
        toast.success("completed tasks deleted successfully.");
      } else {
        toast.error("Failed to delete completed tasks.");
        console.log("Delete completed Error:", res.message);
      }
    } catch (error) {
      toast.error("An error occurred while deleting completed tasks.");
    }
  };

  const clearCompleted = () => {
    const completedTodos = todos.some((todo) => todo.status);
    if (completedTodos) {
      setTodos((prevTodos) => prevTodos.filter((todo) => !todo.status));
      toast.success("Completed tasks cleared successfully!");
    } else {
      toast.info("No completed tasks to clear!");
    }
  };

  const sortedTodos = [...todos].sort(
    (a, b) => (b.priority ? 1 : 0) - (a.priority ? 1 : 0)
  );

  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.grey[300],
      color: theme.palette.common.black,
      wordBreak: "break-word",
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
      wordBreak: "break-word",
    },
  }));

  const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
}));


  return (
    <div className="max-w-full min-h-[85vh] mx-10 mt-10 p-10 border rounded-lg shadow-lg bg-white">
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

      {/* <table className="w-full mt-10 table-auto border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-200">
            <th className="border border-gray-300 p-2">Task Name</th>
            <th className="border border-gray-300 p-2">Time Limit</th>
            <th className="border border-gray-300 p-2">Priority</th>
            <th className="border border-gray-300 p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {sortedTodos.map((todo) => (
            <tr
              key={todo.task_name}
              className={todo.status ? "bg-green-100" : "#fff"}
            >
              <td className="border flex  p-2">
                <input
                  type="checkbox"
                  checked={todo.status}
                  onChange={() => toggleTodo(todo.task_name)}
                  className="form-checkbox mx-2"
                />
                {todo.task_name}
              </td>
              <td className="border p-2 ">
                {todo.task_limit} hr
              </td>
              <td className="border p-2">
                <svg
                  onClick={() => updatePriority(todo.task_name)}
                  className={`w-6 h-6 cursor-pointer ${
                    todo.priority ? "text-yellow-500" : "text-gray-300"
                  }`}
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M10 15.27L16.18 19l-1.64-7.03L20 8.24l-7.19-.61L10 1 7.19 7.63 0 8.24l5.46 3.73L3.82 19z" />
                </svg>
                {todo.priority}
              </td>
              <td className="p-2 text-center space-x-3">
                <button
                  onClick={() => deleteTodo(todo.task_name)}
                  className="text-red-500"
                >
                  <img src="/delete.svg" alt="Delete" className="w-[20px]" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table> */}
      <TableContainer component={Paper} className="mt-10">
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Task Name</StyledTableCell>
            <StyledTableCell align="right">Time Limit</StyledTableCell>
            <StyledTableCell align="right">Priority</StyledTableCell>
            <StyledTableCell align="right">Actions</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {sortedTodos.map((todo) => (
            <StyledTableRow key={todo.task_name} style={{ backgroundColor: todo.status ? '#d1f7c4' : '#ffffff' }}>
              <StyledTableCell component="th" scope="row">
                <Checkbox
                  checked={todo.status}
                  onChange={() => toggleTodo(todo.task_name)}
                  color="primary"
                />
                {todo.task_name}
              </StyledTableCell>
              <StyledTableCell align="right">{todo.task_limit} hr</StyledTableCell>
              <StyledTableCell align="right">
                <IconButton onClick={() => updatePriority(todo.task_name)}>
                  <StarIcon style={{ color: todo.priority ? '#fbc02d' : '#e0e0e0' }} />
                </IconButton>
              </StyledTableCell>
              <StyledTableCell align="center">
                <IconButton onClick={() => deleteTodo(todo.task_name)} color="error">
                  <DeleteIcon />
                </IconButton>
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>

      <button
        onClick={deleteCompleteTodos}
        className="mt-5 bg-red-500 text-white p-2 rounded-md"
      >
        Clear Completed Tasks
      </button>
      <ToastContainer />
    </div>
  );
};

export default TodoList;
