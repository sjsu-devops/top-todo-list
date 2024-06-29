import { state } from './state';

import Firestore from './firestore';

import type { TaskData, Task } from '../types/types';

const TaskModel = (() => {
  let userId: string;

  const createTask = (data: TaskData): Task => ({
    title: data.title,
    details: data.details,
    priority: data.priority,
    id: `ID${Math.random().toString(16).slice(2)}`,
    projectName: data.projectName,
    projectID: data.projectID,
    status: data.status,
    date: data.date,
  });

  const addTask = async (data: TaskData) => {
    const newTask = createTask(data);

    state.tasks = [newTask, ...state.tasks];

    await Firestore.updateTasks(state.tasks, userId);
  };

  const updateTask = async (data: { id: string; status: string }) => {
    const target = state.tasks.find((t) => t.id === data.id);
    const otherTasks = state.tasks.filter((t) => t.id !== data.id);

    if (target) {
      Object.assign(target, data);

      // Move updated task to start of array
      state.tasks = [target, ...otherTasks];

      await Firestore.updateTasks(state.tasks, userId);
    }
  };

  const deleteTask = async (id: string) => {
    state.tasks = state.tasks.filter((task) => task.id !== id);

    await Firestore.updateTasks(state.tasks, userId);
  };

  const initializeModel = async (currentUserId: string) => {
    userId = currentUserId;
    state.tasks = await Firestore.getTasks(userId);
  };

  return {
    addTask,
    updateTask,
    deleteTask,
    initializeModel,
  };
})();

export default TaskModel;
