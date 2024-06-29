import type { ProjectData } from '../types/types';
import ModalView from './modalView';

class AddProjectView extends ModalView {
  _navLink = document.querySelector(
    '.modal-link--project',
  ) as HTMLElement | null;
  override _form = document.querySelector(
    '.modal-content.add-new--project',
  ) as HTMLFormElement | null;
  override _btnSubmit = document.querySelector(
    '.btn-submit.submit--new-project',
  ) as HTMLButtonElement | null;

  constructor() {
    super();
    this._addHandlerShowForm();
  }

  _addHandlerShowForm = () => {
    this._navLink &&
      this._navLink.addEventListener('click', this._showForm.bind(this));
  };

  addHandlerAddProject = (handler: (data: ProjectData) => void) => {
    if (this._form) {
      this._form.addEventListener('submit', (e) => {
        e.preventDefault();

        if (this._parentElement) {
          const titleEl = this._parentElement.querySelector(
            '#new-project--title',
          ) as HTMLTextAreaElement;
          const title = titleEl.value;

          const data = { title };

          handler(data);
          this._closeModal();
          this._form && this._form.reset();
        }
      });
    }
  };
}

export default new AddProjectView();
