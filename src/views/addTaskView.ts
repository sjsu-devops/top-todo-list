import type { TaskData } from '../types/types';
import ModalView from './modalView';

class AddTaskView extends ModalView {
  _navLink = document.querySelector('.modal-link--task') as HTMLElement | null;
  override _form = document.querySelector(
    '.modal-content.add-new--task',
  ) as HTMLFormElement | null;
  override _btnSubmit = document.querySelector(
    '.btn-submit.submit--new-task',
  ) as HTMLButtonElement | null;
  override _priorityList = [
    ...document.querySelectorAll('.new-task--priority-label'),
  ];
  _projectSelector = document.querySelector(
    '.new-task--task-project-wrapper',
  ) as HTMLDivElement;

  constructor() {
    super();

    this._addHandlerShowModal();
    this._addHandlerCloseModal();
    this._addHandlerShowForm();
    this._addHandlerTogglePriority();
    this.addHandlerListProjects();
  }

  _addHandlerShowForm = () => {
    this._navLink &&
      this._navLink.addEventListener('click', this._showForm.bind(this));
  };

  addHandlerAddTask = (handler: (data: TaskData) => void) => {
    this._form &&
      this._form.addEventListener('submit', (e) => {
        e.preventDefault();

        if (this._parentElement) {
          const titleEl = this._parentElement.querySelector(
            '#new-task--title',
          ) as HTMLTextAreaElement | null;
          const title = titleEl?.value as string;

          const dateEl = this._parentElement.querySelector(
            '#new-task--date',
          ) as HTMLInputElement | null;
          const date = dateEl?.value as string;

          const statusEl = this._parentElement.querySelector(
            '#new-task--status',
          ) as HTMLSelectElement | null;
          const status = statusEl?.value as string;

          const priorityEl = this._parentElement.querySelector(
            '.priority-active',
          )?.nextElementSibling as HTMLInputElement;
          const priority = priorityEl?.value as string;

          const detailsEl = this._parentElement.querySelector(
            '#new-task--details',
          ) as HTMLTextAreaElement | null;
          const details = detailsEl?.value as string;

          const projectIdEl = this._parentElement.querySelector(
            '#new-task--project',
          ) as HTMLSelectElement | null;
          const projectID = projectIdEl?.value as string;

          const projectOptions = [
            ...this._parentElement.querySelectorAll('.project-option'),
          ] as HTMLOptionElement[];
          const targetProjectEl = projectOptions.find(
            (projEl) => projEl.value === projectID,
          );
          const projectName = targetProjectEl?.textContent as string;

          if (this._validateTask([title, date, priority])) {
            const data = {
              title,
              date,
              status,
              priority,
              details,
              projectName,
              projectID,
            };

            // Stores data in model state through controller
            handler(data);

            this._changeTitle(projectName);

            this._closeModal();
            this._form && this._form.reset();
          }
        }
      });
  };

  addHandlerListProjects = (handler?: () => void) => {
    this._btnAdd && handler && this._btnAdd.addEventListener('click', handler);
  };
}

export default new AddTaskView();
