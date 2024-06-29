import type { Note } from '../types/types';
import View from './View';

class NoteView extends View {
  override _parentElement = document.querySelector(
    '.content-display',
  ) as HTMLElement | null;
  _btnShowNotes = document.querySelector(
    '.nav--notes',
  ) as HTMLButtonElement | null;

  constructor() {
    super();
    this.addHandlerEditNotes();
    this.addHandlerDeleteNotes();
  }

  addHandlerShowNotes = (handler: () => void) => {
    this._btnShowNotes &&
      this._btnShowNotes.addEventListener('click', () => {
        handler();
        this._changeTitle('Notes');
      });
  };

  addHandlerEditNotes = (handler?: (data: Note) => void) => {
    const notes = [...document.querySelectorAll('.note')];

    notes.forEach((note) =>
      note.addEventListener('focusout', (e) => {
        if (e.target instanceof HTMLElement) {
          const noteToChange = e.target.closest('.note') as HTMLElement;
          const id = noteToChange.dataset['id'] as string;

          const title = noteToChange.querySelector('.note-title')
            ?.textContent as string;
          const details = noteToChange.querySelector('.note-details')
            ?.textContent as string;

          if (handler) handler({ title, details, id });
        }
      }),
    );
  };

  addHandlerDeleteNotes = (handler?: (id: string) => void) => {
    const deleteBtns = [...document.querySelectorAll('.btn-delete-note')];

    deleteBtns.forEach((btn) =>
      btn.addEventListener('click', (e) => {
        if (e.target instanceof HTMLElement) {
          const noteToDelete = e.target.closest('.note') as HTMLElement;
          const id = noteToDelete.dataset['id'] as string;

          if (handler) handler(id);
        }
      }),
    );
  };

  override _generateMarkup = () => {
    const noteData = this._data as Note[];
    const even = noteData.filter((_: unknown, i: number) => i % 2 === 0);
    const odd = noteData.filter((_: unknown, i: number) => i % 2 !== 0);

    const markup = `
        <div class="notes-container">
            <div class="notes-col-1">
            ${this._generateNoteMarkup(even)}</div>
            <div class="notes-col-2">
            ${this._generateNoteMarkup(odd)}</div>
        </div>`;

    return markup;
  };

  _generateNoteMarkup = (data: Note[]) => {
    const markup = data
      .map(
        (note) => `
            <article class="note" data-id="${note.id}" aria-label="note">
              <button class="btn-delete-note">
                <span class="material-symbols-outlined">close</span>
              </button>
              <div class="note-title" contenteditable="true">
                ${note.title}
              </div>
              <div class="note-details" contenteditable="true">
                ${note.details}
              </div>
            </article>
         `,
      )
      .join('');

    return markup;
  };

  override _generateBackup = () => `
            <div class="note" id="null">
              <div class="note-title" contenteditable="true">
                Sample Note
              </div>
              <div class="note-details" contenteditable="true">
                You are seeing this sample because you have not added any notes yet. Add one now!
              </div>
            </div>
         `;
}

export default new NoteView();
