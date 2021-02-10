import firebase from 'firebase';

type FilesMeta = Promise<firebase.storage.Reference[]>;

export interface IFileControllerController {
  app: firebase.app.App;
  storage: firebase.storage.Storage;
  storageRef: firebase.storage.Reference;

  getFilesMeta: (path: string) => FilesMeta;
  uploadFile: (file: File, path: string) => void;
  getDownloadURL: (fileName: string, path: string) => Promise<string>;
  removeFile: (fileName: string, path: string) => void;
}