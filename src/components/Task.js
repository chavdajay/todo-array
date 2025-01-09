//This component displays a single task and its child tasks recursively.
//It handles hierarchical task display.

import React from 'react';

const Task = ({ task }) => (
  <li>
    <strong>{task.name}</strong> ({task.status})<br />
    <em>{task.description}</em><br />
    Created At: {task.createdAt}<br />
    {task.childTasks.length > 0 && (
      <ul>
        {task.childTasks.map(childTask => (
          <Task key={childTask.id} task={childTask} />
        ))}
      </ul>
    )}
  </li>
);

export default Task;
