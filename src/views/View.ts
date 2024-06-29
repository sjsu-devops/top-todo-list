import type { Project } from '../types/types';

export default class View {
  _data: unknown;
  _parentElement: HTMLElement | null;
  _generateMarkup: (data: any) => string;
  _generateBackup: () => string;

  render(data: any) {
    if (!data || (Array.isArray(data) && data.length === 0))
      return this._renderBackup();

    this._data = data;
    const markup = this._generateMarkup(data);

    this._clear();
    this._parentElement &&
      this._parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  renderProjects = (data: Project[], chosenProjID: string | null) => {
    let markup;

    if (!chosenProjID) {
      markup = data
        .map(
          (proj) =>
            `<option value="${proj.id}" class="project-option">${proj.title}</option>`,
        )
        .join('');
    } else if (chosenProjID) {
      const firstChoice = data.find((proj) => proj.id === chosenProjID);
      const others = data
        .filter((proj) => proj.id !== chosenProjID)
        .map(
          (proj) =>
            `<option value="${proj.id}" class="project-option">${proj.title}</option>`,
        )
        .join('');

      markup =
        firstChoice &&
        `<option value="${firstChoice.id}" class="project-option">${firstChoice.title}</option>
      ${others}`;
    }

    const projSelection = this._parentElement?.querySelector(
      '.select-project',
    ) as HTMLElement;

    projSelection.innerHTML = '';
    markup && projSelection.insertAdjacentHTML('afterbegin', markup);
  };

  _changeTitle = (text?: string) => {
    const titleEl = document.querySelector('.content-title');

    if (titleEl && text) titleEl.textContent = text;
  };

  _renderBackup() {
    const markup = this._generateBackup();
    this._clear();
    this._parentElement?.insertAdjacentHTML('afterbegin', markup);
  }

  _clear() {
    if (this._parentElement) this._parentElement.innerHTML = '';
  }

  _capitalizeFirstLetter(str: string) {
    return str[0] && str[0].toUpperCase() + str.slice(1);
  }

  _unhideEl(el: HTMLElement) {
    el.classList.remove('hidden');
  }

  _hideEl(el: HTMLElement) {
    el.classList.add('hidden');
  }

  _toggleEl(el: HTMLElement) {
    el.classList.toggle('hidden');
  }
}
