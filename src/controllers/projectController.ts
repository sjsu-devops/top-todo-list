import { state } from '../model/state';
import ProjectModel from '../model/projectModel';

import TaskController from './taskController';

import SidebarView from '../views/sidebarView';
import EditProjectView from '../views/editProjectView';
import ProjectView from '../views/projectView';
import AddTaskView from '../views/addTaskView';

import type { Project, ProjectData } from '../types/types';

const ProjectController = (() => {
  const ctrlRenderProjectsOnSidebar = () => {
    SidebarView.render(state.projects);

    ProjectView.addHandlerShowTasks(ctrlShowTasksByProject);
    EditProjectView.addHandlerEditProject(ctrlEditProject);
  };

  const ctrlShowTasksByProject = (id: string) => {
    const toShow = state.tasks.filter((task) => task.projectID === id);

    ProjectView.render(toShow);

    TaskController.addHandlersToTasks();
  };

  const ctrlProjectsOnForm = () => {
    AddTaskView.renderProjects(state.projects, null);
  };

  const ctrlAddProject = async (data: ProjectData) => {
    await ProjectModel.addProject(data);

    ctrlRenderProjectsOnSidebar();
  };

  const ctrlEditProject = (id: string) => {
    const toShow = state.projects.find((project) => project.id === id);

    EditProjectView.render(toShow);

    EditProjectView.addHandlerSaveEdit(ctrlUpdateProject);
    EditProjectView.addHandlerDeleteProject(ctrlDeleteProject);
  };

  const ctrlUpdateProject = async (data: Project) => {
    await ProjectModel.updateProject(data);

    ctrlRenderProjectsOnSidebar();
    ctrlShowTasksByProject(data.id);
  };

  const ctrlDeleteProject = async (id: string) => {
    await ProjectModel.deleteProject(id);

    ctrlRenderProjectsOnSidebar();
  };

  return {
    ctrlRenderProjectsOnSidebar,
    ctrlShowTasksByProject,
    ctrlProjectsOnForm,
    ctrlAddProject,
    ctrlEditProject,
    ctrlDeleteProject,
  };
})();

export default ProjectController;
