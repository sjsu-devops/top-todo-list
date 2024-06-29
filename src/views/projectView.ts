import View from './View';

import type { Task } from '../types/types';

class ProjectView extends View {
  override _parentElement = document.querySelector(
    '.content-display',
  ) as HTMLElement | null;

  addHandlerShowTasks = (handler: (id: string) => void) => {
    document.querySelectorAll('.nav--project').forEach((proj) =>
      proj.addEventListener('click', (e) => {
        if (e.target instanceof HTMLElement) {
          if (!e.target.classList.contains('nav--project-title')) return;

          const targetProject = e.target.closest(
            '.nav--project',
          ) as HTMLLIElement;
          const id = targetProject.dataset['id'] as string;

          e.target.textContent && this._changeTitle(e.target.textContent);

          handler(id);
        }
      }),
    );
  };

  addHandlerTasksAll = (handler: () => void) => {
    document.querySelector('.tasks-all')?.addEventListener('click', () => {
      handler();
      this._changeTitle('All tasks');
    });
  };

  addHandlerTasksToday = (handler: () => void) => {
    document.querySelector('.tasks-today')?.addEventListener('click', () => {
      handler();
      this._changeTitle('Due Today');
    });
  };

  addHandlerTasksUpcoming = (handler: () => void) => {
    document.querySelector('.tasks-upcoming')?.addEventListener('click', () => {
      handler();
      this._changeTitle('Upcoming');
    });
  };

  addHandlerTasksFinished = (handler: () => void) => {
    document.querySelector('.tasks-finished')?.addEventListener('click', () => {
      handler();
      this._changeTitle('Finished');
    });
  };

  addHandlerHighPriority = (handler: () => void) => {
    document
      .querySelector('.tasks-high-priority')
      ?.addEventListener('click', () => {
        handler();
        this._changeTitle('High Priority');
      });
  };

  addHandlerMediumPriority = (handler: () => void) => {
    document
      .querySelector('.tasks-medium-priority')
      ?.addEventListener('click', () => {
        handler();
        this._changeTitle('Medium Priority');
      });
  };

  addHandlerLowPriority = (handler: () => void) => {
    document
      .querySelector('.tasks-low-priority')
      ?.addEventListener('click', () => {
        handler();
        this._changeTitle('Low Priority');
      });
  };

  override _generateMarkup = () => {
    const taskData = this._data as Task[];
    const markup = taskData
      .map(
        (task) => `
         <div class="task priority-${task.priority}" data-id="${task.id}">

              <div class="task-left">
                <input
                  type="checkbox"
                  name="task-status"
                  id="task-status"
                  class="task-status"
                  ${task.status === 'finished' ? 'checked' : ''}
                />
                <span class="task-title ${
                  task.status === 'finished' ? 'task-finished' : ''
                }">${task.title}</span>
              </div>

              <div class="task-right">
                <div class="task-details-icon" tabindex="0">
                  Details
                </div>

                <div class="task-display-icon display-icon-edit task-edit">
                  <span class="material-symbols-outlined">
                    edit
                  </span>
                </div>
                <div class="task-display-icon display-icon-delete task-delete">
                  <span class="material-symbols-outlined">
                    delete
                  </span>
                </div>
              </div>
          </div>
    `,
      )
      .join('');

    return markup;
  };

  override _generateBackup = () =>
    `<div class="placeholder-project">You have no tasks listed under this project/category currently.</div>`;
}

export default new ProjectView();
