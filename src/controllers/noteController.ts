import { state } from '../model/state';
import NoteModel from '../model/noteModel';

import NoteView from '../views/noteView';

import type { NoteData, Note } from '../types/types';

const NoteController = (() => {
  const ctrlShowNotes = () => {
    NoteView.render(state.notes);

    NoteView.addHandlerDeleteNotes(ctrlDeleteNote);
    NoteView.addHandlerEditNotes(ctrlEditNote);
  };

  const ctrlAddNote = async (data: NoteData) => {
    await NoteModel.addNote(data);

    ctrlShowNotes();
  };

  const ctrlEditNote = async (data: Note) => {
    await NoteModel.updateNote(data);

    ctrlShowNotes();
  };

  const ctrlDeleteNote = async (id: string) => {
    await NoteModel.deleteNote(id);

    ctrlShowNotes();
  };

  return {
    ctrlShowNotes,
    ctrlAddNote,
    ctrlEditNote,
    ctrlDeleteNote,
  };
})();

export default NoteController;
