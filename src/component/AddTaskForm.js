import React, { useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Functional component representing the AddTaskForm
const AddTaskForm = ({ handleAddTask }) => {
  // State to manage the input value for the new task
  const [newTask, setNewTask] = useState('');

  // Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // Validate that the new task is not empty
    if (newTask.trim() === '') {
      toast.error('Please enter a task.', { position: toast.POSITION.BOTTOM_CENTER });
      return;
    }

    // Call the handleAddTask function to add the new task
    handleAddTask(newTask);

    // Clear the input field after adding the task
    setNewTask('');
  };

  // Render the form with an input field and a submit button
  return (
    <form onSubmit={handleSubmit}>
      {/* Input field for entering a new task */}
      <input
        type="text"
        placeholder="Add a new task..."
        value={newTask}
        onChange={(e) => setNewTask(e.target.value)}
      />
      {/* Submit button to add the new task */}
      <button type="submit">Add</button>
    </form>
  );
};

export default AddTaskForm;
