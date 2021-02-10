import firebase from 'firebase';

export interface IAuthController {
  app: firebase.app.App;
  authProvider: firebase.auth.GoogleAuthProvider;

  signInWithRedirect: () => void;
}
