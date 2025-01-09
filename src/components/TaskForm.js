//This component is the form to add new tasks.
//It uses Redux dispatch to add new tasks to the store.

import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addTask, selectAllTasks } from '../store/taskSlice';

const TaskForm = () => {
  const dispatch = useDispatch();
  const tasks = useSelector(selectAllTasks);
  
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState('active');
  const [parentTaskId, setParentTaskId] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const newTask = {
      id: Date.now(),
      name,
      description,
      status,
      createdAt: new Date().toLocaleDateString(),
      parentTaskId: parentTaskId ? parseInt(parentTaskId) : null
    };
    dispatch(addTask(newTask));
    setName('');
    setDescription('');
    setStatus('active');
    setParentTaskId('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input 
        type="text" 
        placeholder="Task Name" 
        value={name} 
        onChange={(e) => setName(e.target.value)} 
        required 
        pattern="[A-Za-z0-9 ]+" 
      /><br/>
      <textarea 
        placeholder="Task Description" 
        value={description} 
        onChange={(e) => setDescription(e.target.value)} 
        required 
      /><br/>
      <div>
        <label>
          <input 
            type="radio" 
            value="active" 
            checked={status === 'active'} 
            onChange={() => setStatus('active')} 
          /> Active
        </label>
        <label>
          <input 
            type="radio" 
            value="inactive" 
            checked={status === 'inactive'} 
            onChange={() => setStatus('inactive')} 
          /> Inactive
        </label>
      </div>
      <select value={parentTaskId} onChange={(e) => setParentTaskId(e.target.value)}>
        <option value="">Parent</option>
        {tasks.map(task => (
          <option key={task.id} value={task.id}>{task.name}</option>
        ))}
      </select><br/>
      <button type="submit">Add Task</button>
    </form>
  );
};

export default TaskForm;
