/* eslint-disable no-unused-vars */
'use client';

import { FileUploadProps } from '@/app/lib/definitions';
import { Button, Modal, ModalBody, ModalContent, useDisclosure } from '@nextui-org/react';
import React from 'react';

export const FileUpload: React.FC<FileUploadProps> = ({ file, setFile }) => {
  const [fileEnter, setFileEnter] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const isValidFile = (file: File) => {
    const validTypes = ['image/jpeg', 'image/png', 'image/jpg'];
    const maxSize = 3 * 1024 * 1024; // 3MB
    if (!validTypes.includes(file.type)) {
      setError('Solo se permiten formatos JPG, JPEG y PNG.');
      return false;
    }
    if (file.size > maxSize) {
      setError('El tamaño del archivo no debe exceder los 3MB.');
      return false;
    }
    setError(null);
    return true;
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setFileEnter(true);
  };

  const handleDragLeave = () => {
    setFileEnter(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setFileEnter(false);
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      const file = files[0];
      if (isValidFile(file)) {
        const blobUrl = URL.createObjectURL(file);
        setFile(blobUrl);
      }
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const file = files[0];
      if (isValidFile(file)) {
        const blobUrl = URL.createObjectURL(file);
        setFile(blobUrl);
      }
    }
  };

  return (
    <div className="container mx-auto flex max-w-lg flex-col items-center justify-center gap-4">
      {!file ? (
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          className={`${
            fileEnter ? 'border-4' : 'border-2'
          } mx-auto flex h-[124px] w-[150px] flex-col items-center justify-center border-dashed bg-white`}
        >
          <label
            htmlFor="file"
            className="relative flex h-full cursor-pointer flex-col justify-center p-6 text-center text-xs font-bold text-black text-primary"
          >
            <p>Haz clic para subir o arrastra y suelta</p>
            <img
              src="/events/image_bg.svg"
              alt="image"
              className="absolute bottom-0 left-0 right-0 top-0 h-full w-full rounded-md p-0 opacity-30"
            />
          </label>
          <input
            id="file"
            type="file"
            className="hidden"
            onChange={handleFileChange}
            accept="image/jpeg,image/png,image/jpg"
          />
        </div>
      ) : (
        <>
          <div className="group relative flex flex-col items-center justify-center gap-4">
            <object
              className="h-[150px] w-[250px] w-full rounded-md object-cover sm:h-[200px] sm:w-[350px]"
              data={file}
              type="image/png" // Actualiza esto según el tipo de archivo
            />
            <Button color="primary" onClick={() => setFile('')} className="absolute bottom-1 left-1 rounded-md">
              <p>Eliminar</p>
              <img src="/events/delete_image.svg" alt="delete" className="h-5 w-5" />
            </Button>
            <Button
              className={`absolute top-1 right-1 m-0 h-min w-0 min-w-max rounded-none bg-transparent p-2 group-hover:bg-slate-50 group-hover:bg-opacity-65`}
              onClick={onOpen}
            >
              <img src="/events/expand.svg" alt="fullscreen" className="h-5 w-5" />
            </Button>
          </div>
          <Modal isOpen={isOpen} onOpenChange={onOpenChange} placement="center" backdrop="blur" hideCloseButton>
            <ModalContent className="rounded-lg border-2 border-gray-700 p-8">
              {(onClose) => (
                <ModalBody className="px-2 py-2">
                  <object
                    className="h-full w-full object-contain"
                    data={file}
                    type="image/png" // Actualiza esto según el tipo de archivo
                  />
                </ModalBody>
              )}
            </ModalContent>
          </Modal>
        </>
      )}
      {error && <p className="mt-2 text-sm text-red-500">{error}</p>}
    </div>
  );
};
