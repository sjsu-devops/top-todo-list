import '/src/style.css';

import AuthController from './controllers/authController';

export const init = () => {
  // Auth intializer
  AuthController.initializeAuth();
};

init();
