import { DragEvent } from 'react';

export interface DropzoneProps {
  onDrop: (file: File) => void;
  onDragEnter?: (evt: DragEvent) => void;
  onDragOver?: (evt: DragEvent) => void;
  onDragLeave?: (evt: DragEvent) => void;
}

const Dropzone: React.FunctionComponent<DropzoneProps> = ({
  onDrop,
  onDragEnter,
  onDragOver,
  onDragLeave,
  children
}) => {
  const preventDefaults = (e: DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  }

  const onDropHandler = (evt: DragEvent) => {
    preventDefaults(evt);

    const dropedFiles = evt.dataTransfer.files;

    if (!dropedFiles.length) return;

    const dropedFile = dropedFiles[0];

    onDrop(dropedFile);
  };

  const onDragEnterHandler = (evt: DragEvent) => {
    preventDefaults(evt);

    if (onDragEnter) {
      onDragEnter(evt);
    }
  };

  const onDragOverHandler = (evt: DragEvent) => {
    preventDefaults(evt);

    if (onDragOver) {
      onDragOver(evt);
    }
  };

  const onDragLeaveHandler = (evt: DragEvent) => {
    preventDefaults(evt);

    if (onDragLeave) {
      onDragLeave(evt);
    }
  };

  return (
    <div
      onDrop={onDropHandler}
      onDragEnter={onDragEnterHandler}
      onDragOver={onDragOverHandler}
      onDragLeave={onDragLeaveHandler}
    >
      {children}
    </div>
  );
}

export default Dropzone;