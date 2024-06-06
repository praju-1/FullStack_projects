// src/TaskList.js
import React, { useEffect, useState } from 'react';

import './TaskList.css'

function TaskList() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTasks = async () => {
      setLoading(true);
      try {
        const res = await fetch('http://localhost:5000/tasks');
        if (!res.ok) throw new Error('Failed to fetch tasks');
        const data = await res.json();
        setTasks(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, []);

  const handleAddTask = async () => {
    try {
      const res = await fetch('http://localhost:5000/tasks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: newTask }),
      });
      if (!res.ok) throw new Error('Failed to add task');
      await res.json();
      setNewTask('');
      const updatedTasks = await fetch('http://localhost:5000/tasks');
      const data = await updatedTasks.json();
      setTasks(data);
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="task-manager">
      <h1>Task Manager</h1>
      <div className="input-container">
        <input
          type="text"
          placeholder="New task"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
        />
        <button onClick={handleAddTask}>Add Task</button>
      </div>
      {loading ? (
        <p>Loading tasks...</p>
      ) : error ? (
        <p>Error: {error}</p>
      ) : (
        <ul>
          {tasks.map((task, index) => (
            <li key={index}>{task.text}</li>
          ))}
        </ul>
      )}
    </div>
  );
}


export default TaskList;
