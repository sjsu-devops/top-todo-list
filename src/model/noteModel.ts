import { state } from './state';

import Firestore from './firestore';

import type { Note, NoteData } from '../types/types';

const NoteModel = (() => {
  let userId: string;

  const createNote = (data: NoteData) => ({
    title: data.title,
    details: data.details,
    id: `ID${Math.random().toString(16).slice(2)}`,
  });

  const addNote = async (data: NoteData) => {
    const newNote = createNote(data);

    state.notes = [newNote, ...state.notes];

    await Firestore.updateNotes(state.notes, userId);
  };

  const updateNote = async (data: Note) => {
    const target = state.notes.find((n) => n.id === data.id);
    const otherNotes = state.notes.filter((n) => n.id !== data.id);

    if (target) {
      Object.assign(target, data);

      state.notes = [target, ...otherNotes];

      await Firestore.updateNotes(state.notes, userId);
    }
  };

  const deleteNote = async (id: string) => {
    state.notes = state.notes.filter((n) => n.id !== id);

    await Firestore.updateNotes(state.notes, userId);
  };

  const initializeModel = async (currentUserId: string) => {
    userId = currentUserId;
    state.notes = await Firestore.getNotes(userId);
  };

  return {
    addNote,
    updateNote,
    deleteNote,
    initializeModel,
  };
})();

export default NoteModel;
