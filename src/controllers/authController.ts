import { initializeApp } from 'firebase/app';
import {
  GoogleAuthProvider,
  getAuth,
  onAuthStateChanged,
  signInWithPopup,
  signOut,
} from 'firebase/auth';
import getFirebaseConfig from '../../firebase-config';

import { resetState } from '../model/state';
import initializeTodo from './appInitializer';

import AccountView from '../views/accountView';
import SidebarView from '../views/sidebarView';

const AuthController = (() => {
  const firebaseConfig = getFirebaseConfig();
  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);

  async function signIn() {
    const provider = new GoogleAuthProvider();
    await signInWithPopup(auth, provider);
  }

  function signOutUser() {
    signOut(auth);
    window.location.reload();
  }

  function getProfilePhotoURL() {
    return auth.currentUser && auth.currentUser.photoURL;
  }

  function getUserName() {
    return auth.currentUser && auth.currentUser.displayName;
  }

  function getUserID() {
    return auth.currentUser && auth.currentUser.uid;
  }

  function initializeAuth() {
    onAuthStateChanged(auth, async (authUser) => {
      if (authUser) {
        const photoURL = getProfilePhotoURL() as string;
        const name = getUserName() as string;
        const userID = getUserID() as string;

        AccountView.showAccountInfo(name, photoURL);
        AccountView.showMainContent();
        initializeTodo(userID);
      } else {
        resetState();
        SidebarView.hideNavProjects();
        AccountView.hideAccountInfo();
        AccountView.hideMainContent();
      }
    });

    AccountView.addHandlerLogin(signIn);
    AccountView.addHandlerLogout(signOutUser);
  }

  return {
    signIn,
    signOutUser,
    initializeAuth,
    getUserID,
  };
})();

export default AuthController;
