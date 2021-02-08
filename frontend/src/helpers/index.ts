import filesize from 'filesize';

import { File } from 'components/App';

export const getFileData = (size: number, fullName: string): File => ({
  name: fullName,
  size: filesize(size, { round: 2 }),
  extension: fullName.replace(/(.*)\.(.*?)$/, "$2")
});

export const downloadBlob = (blob: Blob, name: string) => {
  const blobUrl = URL.createObjectURL(blob);
  const link = document.createElement("a");

  link.href = blobUrl;
  link.download = name;

  document.body.appendChild(link);

  link.dispatchEvent(
    new MouseEvent('click', {
      bubbles: true,
      cancelable: true,
      view: window
    })
  );

  document.body.removeChild(link);
}