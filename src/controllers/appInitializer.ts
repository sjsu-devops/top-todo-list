import TaskModel from '../model/taskModel';
import ProjectModel from '../model/projectModel';
import NoteModel from '../model/noteModel';

import TaskController from './taskController';
import ProjectController from './projectController';
import SidebarController from './sidebarController';
import NoteController from './noteController';

import TaskView from '../views/taskView';
import TaskDetailsView from '../views/taskDetailsView';
import EditTaskView from '../views/editTaskView';
import SidebarView from '../views/sidebarView';
import ProjectView from '../views/projectView';
import NoteView from '../views/noteView';
import AddTaskView from '../views/addTaskView';
import AddProjectView from '../views/addProjectView';
import AddNoteView from '../views/addNoteView';

async function initializeTodo(userId: string) {
  // Model initializers
  console.log('Entering initializeTodo: Calling model initializers...');
  await TaskModel.initializeModel(userId);
  await ProjectModel.initializeModel(userId);
  await NoteModel.initializeModel(userId);

  // Task initializers
  TaskController.ctrlShowAllTasks();

  TaskView.addHandlerToggleStatus(TaskController.ctrlToggleStatus);
  TaskDetailsView.addHandlerShowTaskDetails(TaskController.ctrlTaskDetails);
  EditTaskView.addHandlerEditTask(TaskController.ctrlEditTask);
  TaskView.addHandlerDeleteTask(TaskController.ctrlDeleteTask);

  // Project / Sidebar initializers
  ProjectController.ctrlRenderProjectsOnSidebar();

  SidebarView.addHandlerShowNavProjects();

  ProjectView.addHandlerTasksAll(TaskController.ctrlShowAllTasks);
  ProjectView.addHandlerTasksFinished(SidebarController.ctrlTasksFinished);
  ProjectView.addHandlerTasksToday(SidebarController.ctrlTasksToday);
  ProjectView.addHandlerTasksUpcoming(SidebarController.ctrlTasksUpcoming);
  ProjectView.addHandlerHighPriority(SidebarController.ctrlHighPriority);
  ProjectView.addHandlerMediumPriority(SidebarController.ctrlMediumPriority);
  ProjectView.addHandlerLowPriority(SidebarController.ctrlLowPriority);

  // Note initializer
  NoteView.addHandlerShowNotes(NoteController.ctrlShowNotes);

  // Modal initializers
  AddTaskView.addHandlerAddTask(TaskController.ctrlAddTask);
  AddTaskView.addHandlerListProjects(ProjectController.ctrlProjectsOnForm);
  AddNoteView.addHandlerAddNote(NoteController.ctrlAddNote);
  AddProjectView.addHandlerAddProject(ProjectController.ctrlAddProject);
}

export default initializeTodo;
