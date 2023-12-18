import React, { useEffect, useState } from 'react';
import ToDoList from '../src/component/ToDoList';
import AddTaskForm from '../src/component/AddTaskForm';
import { getTasks, addTask, updateTask, deleteTask } from '../src/component/services/api';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';

// Main App component
const App = () => {
  // State to manage tasks
  const [tasks, setTasks] = useState([]);

  // Effect to load tasks from local storage and API on component mount
  useEffect(() => {
    // Retrieve tasks from local storage or initialize as an empty array
    const storedTasks = JSON.parse(localStorage.getItem('tasks')) || [];
    setTasks(storedTasks);

    // Fetch tasks from the API and update the state
    getTasks().then((data) => {
      // Set tasks from API only if local storage is empty
      if (storedTasks.length === 0) {
        setTasks(data);
      }
    });
  }, []);

  // Effect to save tasks to local storage whenever the tasks state changes
  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  // Function to handle adding a new task
  const handleAddTask = (title) => {
    // Call the API to add a new task and update the state
    addTask({ title, completed: false }).then((data) => {
      setTasks([...tasks, data]);
      toast.success('Task added successfully!', { position: toast.POSITION.BOTTOM_CENTER });
    });
  };

  // Function to handle toggling the completion status of a task
  const handleToggle = (id) => {
    // Map over tasks and toggle completion status of the selected task
    const updatedTasks = tasks.map((task) =>
      task.id === id ? { ...task, completed: !task.completed } : task
    );

    // Call the API to update the completion status and update the state
    updateTask(id, { completed: !tasks.find((task) => task.id === id).completed }).then(() => {
      setTasks(updatedTasks);
      toast.info('Task status updated!', { position: toast.POSITION.BOTTOM_CENTER });
    });
  };

  // Function to handle updating the title of a task
  const handleUpdate = (id, updatedTitle) => {
    // Map over tasks and update the title of the selected task
    const updatedTasks = tasks.map((task) =>
      task.id === id ? { ...task, title: updatedTitle } : task
    );

    // Call the API to update the task title and update the state
    updateTask(id, { title: updatedTitle }).then(() => {
      setTasks(updatedTasks);
      toast.info('Task updated!', { position: toast.POSITION.BOTTOM_CENTER });
    });
  };

  // Function to handle deleting a task
  const handleDelete = (id) => {
    // Filter out the selected task and update the state
    const updatedTasks = tasks.filter((task) => task.id !== id);
    setTasks(updatedTasks);

    // Call the API to delete the selected task and display a notification
    deleteTask(id).then(() => {
      toast.error('Task deleted!', { position: toast.POSITION.BOTTOM_CENTER });
    });
  };

  // Render the main application
  return (
    <div className="app">
      <h1>To-Do List</h1>
      {/* ToastContainer for displaying notifications */}
      <ToastContainer />
      {/* AddTaskForm component for adding new tasks */}
      <AddTaskForm handleAddTask={handleAddTask} />
      {/* ToDoList component for displaying and managing tasks */}
      <ToDoList tasks={tasks} handleToggle={handleToggle} handleDelete={handleDelete} handleUpdate={handleUpdate} />
    </div>
  );
};

export default App;
