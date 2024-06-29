import type { Project } from '../types/types';
import View from './View';

class SidebarView extends View {
  override _parentElement = document.querySelector(
    '.nav--projects',
  ) as HTMLElement | null;

  addHandlerShowNavProjects = () => {
    document.querySelector('.hamburger-icon')?.addEventListener('click', () => {
      const projects = document.querySelector(
        '.nav--projects',
      ) as HTMLLIElement;

      projects.style.opacity = projects.style.opacity === '0' ? '1' : '0';
    });
  };

  hideNavProjects = () => this._renderBackup();

  override _generateMarkup = () => {
    const projectData = this._data as Project[];
    const markup = projectData
      .map(
        (proj) =>
          `<li role="navigation" tabindex="0" class="nav--project" data-id="${
            proj.id
          }">
            <span class="nav--project-title">${proj.title}</span>
            ${
              proj.id !== 'ID00000'
                ? '<span class="material-symbols-outlined edit-project-icon">edit</span>'
                : ''
            }   
          </li>`,
      )
      .join('');

    return markup;
  };

  override _generateBackup = () =>
    `<div class="nav-project" data-id="ID00000">Example Project</div>`;
}

export default new SidebarView();
