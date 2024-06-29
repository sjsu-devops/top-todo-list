import { state } from './state';

import Firestore from './firestore';

import type { ProjectData, Project } from '../types/types';

const ProjectModel = (() => {
  const defaultProject = { title: 'Home', id: 'ID00000' };
  let userId: string;

  const createProject = (data: ProjectData) => ({
    title: data.title,
    id: `ID${Math.random().toString(16).slice(2)}`,
  });

  const addProject = async (data: ProjectData) => {
    const newProject = createProject(data);
    const otherProjects = state.projects.filter((p) => p.id !== 'ID00000');

    state.projects = [defaultProject, newProject, ...otherProjects];

    await Firestore.updateProjects(state.projects, userId);
  };

  const updateProject = async (data: Project) => {
    const target = state.projects.find((p) => p.id === data.id);
    const otherProjects = state.projects.filter(
      (p) => p.id !== data.id && p.id !== 'ID00000',
    );

    if (target) {
      data.title && updateProjectNames(data.id, data.title);
      Object.assign(target, data);

      state.projects = [defaultProject, target, ...otherProjects];

      await Firestore.updateProjects(state.projects, userId);
      await Firestore.updateTasks(state.tasks, userId);
    }
  };

  const deleteProject = async (id: string) => {
    deleteTasksUnderProject(id);

    state.projects = state.projects.filter((proj) => proj.id !== id);

    await Firestore.updateProjects(state.projects, userId);
    await Firestore.updateTasks(state.tasks, userId);
  };

  const updateProjectNames = (id: string, newProjName: string) => {
    state.tasks.forEach((task) => {
      if (task.projectID === id) {
        task.projectName = newProjName;
      }
    });
  };

  const deleteTasksUnderProject = (id: string) => {
    state.tasks = state.tasks.filter((task) => task.projectID !== id);
  };

  const initializeModel = async (currentUserId: string) => {
    userId = currentUserId;

    state.projects = await Firestore.getProjects(userId);
  };

  return {
    addProject,
    updateProject,
    deleteProject,
    updateProjectNames,
    deleteTasksUnderProject,
    initializeModel,
  };
})();

export default ProjectModel;
