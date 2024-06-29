import format from 'date-fns/format';
import View from './View';

export default class ModalView extends View {
  override _parentElement = document.querySelector(
    '.modal',
  ) as HTMLElement | null;
  _overlay = document.querySelector('.overlay') as HTMLElement | null;
  _window = document.querySelector(
    '.modal-content-wrapper',
  ) as HTMLElement | null;
  _btnAdd = document.querySelector('.btn-add') as HTMLButtonElement | null;

  _btnCloseModal = this._parentElement?.querySelector(
    '.btn-close-modal',
  ) as HTMLButtonElement | null;
  _btnSubmit = this._parentElement?.querySelector(
    '.btn-submit',
  ) as HTMLButtonElement | null;

  _modalLinks = [
    ...(this._parentElement?.querySelectorAll(
      '.modal-link',
    ) as NodeListOf<HTMLLIElement>),
  ];
  _modalFormContainer = [
    ...(this._parentElement?.querySelectorAll(
      '.modal-content',
    ) as NodeListOf<HTMLFormElement>),
  ];

  _priorityList: Element[];
  _form: HTMLFormElement | null;

  _addHandlerShowModal = () => {
    this._btnAdd && this._btnAdd.addEventListener('click', this._showModal);
  };

  _addHandlerCloseModal = () => {
    this._btnCloseModal &&
      this._btnCloseModal.addEventListener('click', this._closeModal);
  };

  _addHandlerTogglePriority = () => {
    this._priorityList.forEach((el) =>
      el.addEventListener('click', (e) => {
        this._priorityList.forEach((priority) =>
          priority.classList.remove('priority-active'),
        );

        if (e.target instanceof HTMLElement)
          e.target.classList.add('priority-active');
      }),
    );
  };

  _showModal = () => {
    this._parentElement && this._unhideEl(this._parentElement);
    this._overlay && this._unhideEl(this._overlay);

    const dateEl = this._parentElement?.querySelector(
      '#new-task--date',
    ) as HTMLInputElement;

    dateEl.value = this._formatDateForForm();
  };

  _closeModal = () => {
    this._parentElement && this._hideEl(this._parentElement);
    this._overlay && this._hideEl(this._overlay);

    this._resetForms();
    this._parentElement && this._parentElement.removeAttribute('data-id');
  };

  _showForm = (e: Event) => {
    if (e.target instanceof HTMLElement) this._makeActiveLink(e.target);

    this._modalFormContainer.forEach((form) => {
      this._resetForms();
      this._hideEl(form);
    });

    const dateEl = this._parentElement?.querySelector(
      '#new-task--date',
    ) as HTMLInputElement;

    dateEl.value = this._formatDateForForm();

    this._form && this._unhideEl(this._form);
  };

  _resetForms = () => {
    [
      ...(this._parentElement?.querySelectorAll(
        'form',
      ) as NodeListOf<HTMLFormElement>),
    ].forEach((form) => form.reset());
  };

  _makeActiveLink = (target: HTMLElement) => {
    this._modalLinks.forEach((link) =>
      link.classList.remove('modal-link--active'),
    );
    target.classList.add('modal-link--active');
  };

  _formatDateForForm = () => {
    const date = new Date();
    const [day, month, year] = [
      date.getDate(),
      date.getMonth(),
      date.getFullYear(),
    ];

    return format(new Date(year, month, day), 'yyyy-MM-dd');
  };

  _validateTask(arr: [string, string, string]) {
    const [title, date, priority] = arr;

    return !(!title || !date || !priority);
  }
}
