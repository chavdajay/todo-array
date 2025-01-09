//This component fetches the task hierarchy and displays all tasks in a structured list.
//It connects to the Redux store to get the task hierarchy.

import React from 'react';
import { useSelector } from 'react-redux';
import Task from './Task';
import TaskForm from './TaskForm';
import { buildTaskHierarchy, selectAllTasks } from '../store/taskSlice';


const TaskList = () => {
  const tasks = useSelector(selectAllTasks);
  const hierarchicalTasks = buildTaskHierarchy(tasks);

  return (
    <div>
      <h1>To-Do List</h1>
      <TaskForm />
      <ul>
        {hierarchicalTasks.map(task => (
          <Task key={task.id} task={task} />
        ))}
      </ul>
      <h2>Tasks Data (Array Format)</h2>
      <pre>{JSON.stringify(hierarchicalTasks, null, 2)}</pre>
    </div>
  );
};

export default TaskList;
