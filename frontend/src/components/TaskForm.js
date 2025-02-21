import React, { useState } from 'react';
import { createTask } from '../api';

const TaskForm = ({ token }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createTask(title, description, token);
      alert('Task created successfully');
      setTitle('');
      setDescription('');
    } catch (error) {
      console.error('Failed to create task', error);
    }
  };

  return (
    <div>
      <h2>Create Task</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
        <button type="submit">Create Task</button>
      </form>
    </div>
  );
};

export default TaskForm;