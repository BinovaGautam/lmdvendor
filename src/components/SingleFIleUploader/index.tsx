import React, { useEffect, useRef, useState } from 'react';
import { UploadIcon } from '@heroicons/react/outline';
import { SingleFileUploaderModel } from '../../models/SingleFileUploaderModel';

const SingleFileUploader = ({ setFile, file }: SingleFileUploaderModel) => {
  const inputElement = useRef<HTMLInputElement>(null);

  const onDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();

    const fileList: FileList = e.dataTransfer.files;
    if (!fileList) return;

    setFile(fileList[0]);
  };

  const onClick = (): void => {
    if (inputElement.current) {
      inputElement.current.click();
    }
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const fileList = e.target.files;
    if (!fileList) return;
    setFile(fileList[0]);
  };

  return (
    <div
      onDrop={onDrop}
      onClick={onClick}
      onDragOver={(e) => e.preventDefault()}
      className='group bg-primary-2 bg-opacity-10 relative rounded-xl h-full w-full p-3 flex flex-col items-center justify-center cursor-pointer'>
      <UploadIcon className='h-12 w-12 text-primary-2' />
      {/* <span>{file?.name}</span> */}
      <input type='file' hidden ref={inputElement} onChange={onChange} />
    </div>
  );
};

export default SingleFileUploader;
