import { format, isFuture, parseISO } from 'date-fns';

import { state } from '../model/state';

import TaskController from './taskController';

import ProjectView from '../views/projectView';

const SidebarController = (() => {
  const ctrlTasksToday = () => {
    const date = new Date();
    const [day, month, year] = [
      date.getDate(),
      date.getMonth(),
      date.getFullYear(),
    ];

    const toShow = state.tasks.filter(
      (task) => task.date === format(new Date(year, month, day), 'yyyy-MM-dd'),
    );

    ProjectView.render(toShow);

    TaskController.addHandlersToTasks();
  };

  const ctrlTasksUpcoming = () => {
    const toShow = state.tasks.filter(
      (task) => task.date && isFuture(parseISO(task.date)),
    );

    ProjectView.render(toShow);

    TaskController.addHandlersToTasks();
  };

  const ctrlTasksFinished = () => {
    const toShow = state.tasks.filter((task) => task.status === 'finished');

    ProjectView.render(toShow);

    TaskController.addHandlersToTasks();
  };

  const ctrlHighPriority = () => {
    const toShow = state.tasks.filter((task) => task.priority === 'high');

    ProjectView.render(toShow);

    TaskController.addHandlersToTasks();
  };

  const ctrlMediumPriority = () => {
    const toShow = state.tasks.filter((task) => task.priority === 'medium');

    ProjectView.render(toShow);

    TaskController.addHandlersToTasks();
  };

  const ctrlLowPriority = () => {
    const toShow = state.tasks.filter((task) => task.priority === 'low');

    ProjectView.render(toShow);

    TaskController.addHandlersToTasks();
  };

  return {
    ctrlTasksToday,
    ctrlTasksUpcoming,
    ctrlTasksFinished,
    ctrlHighPriority,
    ctrlMediumPriority,
    ctrlLowPriority,
  };
})();

export default SidebarController;
