import React from 'react';

// Functional component representing the ToDoList

const ToDoList = ({ tasks, handleToggle, handleDelete }) => {
    return (
      <ul>
        {tasks.map((task) => (
          <li key={task.id}>
            <input
              type="checkbox"
              checked={task.completed}
              onChange={() => handleToggle(task.id)}
            />
            {/* Use the style attribute for conditional styling */}
            <span style={{ textDecoration: task.completed ? 'line-through' : 'none' }}>{task.title}</span>
            <button onClick={() => handleDelete(task.id)}>Delete</button>
          </li>
        ))}
      </ul>
    );
  };
  

export default ToDoList;
