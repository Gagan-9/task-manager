import React from 'react';

const TaskDetail = ({ task }) => {
  return (
    <div>
      <h2>{task.title}</h2>
      <p>{task.description}</p>
      <p>Created by: {task.user_id}</p>
    </div>
  );
};

export default TaskDetail;