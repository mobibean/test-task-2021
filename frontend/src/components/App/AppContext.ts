import { createContext } from 'react';

import { File } from './App';

interface AppContextProps {
  files: Array<File>;
  addFile: (file: File) => void;
  removeFile: (name: string) => void;
};

const defaultAppContext = {
  files: [],
  addFile: () => { },
  removeFile: () => { },
};

export const AppContext = createContext<AppContextProps>(defaultAppContext);