import { useEffect, useState } from 'react';
import firebase from 'firebase';

import {
  fileController as firebaseFileController
} from 'api';
import { AppContext } from './AppContext';
import FileUploader from 'components/FileUploader';
import FileList from 'components/FileList';
import { getFileData } from 'helpers';
import {
  Wrapper,
  Content,
  LeftSideContent,
  RightSideContent,
  FileListContainer
} from './App.style';

export interface File {
  name: string;
  size: string;
  extension: string;
};

function App() {
  const [files, setFiles] = useState<Array<File>>([]);
  const [currUser, setCurrUser] = useState<firebase.User | null>(null);

  useEffect(() => {
    (async () => {
      if (!currUser) return;

      const filesMeta = await firebaseFileController.getFilesMeta(`/users/${currUser.uid}`);
      const files: Array<File> = [];

      for (let item of filesMeta) {
        const { name, size } = await item.getMetadata();

        files.push(
          getFileData(size, name)
        );
      }

      setFiles(files);
    })();
  }, [currUser]);

  const addFile = (file: File) => {
    setFiles(files => [
      file,
      ...files
    ]);
  };

  const removeFile = (name: string) => {
    setFiles((files) => {
      const fileIdx = files.findIndex(({ name: fileName }) => name === fileName);

      if (fileIdx < 0) return files;

      return ([
        ...files.slice(0, fileIdx),
        ...files.slice(fileIdx + 1)
      ]);
    });
  };

  firebase.auth().onAuthStateChanged(user => {
    if (user) {
      setCurrUser(user);
    }
  })

  return (
    <Wrapper>
      <Content>
        <AppContext.Provider
          value={{
            files,
            currUser,
            removeFile,
            addFile
          }}
        >
          <LeftSideContent>
            <FileUploader />
          </LeftSideContent>

          <RightSideContent>
            <FileListContainer>
              <FileList files={files} />
            </FileListContainer>
          </RightSideContent>
        </AppContext.Provider>
      </Content>
    </Wrapper>
  );
}

export default App;
