import { useContext } from 'react';

import { fileController as firebaseFileController } from 'api';
import { AppContext } from 'components/App';
import { Icons, Colors } from 'theme';
import { downloadBlob } from 'helpers';
import {
  FileExtension,
  FileInfoWrapper,
  FileName,
  FileSize,
  IconWrapper,
  FileItemWrapper
} from './FileItem.style';

interface FileItemProps {
  name: string;
  extension: string;
  size: string;
}

const FileItem: React.FunctionComponent<FileItemProps> = ({
  name,
  extension,
  size
}) => {
  const { removeFile, currUser } = useContext(AppContext);

  const onRemoveFile = async (name: string) => {
    try {
      if (!currUser) return;

      await firebaseFileController.removeFile(name, `/users/${currUser.uid}/`);

      removeFile(name);
    } catch {
      alert('Something went wrong. Please, try again in few minutes.');
    }
  };

  const onDownloadFile = async (name: string) => {
    try {
      if (!currUser) return;

      const url = await firebaseFileController.getDownloadURL(name, `/users/${currUser.uid}/`);
      const xhr = new XMLHttpRequest();

      xhr.responseType = 'blob';
      xhr.onload = () => {
        const blob = xhr.response;

        downloadBlob(blob, name);
      };
      xhr.open('GET', url);
      xhr.send();
    } catch {
      alert('Something went wrong. Please, try again in few minutes.');
    }
  };

  return (
    <FileItemWrapper>
      <FileExtension>
        {extension}
      </FileExtension>

      <FileInfoWrapper>
        <FileName
          onClick={() => onDownloadFile(name)}
        >
          {name}
        </FileName>

        <FileSize>
          {size} / {size}
        </FileSize>
      </FileInfoWrapper>

      <IconWrapper
        onClick={() => onRemoveFile(name)}
      >
        <Icons.Cancel fillColor={Colors.gray[100]} />
      </IconWrapper>
    </FileItemWrapper>
  );
}

export default FileItem;