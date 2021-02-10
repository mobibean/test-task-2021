import { useContext, ChangeEvent } from 'react';

import {
  fileController as firebaseFileController,
  authController
} from 'api';
import { Icons } from 'theme';
import {
  Wrapper,
  Span,
  IconWrapper,
  Browse,
  BrowseButton,
  FileInput
} from './FileUploader.style';
import { AppContext } from 'components/App';
import Dropzone from 'components/Dropzone';
import { getFileData } from 'helpers';

interface FileUploaderProps { }

const FileUploader: React.FunctionComponent<FileUploaderProps> = () => {
  const { addFile, currUser } = useContext(AppContext);

  const uploadFile = async (file: File) => {
    try {
      await firebaseFileController.uploadFile(file, `/users/${currUser?.uid}/`);

      addFile(
        getFileData(file.size, file.name)
      );
    } catch {
      await authController.signInWithRedirect();
    }
  };

  const onFileUpload = async (evt: ChangeEvent<HTMLInputElement>) => {
    try {
      const currentElement = evt.target;

      if (!currentElement.files) return;

      const file = currentElement.files[0];

      await uploadFile(file);
    } catch {
      alert('Something went wrong. Please, try again in few minutes.');
    }
  };

  return (
    <Dropzone
      onDrop={uploadFile}
    >
      <Wrapper>
        <IconWrapper>
          <Icons.Upload />
        </IconWrapper>

        <Span>Drag and Drop file</Span>

        <Span>or</Span>

        <BrowseButton>
          <FileInput
            type="file"
            title="Browse"
            onChange={onFileUpload}
          />

          <Browse>Browse</Browse>
        </BrowseButton>

      </Wrapper>
    </Dropzone>
  );
}

export default FileUploader;