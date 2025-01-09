//This file defines the Redux slice for task management.
//It contains reducers, actions, and localStorage persistence logic.

import { createSlice } from '@reduxjs/toolkit';

// Load initial state from localStorage
const loadFromLocalStorage = () => {
  const savedTasks = localStorage.getItem('tasks');
  return savedTasks ? JSON.parse(savedTasks) : [];
};

// Save tasks to localStorage whenever the state changes
const saveToLocalStorage = (tasks) => {
  localStorage.setItem('tasks', JSON.stringify(tasks));
};

const taskSlice = createSlice({
  name: 'tasks',
  initialState: loadFromLocalStorage(),
  reducers: {
    addTask: (state, action) => {
      state.push(action.payload);
      saveToLocalStorage(state);
    },
  },
});

export const { addTask } = taskSlice.actions;

export const selectAllTasks = (state) => state.tasks;

// Helper function to structure parent-child tasks
export const buildTaskHierarchy = (tasks, parentId = null) => 
  tasks
    .filter(task => task.parentTaskId === parentId)
    .map(task => ({
      ...task,
      childTasks: buildTaskHierarchy(tasks, task.id)
    }));

export default taskSlice.reducer;
