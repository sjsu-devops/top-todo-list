import { initializeApp } from 'firebase/app';
import { getFirestore, setDoc, doc, getDoc } from 'firebase/firestore';
import getFirebaseConfig from '../../firebase-config';

import type { Note, Project, Task } from '../types/types';

const Firestore = (() => {
  const firebaseConfig = getFirebaseConfig();
  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);

  async function getTasks(userId: string) {
    let tasks: any = [];

    const docRef = doc(db, `users/${userId}/state`, 'tasks');
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      tasks = docSnap.data()['data'] || [];
    }

    return tasks;
  }

  async function getProjects(userId: string) {
    const defaultProjects = [{ title: 'Home', id: 'ID00000' }];
    let projects: any = defaultProjects;

    const docRef = doc(db, `users/${userId}/state`, 'projects');
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      projects = docSnap.data()['data'] || defaultProjects;
    }

    return projects;
  }

  async function getNotes(userId: string) {
    let notes: any = [];

    const docRef = doc(db, `users/${userId}/state`, 'notes');
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      notes = docSnap.data()['data'] || [];
    }

    return notes;
  }

  async function updateTasks(tasksArr: Task[], userId: string) {
    try {
      const ref = doc(db, `users/${userId}/state`, 'tasks');

      await setDoc(ref, { data: tasksArr });
    } catch (e) {
      console.error('Error updating tasks', e);
    }
  }

  async function updateProjects(projArr: Project[], userId: string) {
    try {
      const ref = doc(db, `users/${userId}/state`, 'projects');
      await setDoc(ref, { data: projArr });
    } catch (e) {
      console.error('Error updating projects', e);
    }
  }

  async function updateNotes(notesArr: Note[], userId: string) {
    try {
      const ref = doc(db, `users/${userId}/state`, 'notes');
      await setDoc(ref, { data: notesArr });
    } catch (e) {
      console.error('Error updating notes', e);
    }
  }

  return {
    getNotes,
    getProjects,
    getTasks,
    updateNotes,
    updateProjects,
    updateTasks,
  };
})();

export default Firestore;
