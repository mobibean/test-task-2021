import { createContext } from 'react';
import firebase from 'firebase';

import { File } from './App';

interface AppContextProps {
  files: Array<File>;
  currUser: firebase.User | null;

  addFile: (file: File) => void;
  removeFile: (name: string) => void;
};

const defaultAppContext = {
  files: [],
  currUser: null,
  addFile: () => { },
  removeFile: () => { },
};

export const AppContext = createContext<AppContextProps>(defaultAppContext);