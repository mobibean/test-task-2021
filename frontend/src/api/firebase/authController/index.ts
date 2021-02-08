import firebase from 'firebase';

import {
  firebaseApp,
  firebaseAuthProvider
} from '../core';
import {
  IAuthController
} from './IAuthController';

class AuthController implements IAuthController {
  app;
  authProvider;

  constructor(firebaseApp: firebase.app.App, authProvider: firebase.auth.GoogleAuthProvider) {
    this.app = firebaseApp;
    this.authProvider = authProvider;
  }

  async signInWithRedirect() {
    await this.app.auth().signInWithRedirect(this.authProvider);
  }
}

export const authController = new AuthController(firebaseApp, firebaseAuthProvider);