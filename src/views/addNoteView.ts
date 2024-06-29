import type { NoteData } from '../types/types';
import ModalView from './modalView';

class AddNoteView extends ModalView {
  _navLink = document.querySelector('.modal-link--note') as HTMLElement | null;
  override _form = document.querySelector(
    '.modal-content.add-new--note',
  ) as HTMLFormElement | null;
  override _btnSubmit = document.querySelector(
    '.btn-submit.submit--new-note',
  ) as HTMLButtonElement | null;

  constructor() {
    super();
    this._addHandlerShowForm();
  }

  _addHandlerShowForm = () => {
    this._navLink &&
      this._navLink.addEventListener('click', this._showForm.bind(this));
  };

  addHandlerAddNote = (handler: (data: NoteData) => void) => {
    if (this._form) {
      this._form.addEventListener('submit', (e) => {
        e.preventDefault();

        let title, details;

        if (this._parentElement) {
          const titleEl = this._parentElement.querySelector(
            '#new-note--title',
          ) as HTMLTextAreaElement;
          const detailsEl = this._parentElement.querySelector(
            '#new-note--details',
          ) as HTMLTextAreaElement;

          title = titleEl.value;
          details = detailsEl.value;
        }

        const data = { title, details };

        handler(data);

        this._closeModal();
        this._form && this._form.reset();
      });
    }
  };
}

export default new AddNoteView();
