import type { Task } from '../types/types';
import ModalView from './modalView';
import format from 'date-fns/format';

class TaskDetailsView extends ModalView {
  override _window = document.querySelector(
    '.modal-details',
  ) as HTMLDivElement | null;
  override _parentElement = document.querySelector(
    '.modal-details',
  ) as HTMLElement | null;
  override _overlay = document.querySelector('.overlay') as HTMLElement | null;

  addHandlerShowTaskDetails(handler: (id: string) => void) {
    document.querySelectorAll('.task').forEach((el) =>
      el.addEventListener('click', (e) => {
        if (e.target instanceof HTMLElement) {
          if (!e.target.classList.contains('task-details-icon')) return;

          const targetTask = e.target.closest('.task') as HTMLElement;
          const id = targetTask.dataset['id'] as string;

          this._parentElement &&
            this._parentElement.setAttribute('data-id', id);

          this._parentElement && this._unhideEl(this._parentElement);
          this._overlay && this._unhideEl(this._overlay);

          handler(id);

          this._btnCloseModal = document.querySelector(
            '.btn-close-modal-details',
          );
          this._addHandlerCloseModal();
        }
      }),
    );
  }

  override _generateMarkup = (data: Task) => ` 
       <span class="btn-close-modal-details material-symbols-outlined">close</span>  
        <div class="detail--task-title">${data.title}</div>
        <div class="detail--task-details">
          ${data.details}
        </div>
        <div class="detail--task-date">Date: ${format(
          new Date(data.date || 0),
          'MMMM d, yyy',
        )}</div>
        <div class="detail--task-priority">Priority: ${this._capitalizeFirstLetter(
          data.priority,
        )}</div>
        <div class="detail--task-status">Status: ${this._capitalizeFirstLetter(
          data.status,
        )}</div>
        <div class="detail--task-project-name">Project: ${
          data.projectName
        }</div>

        <div class="detail--btn-container">
          <button class="detail--btn-edit task-edit">Edit</button>
        </div>`;

  override _generateBackup = () => `
        <span class="btn-close-modal-details material-symbols-outlined">close</span> 
        <div class="detail--task-title">Sample Task</div>
        <div class="detail--task-details">
          You are seeing this sample task because you have not added a task yet. Add one now!
        </div>
        <div class="detail--task-date">Date: Jan. 1, 2000</div>
        <div class="detail--task-priority">Priority: High</div>
        <div class="detail--task-status">Status: On-going</div>
        <div class="detail--task-project-name">Project: Home</div>

        <div class="detail--btn-container hidden">
          <button class="detail--btn-edit task-edit">Edit</button>
        </div> 
  `;
}

export default new TaskDetailsView();
