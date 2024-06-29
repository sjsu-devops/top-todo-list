import type { Project } from '../types/types';
import modalView from './modalView';

class EditProjectView extends modalView {
  override _parentElement = document.querySelector(
    '.modal-details',
  ) as HTMLElement | null;
  override _overlay = document.querySelector('.overlay') as HTMLElement | null;

  addHandlerEditProject = (handler: (id: string) => void) => {
    document.querySelectorAll('.edit-project-icon').forEach((btn) =>
      btn.addEventListener('click', (e) => {
        if (e.target instanceof HTMLElement) {
          const targetProject = e.target.closest(
            '.nav--project',
          ) as HTMLSpanElement;
          const id = targetProject.dataset['id'] as string;

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
  };

  addHandlerSaveEdit = (handler: (data: Project) => void) => {
    this._parentElement
      ?.querySelector('form')
      ?.addEventListener('submit', (e) => {
        e.preventDefault();

        const titleEl = this._parentElement?.querySelector(
          '#edit-project--title',
        ) as HTMLInputElement | null;
        const title = titleEl?.value;

        const id = this._parentElement?.dataset['id'] as string;

        const data = {
          title,
          id,
        };

        handler(data);

        this._changeTitle(title);
        this._closeModal();
      });
  };

  addHandlerDeleteProject = (handler: (id: string) => void) => {
    this._parentElement
      ?.querySelector('.delete--edit-project')
      ?.addEventListener('click', (e) => {
        if (e.target instanceof HTMLElement) {
          const targetProject = e.target.closest(
            '.modal-details',
          ) as HTMLDivElement;
          const id = targetProject?.dataset['id'] as string;

          handler(id);

          this._closeModal();
        }
      });
  };

  override _generateMarkup = () => {
    const projectData = this._data as Project;
    const markup = `
     <span class="edit-project--header">Edit Project</span>
     <span class="btn-close-modal-details material-symbols-outlined">close</span>  
      <form action="" class="edit-project--form">
          <input
            name="edit-project--title"
            id="edit-project--title"
            class="edit-project--form-element"
            minlength="1"
            maxlength="60"
            value="${projectData.title}"
            required
         />

        <div class="edit-project--btn-container">
            <button class="btn-submit submit--edit-project" type="submit">
              Save
            </button>
            <button class="btn-delete delete--edit-project" type="button">
              Delete
            </button>
          </div>
    </form>
    `;

    return markup;
  };

  override _generateBackup = () => 'You have not added anything yet';
}

export default new EditProjectView();
