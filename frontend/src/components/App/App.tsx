import { useEffect, useState } from 'react';

import { fileController as firebaseFileController } from 'api';
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

  useEffect(() => {
    (async () => {
      const filesMeta = await firebaseFileController.getFilesMeta('/');
      const files: Array<File> = [];

      for (let item of filesMeta) {
        const { name, size } = await item.getMetadata();

        files.push(
          getFileData(size, name)
        );
      }

      setFiles(files);
    })()
  }, []);

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

  return (
    <Wrapper>
      <Content>
        <AppContext.Provider
          value={{
            files,
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
