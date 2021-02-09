import firebase from 'firebase';

import {
  firebaseApp
} from '../core';
import {
  IFileControllerController
} from './IFileController';

class FileController implements IFileControllerController {
  app;
  storage;
  storageRef;

  constructor(firebaseApp: firebase.app.App) {
    this.app = firebaseApp;
    this.storage = this.app.storage();
    this.storageRef = this.storage.ref();
  }

  async getFilesMeta(path: string) {
    const listRef = this.storageRef.child(path);
    const items = (await listRef.listAll()).items;

    return items;
  }

  async uploadFile(file: File, path: string) {
    const fileRef = this.storageRef.child(path + file.name);

    await fileRef.put(file);
  }

  async removeFile(fileName: string, path: string) {
    const fileRef = this.storageRef.child(path + fileName);

    await fileRef.delete();
  }

  async getDownloadURL(fileName: string, path: string) {
    const downloadURL = await this.storageRef.child(path + fileName).getDownloadURL();

    return downloadURL;
  }
}

export const fileController = new FileController(firebaseApp);