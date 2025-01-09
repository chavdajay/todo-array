//This file sets up the Redux store.
import { configureStore } from '@reduxjs/toolkit';
import taskReducer from './taskSlice';

const store = configureStore({
  reducer: {
    tasks: taskReducer,
  },
});

export default store;
