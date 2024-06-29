import type { Task } from '../types/types';
import View from './View';

class TaskView extends View {
  override _parentElement = document.querySelector(
    '.content-display',
  ) as HTMLElement;
  _navShowAll = document.querySelector('.tasks-all') as HTMLElement;

  addHandlerToggleStatus = (
    handler: (data: { id: string; status: string }) => void,
  ) => {
    const statusBoxes = [...document.querySelectorAll('.task-status')];

    statusBoxes.forEach((box) =>
      box.addEventListener('click', (e) => {
        if (e.target instanceof HTMLInputElement) {
          const targetTask = e.target.closest('.task') as HTMLElement;
          const id = targetTask.dataset['id'] as string;

          const status = e.target.checked ? 'finished' : 'on-going';

          handler({ id, status });
        }
      }),
    );
  };

  addHandlerDeleteTask = (handler: (id: string) => void) => {
    const tasks = [...document.querySelectorAll('.task')];

    tasks.forEach((task) =>
      task.addEventListener('click', (e) => {
        if (e.target instanceof HTMLElement) {
          if (
            e.target.parentNode instanceof HTMLElement &&
            !e.target.parentNode.classList.contains('display-icon-delete')
          )
            return;

          const targetTask = e.target.closest('.task') as HTMLElement;
          const id = targetTask.dataset['id'] as string;

          handler(id);
        }
      }),
    );
  };

  override _generateMarkup = () => {
    this._changeTitle('All tasks');

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

  override _generateBackup = () => {
    const markup = `
          <div class="task priority-medium" data-id="null">

              <div class="task-left">
                <input
                  type="checkbox"
                  name="task-status"
                  id="task-status"
                  class="task-status"
                />
                <span class="task-title">Sample Task</span>
              </div>

              <div class="task-right">
                <div class="task-details-icon">
                  Details
                </div>

                <div class="task-display-icon task-edit">
                  <span class="material-symbols-outlined">
                    edit
                  </span>
                </div>
                <div class="task-display-icon task-delete">
                  <span class="material-symbols-outlined">
                    delete
                  </span>
                </div>
              </div>
          </div>`;

    return markup;
  };
}

export default new TaskView();
