import { File } from './../App';
import FileItem from 'components/FileItem';
import { FileListContainer } from './FileList.style';

export interface FileListProps {
  files: Array<File>;
}

const FileList: React.FunctionComponent<FileListProps> = ({
  files
}) => {
  return (
    <FileListContainer>
      {
        files.map(({ name, size, extension }, idx) => (
          <FileItem
            key={`${name}-${idx}`}
            name={name}
            size={size}
            extension={extension}
          />
        ))
      }
    </FileListContainer>
  );
}

export default FileList;