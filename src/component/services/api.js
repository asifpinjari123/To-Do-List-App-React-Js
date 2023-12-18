// API endpoint for the ToDo tasks
const API_URL = 'https://jsonplaceholder.typicode.com/todos';

// Function to fetch tasks from the API
export const getTasks = () =>
  fetch(API_URL).then((response) => response.json());

// Function to add a new task to the API
export const addTask = (task) =>
  fetch(API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(task),
  }).then((response) => response.json());

// Function to update an existing task by ID in the API
export const updateTask = (id, updates) =>
  fetch(`${API_URL}/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(updates),
  }).then((response) => response.json());

// Function to delete an existing task by ID from the API
export const deleteTask = (id) =>
  fetch(`${API_URL}/${id}`, {
    method: 'DELETE',
  }).then((response) => response.json());
