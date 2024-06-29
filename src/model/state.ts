import type { State } from '../types/types';

export let state: State = {
  tasks: [],
  projects: [{ title: 'Home', id: 'ID00000' }],
  notes: [],
};

export const resetState = () => {
  state = {
    tasks: [],
    projects: [{ title: 'Home', id: 'ID00000' }],
    notes: [],
  };
};
